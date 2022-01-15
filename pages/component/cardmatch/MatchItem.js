import { useEffect, useRef, useState } from "react"
import { contractBetAddress } from "../constants/constants";
import { useAppContext } from "../context/AppContext";
import { utils } from "ethers";

export default function MatchItem({ predictionModel, getRoundsDetailFn }) {
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
    const [amount, setAmount] = useState(0)
    const [amountAllow, setAmountAllow] = useState(0)
    const textAmount = useRef(null);

    useEffect(() => {

    }, [signer])

    useEffect(() => {

        if (tokenBusd) {
            console.log(checkAllowance())
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
        console.log("approveContract")
        const wei = utils.parseEther('100.0');
        let contract = tokenBusd.connect(signer)
        await contract?.approve(contractBetAddress, wei).then(approved => {
            setIsApprove(approved)
        }).catch(err => {
            console.log("approve", err)
        })
    }

    const predictionHome = async (amount) => {
        console.log("predictionHome")
        if (amountAllow > amount) {
            console.log("amountAllow > amount")
            let connectContractBet = contranctBet.connect(signer)
            console.log("connectContractBet", connectContractBet)
            const amountWei = utils.parseEther(amount);
            await connectContractBet?.predictionHome("1", amountWei)
                .then(value => {
                    console.log("predictionHome Success", value)
                })
                .catch(err => {
                    console.log("predictionHome Error", err)
                })

        } else {
            let contract = tokenBusd.connect(signer)
            const amountWei = utils.parseEther(amount);
            await contract?.increaseAllowance(contractBetAddress, amountWei).then(added => {
                if (added) {
                    checkAllowance()
                }
            }).catch(err => {
                console.log("increaseAllowance", err)
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
            } else if (ppredictionModel.positionWin == 1) {
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
    const handleBtnClick = () => {
        if (textAmount.current.value < 1) {
            textAmount.current.focus();
        } else {
            predictionHome(amount)
        }
    };

    const htmlButtonPredict = <div className="basis-1/3 grid grid-cols-3 content-center mb-2">
        <div>
            <button className={(isLive || isMatchEnd ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={handleBtnClick}>
                Home
            </button>
        </div>
        <div>
            <button className={(isLive || isMatchEnd ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                Draw
            </button>
        </div>
        <div>
            <button className={(isLive || isMatchEnd ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
                Away
            </button>
        </div>
    </div>

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

    return (
        <>
            <div className={(isMatchEnd ? "opacity-25" : "") + " max-w-sm rounded-[14px] overflow-hidden shadow-lg shadow-indigo-500/40  bg-white px-4"}>
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
                {isApprove ? htmlInputAmount : ""}

                {isApprove ? htmlButtonPredict : htmlButtonApprove}

            </div>
        </>
    )
}