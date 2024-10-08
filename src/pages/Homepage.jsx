import React from 'react'
import Header from '../components/Header/Header'
import Categories from '../components/Categories/Categories'
import Recommendations from '../components/Recommendations/Recommendations'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div >
      <Header/>
      <Categories/>
      <Recommendations/>
      <Footer/>
    </div>
  )
}

export default Home