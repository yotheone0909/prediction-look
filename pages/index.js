import { ethers } from '@usedapp/core/node_modules/ethers'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styles from '../styles/Home.module.css'
import CardMatch from '../component/cardmatch/cardmatch'
import Content from '../component/Content'
import { AppWrapper, useAppContext } from '../context/AppContext'
import Nav from '../component/nav/nav'
import NavContent from '../component/nav/NavContent'
import NavItem from '../component/nav/NavItem'
import ShowLoading from '../component/loading/ShowLoading'

export default function Home() {
  return (
    <>
      <ShowLoading />
      <Nav />
      <Content>
        <NavContent>
          <NavItem href="" isActive>New Releases</NavItem>
          <NavItem>Live</NavItem>
          <NavItem>My Prediction</NavItem>
        </NavContent>
        <CardMatch />
      </Content>
    </>
  )
}