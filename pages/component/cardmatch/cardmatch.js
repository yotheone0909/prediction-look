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
    const [roundIds, setRoundIds] = useState([])

    useEffect(() => {

        const callRound = async () => {
            await getRoundsDetail()
        }

        if (contranctBet) { callRound() }
    }, [contranctBet, connect, address])

    useEffect(() => {
        const callMatchRoundId = async() => await getMatchRoundId()
        if (contranctBet) {
            callMatchRoundId()
        }
    }, [contranctBet])

    const getRoundsDetail = async () => {
        const matchs = await contranctBet.getRoundOnRun()

        const matchRounds = await contranctBet.getUserRound(address)

        console.log("matchRounds123", matchRounds.toString())

            setPredicts([])
            const preditcsNew = []
            for (let [index, matchDetail] of matchs.entries()) {
                preditcsNew = [...preditcsNew, new Prediction(
                    matchDetail.roundId.toString(),
                    matchDetail.homeId.toString(),
                    matchDetail.awayId.toString(),
                    parseInt(utils.formatEther(matchDetail.amountHome.toString())),
                    parseInt(utils.formatEther(matchDetail.amountAway.toString())),
                    parseInt(utils.formatEther(matchDetail.amountDraw.toString())),
                    parseInt(utils.formatEther(matchDetail.totalAmount.toString())),
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

    const getMatchRoundId = async() => {
        const matchRounds = await contranctBet.getUserRound(address)
        const rounds = []
        for(var i = 0; i < matchRounds.length; i++) {
            rounds = [...rounds, matchRounds[i].toString()]
        }
        setRoundIds(rounds)
    }

    return (
        <>
            <div className="grid grid-cols-4 gap-4 shadow-md">
                {predicts?.map((predict) => (
                    <MatchItem key={predict.roundId} predictionModel={predict} getRoundsDetailFn={getRoundsDetail} matchRoundIds={roundIds} />
                ))}
            </div>
        </>
    )
}