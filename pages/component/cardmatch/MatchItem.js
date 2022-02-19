import { useEffect, useRef, useState } from "react"
import { contractBetAddress } from "../constants/constants";
import { useAppContext } from "../context/AppContext";
import { utils } from "ethers";
import UserPrediction from "../../model/UserPrediction";
import { useLayoutContext } from "../context/LayourContext";

export default function MatchItem({ predictionModel, getRoundsDetailFn, matchRoundIds }) {
    const { address, tokenBusd, contranctBet, signer } = useAppContext();
    const { isShowError, setLoading } = useLayoutContext();
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
    const [amount, setAmount] = useState(0)
    const [amountAllow, setAmountAllow] = useState(0)
    const [userPrediction, setUserPrediction] = useState(null)
    const [totalAmount, setTotalAmount] = useState(predictionModel.totalAmount ? 0 : predictionModel.totalAmount)
    const textAmount = useRef(null);

    useEffect(() => {
        const prediction = async () => {
            if (address == null) {
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
        }
        if (contranctBet) {
            prediction()
        }
    }, [totalAmount])

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

    const approveContract = async () => {
        if (address == null) {
            return;
        }
        setLoading(true);
        const wei = utils.parseEther('100.0');
        let contract = tokenBusd.connect(signer)
        const tx = await contract?.approve(contractBetAddress, wei)
        await tx.wait().then(() => {
            setLoading(false);
            location.reload()
        }).catch(() => {

        });
    }

    const predictionHome = async (amount) => {
        if (address == null) {
            return;
        }

        setLoading(true);
        if (parseInt(amountAllow) > parseInt(amount)) {
            let connectContractBet = contranctBet.connect(signer)
            const amountWei = utils.parseEther(amount);

            const tx = await connectContractBet?.predictionHome(predictionModel.roundId, amountWei);
            await tx.wait().then(() => {

                setLoading(false);

                location.reload()
            }).catch(() => {

            });

        } else {
            let contract = tokenBusd.connect(signer)
            const amountWei = utils.parseEther(amount);
            const tx = await contract?.increaseAllowance(contractBetAddress, amountWei)
            await tx.wait().then(() => {

                setLoading(false);

                location.reload()
            }).catch(() => {

            });
        }
    }

    const predictionDraw = async (amount) => {
        if (address == null) {
            return;
        }

        setLoading(true);

        if (parseInt(amountAllow) > parseInt(amount)) {
            let connectContractBet = contranctBet.connect(signer)
            const amountWei = utils.parseEther(amount);
            const tx = await connectContractBet?.predictionDraw(predictionModel.roundId, amountWei)
            await tx.wait().then(() => {
                setLoading(false);
                location.reload()
            }).catch(() => {

            });

        } else {
            let contract = tokenBusd.connect(signer)
            const amountWei = utils.parseEther(amount);
            const tx = await contract?.increaseAllowance(contractBetAddress, amountWei)
            await tx.wait().then(() => {
                setLoading(false);
                location.reload()
            }).catch(() => {

            });

        }
    }

    const predictionAway = async (amount) => {
        if (address == null) {
            return;
        }
        setLoading(true);
        if (parseInt(amountAllow) > parseInt(amount)) {
            let connectContractBet = contranctBet.connect(signer)
            const amountWei = utils.parseEther(amount);
            const tx = await connectContractBet?.predictionAway(predictionModel.roundId, amountWei)

            await tx.wait().then(() => {
                setLoading(false);
                location.reload()
            }).catch((error) => {
                console.log("errorASDASDASDASDASDASDASD ", error)
            });

        } else {
            let contract = tokenBusd.connect(signer)
            const amountWei = utils.parseEther(amount);
            const tx = await contract?.increaseAllowance(contractBetAddress, amountWei)

            await tx.wait().then(() => {
                setLoading(false);
                location.reload()
            }).catch(() => {

            });
        }
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
            return totalPredict <= 0 ? 0 : (amount / totalPredict) * 100
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

    function showSelectedTeam() {
        let result;
        if (matchRoundIds == null) {
            return "";
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            if (userPrediction?.positionPredict == 1) {
                result =
                    <div class="flex flex-row gap-4 mb-2">
                        <div class="flex bg-emerald-300 border-solid border-2 border-red-700 basis-1/2 rounded-full">
                            <div class="flex-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                            </div>
                            <div class="grow">
                                Entered
                            </div>
                        </div>
                        <div class="flex basis-1/2 rounded-full">
                            <div class="flex-none">

                            </div>
                            <div class="grow">

                            </div>
                        </div>
                        <div class="flex basis-1/2 rounded-full">
                            <div class="flex-none">

                            </div>
                            <div class="grow">

                            </div>
                        </div>
                    </div>
            } else if (userPrediction?.positionPredict == 2) {
                result = <div class="flex flex-row gap-4 mb-2">
                    <div class="flex basis-1/2 rounded-full">
                        <div class="flex-none">

                        </div>
                        <div class="grow">

                        </div>
                    </div>
                    <div class="flex basis-1/2 rounded-full">
                        <div class="flex-none">

                        </div>
                        <div class="grow">

                        </div>
                    </div>
                    <div class="flex bg-emerald-300 border-solid border-2 border-red-700 basis-1/2 rounded-full">
                        <div class="flex-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                        </div>
                        <div class="grow">
                            Entered
                        </div>
                    </div>
                </div>
            } else if (userPrediction?.positionPredict == 3) {
                result = <div class="flex flex-row gap-4 mb-2">
                    <div class="flex basis-1/2 rounded-full">
                        <div class="flex-none">

                        </div>
                        <div class="grow">

                        </div>
                    </div>
                    <div class="flex bg-emerald-300 border-solid border-2 border-red-700 basis-1/2 rounded-full">
                        <div class="flex-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                        </div>
                        <div class="grow">
                            Entered
                        </div>
                    </div>
                    <div class="flex basis-1/2 rounded-full">
                        <div class="flex-none">

                        </div>
                        <div class="grow">

                        </div>
                    </div>
                </div>
            }
        } else {
            result = ""
        }
        return result;
    }

    const handleBtnHomeClick = () => {
        if (address == null) {
            return;
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            return;
        }
        if (textAmount.current.value < 1) {
            textAmount.current.focus();
        } else {
            predictionHome(amount)
        }
    };

    const handleBtnDrawClick = () => {
        if (address == null) {
            return;
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            return;
        }
        if (textAmount.current.value < 1) {
            textAmount.current.focus();
        } else {
            predictionDraw(amount)
        }
    };

    const handleBtnAwayClick = () => {
        if (address == null) {
            return;
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            return;
        }
        if (textAmount.current.value < 1) {
            textAmount.current.focus();
        } else {
            predictionAway(amount)
        }
    };

    const handleBtnClaimClick = async () => {
        if (address == null) {
            return;
        }
        setLoading(true);
        try {
            let connectContractBet = contranctBet.connect(signer)
            const tx = await connectContractBet?.claimReward(predictionModel.roundId, address);

            await tx.wait().then(() => {
                setLoading(false);
                location.reload()
            }).catch((error) => {

            });
        } catch (error) {
            error.data.message

            setLoading(false);
            isShowError(true);
            setTimeout(() => {
                isShowError(false);
            }, 3000);
        }
    }

    function getPredictWin() {
        if (address != null) {
            return userPrediction?.positionPredict != 0 && predictionModel.positionWin != 0 && (userPrediction?.positionPredict == predictionModel.positionWin || userPrediction?.positionPredict != 0 && predictionModel.positionWin == 4)
        } else {
            return false;
        }
    }

    function getPredictLoser() {
        if (address != null) {
            return userPrediction?.positionPredict != 0 && predictionModel.positionWin != 0 && userPrediction?.positionPredict != predictionModel.positionWin
        } else {
            return false;
        }
    }

    function getLayoutClaim() {

        return <div class="flex flex-col max-w-full content-center">
            <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
                You Win
            </blockquote>
            <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => {
                handleBtnClaimClick()
            }}>Claim</button>
        </div>;
    }

    function getLayoutLoser() {

        return <div class="flex flex-col max-w-full content-center">
            <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
                You Loser
            </blockquote>
        </div>;
    }


    const htmlButtonPredict = <>
        {showSelectedTeam()}
        <div className={(matchRoundIds.includes(predictionModel.roundId) ? "opacity-25 " : "") + "basis-1/3 grid grid-cols-3 content-center mb-2 gap-4"}>
            <button className={((isLive || isMatchEnd || matchRoundIds.includes(predictionModel.roundId)) ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={handleBtnHomeClick}>
                Home
            </button>
            <button className={((isLive || isMatchEnd || matchRoundIds.includes(predictionModel.roundId)) ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={handleBtnDrawClick}>
                Draw
            </button>
            <button className={((isLive || isMatchEnd || matchRoundIds.includes(predictionModel.roundId)) ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={handleBtnAwayClick}>
                Away
            </button>
        </div>
    </>

    const htmlButtonApprove = <div>
        <button className="w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            approveContract()
        }}>
            Approve
        </button>
    </div>

    const htmlInputAmount = <form className=" rounded px-2 pt-2 pb-2">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount (BUSD)
            </label>
            <input ref={textAmount} disabled={isLive || isMatchEnd} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" id="username" type="number" placeholder="BUSD" onChange={(e) => setAmount(e.target.value)} />
        </div>
    </form>

    function checkMatchAndClaim() {
        /// user not predice
        if (isMatchEnd && !getPredictWin() && !userPrediction?.isClaimed) {
            return true;
        } else if (isMatchEnd && getPredictWin() && userPrediction?.isClaimed) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <>
            <div className={(checkMatchAndClaim() ? "opacity-25" : "") + " max-w-sm rounded-[14px] overflow-hidden shadow-lg shadow-indigo-500/40  bg-white px-4"}>
                <div className="flex flex-row">
                    {isMatchEnd ? <blockquote class="md:opacity-100 text-2xl font-semibold italic text-center text-gray-900  mb-4">
                        <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                            <span class="relative text-white">{getWinner()}</span>
                        </span>
                    </blockquote> : isLive ? <div class="rounded-md bg-rose-600 mt-2 px-2 py-1 mb-2 text-white">Live</div> : <h1 className="mt-2 px-2 py-1 mb-2">Live in {getDateMatch()}</h1>}
                </div>
                <div className="flex flex-row">
                    <div className="basis-1/3">
                        <img className="w-full" src="https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png" />
                    </div>
                    <div className="basis-1/3 grid grid-cols-1 content-center">
                        <p className="text-center"> VS </p>
                    </div>

                    <div className="basis-1/3">

                        <img className="w-full" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png" />
                    </div>
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Arsenal VS ManCity</div>
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

                {getPredictWin() || getPredictLoser() ? "" : isApprove ? htmlInputAmount : ""}

                {getPredictWin() ? "" : isApprove ? htmlButtonPredict : htmlButtonApprove}

                {getPredictWin() ? getLayoutClaim() : getPredictLoser() ? getLayoutLoser() : ""}

            </div>
        </>
    )
}