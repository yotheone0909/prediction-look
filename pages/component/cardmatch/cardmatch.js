import { utils } from "ethers";
import { useEffect, useState } from "react";
import Prediction from "../../model/Prediction";
import { useAppContext } from "../context/AppContext";
import MatchItem from "./MatchItem";

export default function CardMatch() {
    const dateNow = new Date();
    const epoch = dateNow.getTime() / 1000.0;
    const { connect, address, contranctBet } = useAppContext();
    const [predicts, setPredicts] = useState([])

    useEffect(() => {

        const a = async () => {
            await getRoundsDetail()
        }

        if (contranctBet) { a() }
    }, [contranctBet, connect, address])

    const getRoundsDetail = async () => {
        console.log("getRoundsDetail")
        const matchs = await contranctBet.getRoundOnRun()
        if (matchs.length != predicts.length) {
            setPredicts([])
            const preditcsNew = []
            for (let [index, matchDetail] of matchs.entries()) {
                preditcsNew = [...preditcsNew, new Prediction(
                    index,
                    matchDetail.homeId.toString(),
                    matchDetail.awayId.toString(),
                    parseInt(utils.formatEther(matchDetail.amountHome.toString())),
                    parseInt(utils.formatEther(matchDetail.amountAway.toString())),
                    parseInt(utils.formatEther(matchDetail.amountDraw.toString())),
                    matchDetail.timeCreatePrediction.toString(),
                    matchDetail.timeEndPrediction.toString(),
                    matchDetail.timeLockPrediction.toString(),
                    matchDetail.positionWin.toString())]
            }

            const predicsSort = preditcsNew.sort((a,b) => {
                return a.timeLockPrediction < epoch  ? 1 : -1
            });

            setPredicts(predicsSort)
        }
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-4 shadow-md">
                {predicts?.map((predict) => (
                    <MatchItem key={predict.id} predictionModel={predict} getRoundsDetailFn={getRoundsDetail} />
                ))}
            </div>
        </>
    )
}