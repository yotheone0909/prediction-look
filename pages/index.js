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
  const { connect, address, predicts } = useAppContext();
  function mintToken()
  {
    console.log(predicts);
  }

  useEffect(() =>
  {
    predicts && predicts
    console.log("Index : ", predicts[0]);
  }, [predicts])

  return (
    <>
      <div>
        <div>
          <Nav />
        </div>
        <div className="flex flex-row">
          {predicts.length}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() =>
            mintToken()
          }>
            Button
          </button><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {predicts.length}
          </button>
        </div>

        <div className="flex w-full flex-wrap flex-row">

          {predicts.map((predict) => (
            <CardMatch key={predicts[0].timeLockPrediction} predict={predict} />
          ))}
        </div>
      </div>
    </>
  )
}