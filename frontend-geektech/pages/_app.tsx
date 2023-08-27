import '../styles/globals.css'
import '../styles/Navbar.css'
import '../styles/product.css'
import '../styles/snowflakes.scss'

import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import CategoryBar from '../components/CategoryBar'
import Footer from '../components/Footer'
import Toaster from '../components/Toaster'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar></Navbar>
      <CategoryBar></CategoryBar>
      <div className='appContent'>
        <Component {...pageProps} />
      </div>
      <Footer></Footer>
      <Toaster />
    </>
  )
}
