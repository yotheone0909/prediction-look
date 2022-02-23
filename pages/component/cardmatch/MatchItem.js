import { useEffect, useState } from "react"
import { contractBetAddress, getTeams, teams } from "../../../component/constants/constants";
import { useAppContext } from "../../../context/AppContext";
import { utils } from "ethers";
import UserPrediction from "../../model/UserPrediction";
import BottomMatchItem from "./BottomMatchItem";

export default function MatchItem({ predictionModel, getRoundsDetailFn, matchRoundIds }) {
    const { address, tokenBusd, contranctBet, signer } = useAppContext();
    const dateNow = new Date();
    const epoch = dateNow.getTime() / 1000.0;
    const timeleft = predictionModel.timeLockPrediction - epoch

    const [isLive, setIsLive] = useState(false)
    const [isMatchEnd, setIsMatchEnd] = useState(false)
    const [count, setCount] = useState(timeleft); // seconds
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [isApprove, setIsApprove] = useState(false)
    const [amountAllow, setAmountAllow] = useState(0)
    const [userPrediction, setUserPrediction] = useState(null)
    const [homeTeam, setHomeTeam] = useState(null);
    const [awayTeam, setAwayTeam] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        void async function fetchData() {
            try {
                if (address == null && predictionModel == null) {
                    return;
                }
                let connectContractBet = contranctBet.connect(signer)
                let dataUserPrefiction = await connectContractBet.userPrediction(predictionModel.roundId, address)
                let userNewPrediction = new UserPrediction(
                    dataUserPrefiction.roundId.toString(),
                    dataUserPrefiction.positionPredict.toString(),
                    parseInt(utils.formatEther(dataUserPrefiction.amount.toString())),
                    dataUserPrefiction.isClaimed
                )
                setUserPrediction(userNewPrediction)
            } catch (error) {
                console.log('error', error);
            }
        }();

        // cancel subscription to useEffect
        return () => {
            abortController.abort(); // cancel pending fetch request on component unmount
        }
    }, []);

    useEffect(() => {

        setHomeTeam(teams.get(parseInt(predictionModel.homeId)))
        setAwayTeam(teams.get(parseInt(predictionModel.awayId)))

    }, [predictionModel, homeTeam, awayTeam])

    useEffect(() => {

        if (tokenBusd) {
            checkAllowance();
        }

    }, [tokenBusd])

    useEffect(() => {
        if (count >= 0) {
            const secondsLeft = setInterval(() => {
                setCount((c) => c - 1);
                let timeLeftVar = secondsToTime(count);
                setHour(timeLeftVar.h);
                setMinute(timeLeftVar.m);
                setSecond(timeLeftVar.s);
            }, 1000);
            return () => {
                if (count <= 1) {
                    getRoundsDetailFn()
                }
                clearInterval(secondsLeft)
            };
        } else {
            console.log("Time out")
        }
    }, [count]);

    useEffect(() => {
        setIsLive(epoch >= predictionModel?.timeLockPrediction)

        setIsMatchEnd(epoch >= predictionModel?.timeEndPrediction)


    }, [isLive, isMatchEnd])

    function getDateMatch() {
        if (predictionModel != null) {
            const myDate = new Date(predictionModel?.timeLockPrediction * 1000)
            return myDate.toLocaleString()
        }
    }

    const checkAllowance = async () => {
        if (address == null) {
            return;
        }
        await tokenBusd?.allowance(address, contractBetAddress).then(wei => {

            let allowedBusd = utils.formatEther(wei.toString())

            setAmountAllow(allowedBusd)
            setIsApprove(allowedBusd > 0)

        })
            .catch(err => {
                console.log("err", err)
            })
    }

    const getUserPrediction = async (roundId) => {
        if (address == null) {
            return;
        }
        if (roundId) {
            let connectContractBet = contranctBet.connect(signer)
            await connectContractBet.userPrediction(roundId, address).then(prediction => {
                let userNewPrediction = new UserPrediction(
                    prediction.roundId.toString(),
                    prediction.positionPredict.toString(),
                    parseInt(utils.formatEther(prediction.amount.toString())),
                    prediction.isClaimed
                )
                setUserPrediction(userNewPrediction)
            })
                .catch(err => {
                    console.log("userPrediction", err)
                })
        }

    }

    function secondsToTime(secs) {
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        return {
            h: hours,
            m: minutes,
            s: seconds
        };
    }

    function getPercentage(amount) {
        if (predictionModel != null) {
            const totalPredict = predictionModel.amountHome + predictionModel.amountAway + predictionModel.amountDraw;
        
            return Math.round(totalPredict <= 0 ? 0 : (amount / totalPredict) * 100).toFixed(2);
        }
    }

    function getWinner() {
        if (predictionModel != null) {
            if (predictionModel.positionWin == 0) {
                return "Waiting Result"
            } else if (predictionModel.positionWin == 1) {
                return "Home Win"
            } else if (predictionModel.positionWin == 2) {
                return "Away Win"
            } else if (predictionModel.positionWin == 3) {
                return "Draw"
            } else {
                return "Refund"
            }
        }
    }

    function getPredictWin() {
        if (address != null) {
            return userPrediction?.positionPredict != 0 && predictionModel.positionWin != 0 && (userPrediction?.positionPredict == predictionModel.positionWin || userPrediction?.positionPredict != 0 && predictionModel.positionWin == 4)
        } else {
            return false;
        }
    }

    function checkMatchAndClaim() {
        /// user not predice
        if (predictionModel?.positionWin == 0) {
            return false;
        } else if (isMatchEnd && !getPredictWin() && !userPrediction?.isClaimed) {
            return true;
        } else if (isMatchEnd && getPredictWin() && userPrediction?.isClaimed) {
            return true;
        } else {
            return false;
        }
    }

    function showNameTeams() {
        return homeTeam?.name + " VS " + awayTeam?.name;
    }

    return (
        <>
            <div className={(checkMatchAndClaim() ? "opacity-25" : "") + " max-w-sm rounded-[14px] overflow-hidden shadow-lg shadow-indigo-500/40  bg-white px-4"}>
                <div className="flex flex-row">
                    {isMatchEnd ? <blockquote className="md:opacity-100 text-2xl font-semibold italic text-center text-gray-900  mb-4">
                        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                            <span className="relative text-white">{getWinner()}</span>
                        </span>
                    </blockquote> : isLive ? <div className="rounded-md bg-rose-600 mt-2 px-2 py-1 mb-2 text-white">Live</div> : <h1 className="mt-2 px-2 py-1 mb-2">Live in {getDateMatch()}</h1>}
                </div>
                <div className="flex flex-row">
                    <div className="basis-1/3">
                        <img className="h-24 w-24" src={homeTeam?.image === undefined ? "https://goalsreplay.com/assets/images/placeholders/placeholder_team_picture.png" : homeTeam?.image} />
                    </div>
                    <div className="basis-1/3 grid grid-cols-1 content-center">
                        <p className="text-center"> VS </p>
                    </div>

                    <div className="basis-1/3">

                        <img className="h-24 w-24" src={awayTeam?.image === undefined ? "https://goalsreplay.com/assets/images/placeholders/placeholder_team_picture.png" : awayTeam?.image} />
                    </div>
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{showNameTeams()}</div>
                    <p className="text-gray-700 text-xs">
                        Football / England Premiere League
                    </p>
                    <p className="text-gray-700 text-base">Lock Predicts {hour < 9 ? "0" + hour : hour} : {minute < 9 ? "0" + minute : minute} :
                        {second < 9 ? "0" + second : second}</p>

                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                                Home
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-pink-600">
                                {getPercentage(predictionModel.amountHome)}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                        <div style={{ width: (getPercentage(predictionModel.amountHome) + "%") }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                    </div>
                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                                Draw
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-pink-600">
                                {getPercentage(predictionModel.amountDraw)}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                        <div style={{ width: (getPercentage(predictionModel.amountDraw) + "%") }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                    </div>
                </div>
                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
                                Away
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-pink-600">
                                {getPercentage(predictionModel.amountAway)}%
                            </span>
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
                        <div style={{ width: (getPercentage(predictionModel.amountAway) + "%") }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                    </div>
                </div>

                <BottomMatchItem contranctBet={contranctBet} tokenBusd={tokenBusd} signer={signer} amountAllow={amountAllow} address={address} isLive={isLive} isMatchEnd={isMatchEnd} isApprove={isApprove} userPrediction={userPrediction} predictionModel={predictionModel} matchRoundIds={matchRoundIds} />

            </div>
        </>
    )
}