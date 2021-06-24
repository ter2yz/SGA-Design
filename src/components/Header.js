import React, { useRef, useEffect, useState } from 'react'
import BuildingImage from '../images/building-with-green-background.png'

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
        <div className="relative w-full h-screen flex flex-col transition duration-500 z-40" style={{ backgroundColor: `${isFixed ? '#2f4858' : 'transparent'}` }}>
            <div
                ref={headerRef}
                className={`w-full flex flex-shrink-0 justify-center items-center top-0 transition ${isFixed ? 'bg-gray-800/100 fixed' : 'bg-gray-800/0 sticky'}`}
            >
                <div className={`container flex justify-between items-center transition-all duration-500 ${isFixed ? 'py-2' : 'py-5'}`}>
                    <div className="w-48 rounded-lg">
                        <img className="w-full h-auto" src="http://www.sgadesign.com.au/wp-content/uploads/2017/01/Layer-0.png" alt="" />
                    </div>
                    <div className="flex justify-center items-center">
                        <button className={`${isFixed ? 'text-gray-100' : 'text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>Home</p>
                        </button>
                        <button className={`${isFixed ? 'text-gray-100' : 'text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>Services</p>
                        </button>
                        <button className={`${isFixed ? 'text-gray-100' : 'text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>About SGADesign</p>
                        </button>
                        <button className={`${isFixed ? 'text-gray-100' : 'text-gray-800'} font-bold text-sm uppercase mr-4 hover:text-[#f58714] transition duration-300`}>
                            <p>Contact Us</p>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`w-full ${isFixed ? 'block' : 'hidden'}`} style={{ height: `${headerHeight}px` }}>

            </div>
            <div className="w-full h-screen flex justify-center">
                <div className="container h-full bg-cover bg-no-repeat bg-top" style={{ backgroundImage: `url(${BuildingImage})` }}>
                    <div className="w-1/3 h-full flex flex-col justify-center px-10">
                        <h1 className="text-white font-bold text-5xl leading-none">
                            <span className="font-semibold " style={{ fontSize: '60%' }}>we build</span>
                            <span className="block uppercase" style={{ fontSize: '150%' }}>future</span>
                        </h1>
                        <p className="text-white mt-5">
                            SGA put human experience as the base of design. We respect, collect, observe and analyse client’s experience, and make them the fundamental data when creating customised design solutions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
