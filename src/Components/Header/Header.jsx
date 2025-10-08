import React from 'react'
import './Header.css'
import './../../main.css'
import { assets } from '../../assets/assets'
import SimpleCarousel from './components/Carousel'

const Header = () => {
  return (
    <div>
      
    {/* Hero Section  */}
    <section className="relative h-screen overflow-hidden">
        {/* Background Image Carousel  */}
        <div className="absolute inset-0 ">
            <SimpleCarousel />
        </div>
        {/*  Overlay  */}
        
        <div className="absolute inset-0 bg-black opacity-40"></div>

        {/* Hero Content  */}
        <div className="relative z-10 flex items-center justify-center h-full header ">
            <div className="text-center text-white max-w-4xl mx-auto px-4 header-contents">
                <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
                    Your cravings, <br />
                    <span className="text-primary font-accent text-6xl md:text-8xl">delivered perfectly</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                    Experience premium food delivery with restaurant-quality meals brought straight to your door
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  
                    <a href="#explore-menu" className="border-2 border-white text-white hover:bg-white hover:text-text-primary px-8 py-4 rounded-lg text-lg font-semibold transition-micro">
                        Browse Menu
                    </a>
                </div>
            </div>
        </div>
        
 
        {/* Scroll Indicator */} 
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
        </div>
    </section>

    </div>
  )
}

export default Header
