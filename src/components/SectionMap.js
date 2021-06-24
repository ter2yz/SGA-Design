import React, { useRef, useEffect } from 'react'
import Map from './Map'
import { useIntersection } from 'react-use'
import { motion, useAnimation } from 'framer-motion'

export default function SectionMap() {

    const intersectionRef = useRef(null)
    const animation = useAnimation()
    const intersection = useIntersection(intersectionRef, {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    });

    useEffect(() => {
        if (intersection && intersection.intersectionRatio >= 0.2) {
            animation.start(index => ({
                opacity: 1,
                y: 0,
                transition: { duration: 1, delay: index * 0.5 }
            }))
        } else {
            animation.start({
                opacity: 0,
                y: -20
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intersection])

    return (
        <div className="relative w-full lg:h-screen flex justify-center lg:items-center">
            <div
                ref={intersectionRef}
                className="container"
            >
                <div className="w-full flex flex-col lg:flex-row-reverse justify-center py-20 px-4 lg:px-0">
                    <motion.div
                        custom={1}
                        animate={animation}
                        className="w-full lg:w-1/2 mb-10"
                    >
                        <div className="w-full text-center lg:text-left mt-10 lg:pl-16">
                            <h1 className="text-gray-800 font-bold text-5xl leading-none uppercase">
                                <span className="">What we did</span>
                                <span className="block ">in these days</span>
                            </h1>
                            <p className="text-gray-800 mt-5">
                                SGA put human experience as the base of design. We respect, collect, observe and analyse client’s experience, and make them the fundamental data when creating customised design solutions.
                            </p>
                            <p className="text-gray-800 mt-3">
                                SGA put human experience as the base of design. We respect, collect, observe and analyse client’s experience, and make them the fundamental data when creating customised design solutions.
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        custom={0}
                        animate={animation}
                        className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] rounded-lg overflow-hidden shadow-lg"
                    >
                        <Map />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
