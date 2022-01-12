import { useEffect, useState } from "react"
import ReComfirmModal from "../modal/ReComfirmModal"

export default function MatchItem({ predictionModel }) {

    const [isLive, setIsLive] = useState(false)
    const [isMatchEnd, setIsMatchEnd] = useState(false)

    useEffect(() => {

        const dateNow = new Date();
        const epoch = dateNow.getTime() / 1000.0;
        setIsLive(epoch >= predictionModel?.timeLockPrediction)

        setIsMatchEnd(epoch >= predictionModel?.timeEndPrediction)

    }, [isLive, isMatchEnd])

    function getDateMatch() {
        if (predictionModel != null) {
            const myDate = new Date(predictionModel?.timeLockPrediction * 1000)
            return myDate.toLocaleString()
        }
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
            } else if (positionWin == 1) {
                return "Home Win"
            } else if (positionWin == 2) {
                return "Away Win"
            } else if (positionWin == 3) {
                return "Draw"
            } else {
                return "Refund"
            }
        }
    }

    console.log("isLive", isLive)
    console.log("isMatchEnd", isMatchEnd)

    return (
        <>
            <div className={(isMatchEnd ? "opacity-25" : "") + " max-w-sm rounded-[14px] overflow-hidden shadow-lg shadow-indigo-500/40  bg-white px-4"}>
                <div className="flex flex-row">
                    {isMatchEnd ? <blockquote class="md:opacity-100 text-2xl font-semibold italic text-center text-gray-900">
                        <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                            <span class="relative text-white">{getWinner()}</span>
                        </span>
                    </blockquote> : isLive ? <div class="rounded-md bg-rose-600 mt-2 px-2 py-1 mb-2 text-white">Live</div> : <h1>Live in {getDateMatch()}</h1>}
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
                    <p className="text-gray-700 text-base">Lock Predicts</p>
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
                        <div style={{ width: getPercentage(predictionModel.amountHome) }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
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
                        <div style={{ width: getPercentage(predictionModel.amountDraw) }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
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
                        <div style={{ width: getPercentage(predictionModel.amountAway) }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
                    </div>
                </div>
                <form className=" rounded px-2 pt-2 pb-2">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Amount (BUSD)
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="BUSD" />
                    </div>
                </form>

                <div className="basis-1/3 grid grid-cols-3 content-center mb-2">
                    <div>
                        <button className={(isLive || isMatchEnd ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>
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
            </div>
        </>
    )
}