import React from 'react'
import './Footer.css'
import './../../main.css'
import { Link, useNavigate } from "react-router-dom";
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer pb-4 bg-text-primary text-white py-12' id='footer'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info  */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <span className="text-xl font-playfair font-bold">FoodPoint</span>
                        </div>
                        <p className="text-gray-300 mb-4">Your cravings, delivered perfectly. Premium food delivery with restaurant-quality meals.</p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.instagram.com/the_food_point00/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-primary transition-micro"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm5.75-3.25a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" />
                                </svg>
                            </a>

                            {/* Google */}
                            <a
                                href="https://www.justdial.com/Jhunjhunu/The-Food-Point-Cafe-Bissau/9999P1592-1592-250220040517-M5B9_BZDET"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-primary transition-micro"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M12 2a10 10 0 1 0 10 10a9.93 9.93 0 0 0-.25-2.25h-9.75v4.5h5.75a5.5 5.5 0 1 1-1.75-6.5l3.5-3.5A10 10 0 0 0 12 2z"
                                    />
                                </svg>
                            </a>

                        </div>
                    </div>

                    {/*  Quick Links */}
                    <div>
                        <h3 className="text-lg font-playfair font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link
                                to="/#explore-menu"
                                onClick={() => {
                                    setTimeout(() => {
                                        const section = document.querySelector("#explore-menu");
                                        section?.scrollIntoView({ behavior: "smooth" });
                                    }, 300);
                                }}
                                className="text-gray-300 hover:text-primary transition-micro"
                            >Menu</Link></li>
                            <li><Link to="/myorders" className="text-gray-300 hover:text-primary transition-micro">Track Order </Link></li>


                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="text-lg font-playfair font-semibold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li> <Link
                                to="/#explore-menu"
                                onClick={() => {
                                    setTimeout(() => {
                                        const section = document.querySelector("#explore-menu");
                                        section?.scrollIntoView({ behavior: "smooth" });
                                    }, 300);
                                }}
                                className="text-gray-300 hover:text-primary transition-micro"
                            >
                                Pizza
                            </Link></li>
                            <li><Link
                                to="/#explore-menu"
                                onClick={() => {
                                    setTimeout(() => {
                                        const section = document.querySelector("#explore-menu");
                                        section?.scrollIntoView({ behavior: "smooth" });
                                    }, 300);
                                }}
                                className="text-gray-300 hover:text-primary transition-micro"
                            >Burgers</Link></li>
                            <li><Link
                                to="/#explore-menu"
                                onClick={() => {
                                    setTimeout(() => {
                                        const section = document.querySelector("#explore-menu");
                                        section?.scrollIntoView({ behavior: "smooth" });
                                    }, 300);
                                }}
                                className="text-gray-300 hover:text-primary transition-micro"
                            >Sandwiches</Link></li>
                            <li><Link
                                to="/#explore-menu"
                                onClick={() => {
                                    setTimeout(() => {
                                        const section = document.querySelector("#explore-menu");
                                        section?.scrollIntoView({ behavior: "smooth" });
                                    }, 300);
                                }}
                                className="text-gray-300 hover:text-primary transition-micro"
                            >Coffee</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-playfair font-semibold mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                Stand, baipaas-road, Bissau, Rajasthan 331027
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                </svg>
                                +91-8239304047
                            </li>
                            <li className="flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                </svg>
                                sanjeetjakhar53@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; 2025 FoodPoint. All Rights Reserved.</p>
                </div>
            </div>


        </div>
    )
}

export default Footer
