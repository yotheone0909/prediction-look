import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CardMatch from './component/cardmatch/Cardmatch'
import Nav from './component/nav/nav'

export default function Home() {

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

  return (
    <>
      <div>
        <div>
          <Nav />
        </div>Î
        <div className="flex w-full flex-wrap flex-row">
          {sports.map((sport) => (
            <CardMatch key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    </>
  )
}