import { useEffect, useState } from "react";
import Prediction from "../../model/Prediction";
import { useAppContext } from "../context/AppContext";
import MatchItem from "./MatchItem";

export default function CardMatch() {

    const { connect, address, contranctBet } = useAppContext();
    const [predicts, setPredicts] = useState([])

    useEffect(() => {

        const a = async () => {
        await getRoundsDetail()
    }

        if (contranctBet) { a() }
}, [contranctBet, connect, address])

const getRoundsDetail = async () => {
    
        const matchs = await contranctBet.getRoundOnRun()
        console.log(matchs)
        setPredicts([])
        for (let [index, matchDetail] of matchs.entries()) {
            setPredicts(prevState => [...prevState, new Prediction(
                index,
                matchDetail.homeId,
                matchDetail.awayId,
                matchDetail.amountHome,
                matchDetail.amountAway,
                matchDetail.amountDraw,
                matchDetail.timeCreatePrediction,
                matchDetail.timeEndPrediction,
                matchDetail.timeLockPrediction,
                matchDetail.positionWin)])
        }
    }

    return (
        <>
            ssName="grid grid-cols-4 gap-4 shadow-md">
                 {predicts?.map((predict) => (
                <MatchItem key={predict.id} predictionModel={predict} getRoundsDetailFn={getRoundsDetail} />
            ))}
        </div>
        </>
    ) 
}