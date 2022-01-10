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

  const [users, setUsers] = useState(0);

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