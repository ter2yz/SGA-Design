import React from 'react'
import { Popup } from 'react-map-gl'
import { IoIosClose } from "react-icons/io";

export default function MapPopup({ handleClose, latitude, longitude, label, description, imgUrl }) {
    return (
        <Popup
            latitude={latitude}
            longitude={longitude}
            closeButton={false}
            offsetTop={5}
            onClose={() => {
                handleClose(null);
            }}
            closeOnClick={true}
            sortByDepth={true}
            dynamicPosition={true}
            className="rounded-lg popup-transparent cursor-auto"
        >
            <div className="flex flex-col items-center max-w-sm py-3 px-4">
                <div className="mb-4 w-full h-32 bg-red-100 rounded-xl shadow-lg bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${imgUrl})` }}></div>
                <h2 className="mb-1 text-xl font-semibold">{label}</h2>
                <p className="mb-2 text-sm font-light line-clamp-3">{description}</p>
                <button className="bg-gray-700 px-4 py-1 text-white text-xs font-light rounded-md uppercase transition duration-200 hover:bg-gray-900">View More</button>
            </div>

            <button
                className="w-5 h-5 absolute top-1 right-1 text-gray-900 flex justify-center items-center cursor-pointer focus:outline-none"
                onClick={() => {
                    handleClose(null);
                }}
            >
                <span className="transition hover:bg-gray-600 hover:text-white text-gray-800 flex justify-center items-center rounded-full text-lg">
                    <IoIosClose />
                </span>
            </button>
        </Popup>
    )
}
