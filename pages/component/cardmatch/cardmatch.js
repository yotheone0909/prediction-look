import { useEffect, useState } from "react";
import Prediction from "../../model/Prediction";
import { useAppContext } from "../context/AppContext";
import MatchItem from "./MatchItem";

export default function CardMatch() {

    const { connect, address, contranctBet } = useAppContext();
    const [predicts, setPredicts] = useState([])

    const sports = [
        {
            id: 1,
            totalAmount: "Arsenal vs Sunderland",
            homePercentage: "100%",
            drawPercentage: "25%",
            awayPercentage: "30%"
        },
        {
            id: 1,
            totalAmount: "Arsenal vs Sunderland",
            homePercentage: "100%",
            drawPercentage: "25%",
            awayPercentage: "30%"
        },
        {
            id: 1,
            totalAmount: "Arsenal vs Sunderland",
            homePercentage: "100%",
            drawPercentage: "25%",
            awayPercentage: "30%"
        },
        {
            id: 1,
            totalAmount: "Arsenal vs Sunderland",
            homePercentage: "100%",
            drawPercentage: "25%",
            awayPercentage: "30%"
        },
        {
            id: 1,
            totalAmount: "Arsenal vs Sunderland",
            homePercentage: "100%",
            drawPercentage: "25%",
            awayPercentage: "30%"
        },
        {
            id: 1,
            totalAmount: "Arsenal vs Sunderland",
            homePercentage: "100%",
            drawPercentage: "25%",
            awayPercentage: "30%"
        }
    ]

    useEffect(() => {

        const a = async () => {
            await getRoundsDetail(contranctBet)
        }

        if (contranctBet) { a() }
    }, [contranctBet, connect, address])

    const getRoundsDetail = async (contranctBet) => {
        const matchs = await contranctBet.getRoundOnRun()
        console.log(matchs)
        setPredicts([])
        for (let [index, matchDetail]  of matchs.entries()) {
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
            <div className="grid grid-cols-4 gap-4 shadow-md">
                {predicts?.map((predict) => (
                    <MatchItem key={predict.id} predictionModel={predict} />
                ))}
            </div>
        </>
    )
}