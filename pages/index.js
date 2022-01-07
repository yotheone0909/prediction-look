import { ethers } from '@usedapp/core/node_modules/ethers'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import CardMatch from './component/cardmatch/Cardmatch'
import Content from './component/Content'
import { AppWrapper, useAppContext } from './component/context/AppContext'
import Nav from './component/nav/Nav'
import NavContent from './component/nav/NavContent'
import NavItem from './component/nav/NavItem'

export default function Home() {

  const sports = [
    {
      id: 1,
      totalAmount: "Arsenal vs Sunderland",
      homePercentage: "100%",
      drawPercentage: "25%",
      awayPercentage: "30%"
    }
  ]
  const [users, setUsers] = useState(0);
  const { connect, address, contranctBet } = useAppContext();
  const [predicts, setPredicts] = useState([])

  function mintToken() {
    //console.log(predicts);
  }

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
    for (const matchDetail of matchs) {
      setPredicts(prevState => [...prevState, { timeCreatePrediction: matchDetail.timeCreatePrediction, timeEndPrediction: matchDetail.timeEndPrediction, timeLockPrediction: matchDetail.timeLockPrediction }])
    }
  }

  return (
    <>
      <Nav />
      <Content>
      <NavContent>
          <NavItem href="/new" isActive>New Releases</NavItem>
          <NavItem href="/top">Top Rated</NavItem>
          <NavItem href="/picks">Vincent’s Picks</NavItem>
        </NavContent>
        <CardMatch/>
      </Content>
    </>
  )
}