import React from 'react'
import './Home.css'
import './../../main.css'
import { assets } from '../../assets/assets'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'

const Home = () => {
  const [category, setCategory] = React.useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/> 
      <FoodDisplay category={category} />
    </div>
  )
}

export default Home
