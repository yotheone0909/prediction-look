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
      matchName: "Arsenal vs Sunderland",
      homePercentage: "100%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    },
    {
      id: 1,
      matchName: "Arsenal vs Sunderland",
      homePercentage: "45%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    }
  ]

  const { connect, address, etherWeb3, yoTokenContract, contranctBet } = useAppContext();
  async function mintToken()
  {
    console.log(await yoTokenContract.owner());
    // const daiWithSigner = yoTokenContract.connect(etherWeb3.getSigner());
    // const totaltoken = ethers.utils.parseUnits("10000000000", 18);
    // daiWithSigner._mint(totaltoken);
    const match = await contranctBet.getRoundOnRun()

    for (const roundId of match)
    {
      console.log(roundId.toString());
      const matchDetail = await contranctBet.round(roundId.toString())
      console.log("MatchDetail :", matchDetail)
    }

  }


  useMemo(async () =>
  {
    console.log("useMemo : ", contranctBet)
    if (contranctBet == null)
    {
      return
    }
    getRoundsDetail();
  }, [yoTokenContract])


  async function getRoundsDetail()
  {
    const match = await contranctBet.getRoundOnRun()
    var array = [];

    for (const roundId of match)
    {
      console.log(roundId.toString());
      const matchDetail = await contranctBet.round(roundId.toString())
      console.log("MatchDetail :", matchDetail)
      array.push(matchDetail)
    }
    console.log("array.length :", array.length)
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
            Button
          </button>
        </div>

        <div className="flex w-full flex-wrap flex-row">

          {sports.map((sport) => (
            <CardMatch key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    </>
  )
}