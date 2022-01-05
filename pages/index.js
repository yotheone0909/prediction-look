import { ethers } from '@usedapp/core/node_modules/ethers'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import CardMatch from './component/cardmatch/Cardmatch'
import { AppWrapper, useAppContext } from './component/context/AppContext'
import Nav from './component/nav/nav'

export default function Home()
{

  const sports = [
    {
      id: 1,
      totalAmount: "Arsenal vs Sunderland",
      homePercentage: "100%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    }
  ]
  const [ users, setUsers ] = useState(0);
  const { connect, address, contranctBet } = useAppContext();
  const [ predicts, setPredicts] = useState([])

  function mintToken()
  {
    //console.log(predicts);
  }

  useEffect(() =>
  {

    const a = async () => {
      await getRoundsDetail(contranctBet)
    }

    if ( contranctBet) { a() }
  }, [contranctBet, connect, address])

  const getRoundsDetail = async (contranctBet) => {
    const match = await contranctBet.getRoundOnRun()
    setPredicts([])
    for (const roundId of match)
    {
        const matchDetail = await contranctBet.round(roundId.toString())
        setPredicts(prevState => [...prevState, { timeCreatePrediction: matchDetail.timeCreatePrediction, timeEndPrediction: matchDetail.timeEndPrediction, timeLockPrediction: matchDetail.timeLockPrediction }])
    }
}

  return (
    <>
      <div>
        <div>
          <Nav />
        </div>
        <div className="flex flex-row">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() =>
            mintToken()
          }>
            Button
          </button><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {"ssss"}
          </button>
        </div>

        <div className="flex w-full flex-wrap flex-row">
            {predicts.length}
        </div>
      </div>
    </>
  )
}