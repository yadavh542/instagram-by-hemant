import type { NextPage } from 'next'
import Head from 'next/head'
import Feed from '../components/Feed/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'
//import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50 overflow-y-scroll h-screen scrollbar-hide">
      <Head>
        <title>Instagram By Hemant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header/>
      {/* Feed */}
      <Feed/>
      {/* Model */}
      <Modal/>
    </div>
  )
}

export default Home
