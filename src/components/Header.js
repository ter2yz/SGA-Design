import React, { useRef, useEffect, useState } from 'react'
import BuildingImage from '../images/building-with-green-background.png'
import { motion } from 'framer-motion'

export default function Header() {
    const headerRef = useRef(null)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [isFixed, setIsFixed] = useState(false)

    const handleScroll = () => {
        if (window.scrollY >= headerHeight) {
            setIsFixed(true)
        } else {
            setIsFixed(false)
        }
    }

    window.addEventListener("scroll", handleScroll);

    useEffect(() => {
        if (headerRef) {
            setHeaderHeight(headerRef.current.offsetHeight)
        }
    }, [])

    return (
        <div className={`relative w-full md:h-screen flex flex-col transition duration-500 z-40 ${isFixed ? 'bg-[#2f4858] md:bg-[#2f4858]' : 'bg-[#2f4858] md:bg-transparent'}`} style={{ backgroundColor: `` }}>
            <div
                ref={headerRef}
                className={`w-full flex flex-shrink-0 justify-center items-center top-0 transition z-40 ${isFixed ? 'bg-gray-800/100 fixed' : 'bg-gray-800/0 sticky'}`}
            >
                <div className={`container flex justify-center md:justify-between items-center transition-all duration-500 ${isFixed ? 'py-2' : 'py-5'}`}>
                    <div className="w-48 rounded-lg">
                        <img className="w-full h-auto" src="http://www.sgadesign.com.au/wp-content/uploads/2017/01/Layer-0.png" alt="" />
                    </div>
                    <div className="hidden md:flex justify-center items-center">
                        <button className={`${isFixed ? 'text-gray-100 md:text-gray-100' : 'text-gray-100 md:text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>Home</p>
                        </button>
                        <button className={`${isFixed ? 'text-gray-100 md:text-gray-100' : 'text-gray-100 md:text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>Services</p>
                        </button>
                        <button className={`${isFixed ? 'text-gray-100 md:text-gray-100' : 'text-gray-100 md:text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>About SGADesign</p>
                        </button>
                        <button className={`${isFixed ? 'text-gray-100 md:text-gray-100' : 'text-gray-100 md:text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>Contact Us</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`w-full ${isFixed ? 'block' : 'hidden'}`} style={{ height: `${headerHeight}px` }}>
                {/* Placeholder */}
            </div>
            <div
                className="relative w-full md:h-screen flex justify-center z-10"
            >
                <div className="relative container h-full">
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: '-3rem' }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute w-full h-full flex items-end inset-0 bg-cover bg-no-repeat bg-top z-10"
                        style={{ backgroundImage: `url(${BuildingImage})` }}>
                        <div className="w-full h-full bg-gradient-to-r from-[#2f4858] via-[#2f4858] to-[#2f4858]/90 opacity-70 md:opacity-0"></div>
                    </motion.div>
                    <motion.div
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute w-full h-full flex items-end inset-0 z-0">
                        <div className="w-full h-full md:h-[80%] rounded-t-xl bg-[#2f4858]"></div>
                    </motion.div>
                    <div className="relative w-full py-32 md:py-0 md:w-1/2 lg:w-1/3 h-full flex flex-col justify-center px-10 z-30">
                        <motion.h1
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: '-3rem' }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                            className="text-white text-center md:text-left font-bold text-5xl leading-none"
                        >
                            <span className="font-semibold " style={{ fontSize: '60%' }}>we build</span>
                            <span className="block uppercase" style={{ fontSize: '150%' }}>future</span>
                        </motion.h1>
                        <motion.p
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: '-3rem' }}
                            transition={{ delay: 2, duration: 0.5 }}
                            className="text-white text-center md:text-left mt-5">
                            SGA put human experience as the base of design. We respect, collect, observe and analyse client’s experience, and make them the fundamental data when creating customised design solutions.
                        </motion.p>
                    </div>
                </div>
            </div>
        </div>
    )
}
