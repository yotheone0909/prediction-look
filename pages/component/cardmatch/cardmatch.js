import { useEffect, useState } from "react";
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

        // const a = async () => {
        //   await getRoundsDetail(contranctBet)
        // }

        // if (contranctBet) { a() }
    }, [contranctBet, connect, address])

    const getRoundsDetail = async (contranctBet) => {
        const matchs = await contranctBet.getRoundOnRun()
        console.log(matchs)
        setPredicts([])
        for (const matchDetail of matchs) {
            setPredicts(prevState => [...prevState, { timeCreatePrediction: matchDetail.timeCreatePrediction, timeEndPrediction: matchDetail.timeEndPrediction, timeLockPrediction: matchDetail.timeLockPrediction }])
        }
    }
    return (
        <div className="grid grid-cols-4 gap-4 shadow-md">
            {sports.map((sport) => (
                <MatchItem />
            ))}
        </div>
    )
}