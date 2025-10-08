import React from 'react'
import './ExploreMenu.css'
import './../../main.css'
import { menu_list } from '../../assets/assets' 

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='explore-menu text-center mb-12 py-16' id='explore-menu'>
        <h2 className="text-4xl font-playfair font-bold text-text-primary mb-4">What are you craving?</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">Explore our carefully curated categories and discover your next favorite meal</p>
        <div className='explore-menu-list mt-8 flex flex-wrap justify-center gap-6'>
            {
                menu_list.map( (item, index) => {
                    return (
                    
                         <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className={`explore-menu-list-item bg-gradient-to-r from-blue-400 to-blue-600 border-4 border-white flex flex-col justify-center items-center gap-2 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-white`} key={index}>
                            <img className={category===item.menu_name?"active":""} src = {item.menu_image} alt=""/>
                            <p >{item.menu_name}</p>
                            <p>{item.menu_TotalItems}</p>
                        </div>
                    );
                })
            }

        </div> 
        <hr />
    </div>
  )
}

export default ExploreMenu
