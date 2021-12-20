import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CardMatch from './component/cardmatch/cardmatch'
import Nav from './component/nav/nav'

export default function Home() {
  return (
    <div>
      <div>
        <Nav />
      </div>

      <div class="flex">
        <div class="w-1/5 bg-gray-500 h-12"></div>
        <div class="w-3/5 bg-gray-400 h-12"></div>
        <div class="w-1/5 bg-gray-500 h-12"></div>
      </div>

      <CardMatch/>
    </div>
  )
}
