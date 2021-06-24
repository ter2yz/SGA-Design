import React, { useState, useEffect } from 'react'
import ReactMapGL, { FlyToInterpolator, WebMercatorViewport, Marker, Popup } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import _ from 'lodash'


import MapMarker from '../images/map-marker.svg'

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../css/transition.css'

import { fetchMarkersJSON } from '../data/MapMarkers'
import MapPopup from './MapPopup'

import { createBreakpoint } from 'react-use'

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
const useBreakpoint = createBreakpoint();

export default function Map() {

    const [sites, setSites] = useState([])
    const [isTablet, setIsTablet] = useState(false)

    const breakpoint = useBreakpoint()

    const [viewport, setViewport] = useState({
        latitude: -37.8513957458897,
        longitude: 145.08111093184124,
        width: '100%',
        height: '100%',
        zoom: 12
    })
    const [selectedMarker, setSelectMarker] = useState(null);
    const [isEnterMarker, setIsEnterMarker] = useState(false);
    const [waitingMarker, setWaitingMarker] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (sites.length > 0) {
            const bounds = [[_.maxBy(sites, 'longitude').longitude, _.minBy(sites, 'latitude').latitude], [_.minBy(sites, 'longitude').longitude, _.maxBy(sites, 'latitude').latitude]]
            const width = viewport.width
            const height = viewport.height
            const { longitude, latitude, zoom } = new WebMercatorViewport({ ...viewport, ...{ width: 1000, height: 800 } })
                .fitBounds(bounds, {
                    padding: 200,
                });
            setViewport({
                ...viewport,
                longitude,
                latitude,
                zoom,
                width,
                height,
                transitionDuration: 300,
                transitionInterpolator: new FlyToInterpolator(),
            });
            setLoading(false)
        }
    }, [sites])

    useEffect(() => {
        fetchMarkersJSON()
            .then(({ data, errors }) => {
                if (errors) {
                    console.error(errors)
                } else {
                    const items = data.mapMarkersCollection.items;
                    items.map(item => {
                        setSites(prevState => ([
                            ...prevState,
                            {
                                id: item.sys.id,
                                label: item.label,
                                latitude: item.latitude,
                                longitude: item.longitude,
                                img: item.image.url,
                                description: item.description
                            }
                        ]))
                    })
                }
            })
    }, [])

    useEffect(() => {
        if (breakpoint !== "laptopL" || breakpoint !== "laptopL") {
            setIsTablet(true)
        } else {
            setIsTablet(false)
        }
    }, [])

    useEffect(() => {
        if (isEnterMarker) {
            setSelectMarker(null);
        }
    }, [isEnterMarker])

    useEffect(() => {
        if (isEnterMarker && !selectedMarker) {
            setSelectMarker(waitingMarker);
            setIsEnterMarker(false);
            setWaitingMarker(null);
        }
    }, [isEnterMarker, waitingMarker, selectedMarker])

    return (
        <div className="w-full h-full">
            {!loading && <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/ter2yzzzzz/ckq3mpv6v21om17pjzz4i9wn9"
                onViewportChange={viewport => {
                    setViewport(viewport)
                }}
                dragPan={!isTablet}
                scrollZoom={!isTablet}
            >

                {
                    sites.map(site => (
                        <Marker
                            key={site.id}
                            latitude={site.latitude}
                            longitude={site.longitude}
                        >
                            <button
                                className="w-10 focus:outline-none"
                                onMouseEnter={(e) => {
                                    e.preventDefault();
                                    console.log("ENTTERING MARKERS")
                                    if (!selectedMarker) {
                                        setIsEnterMarker(true);
                                        setWaitingMarker(site);
                                    } else if (site.id !== selectedMarker.id) {
                                        setIsEnterMarker(true);
                                        setWaitingMarker(site);
                                    }
                                }}
                            >
                                <img className="w-full transform -translate-x-1/2" src={MapMarker} alt="" />
                            </button>
                        </Marker>
                    ))
                }


                <TransitionGroup>
                    {selectedMarker ? (
                        <CSSTransition
                            timeout={300}
                            classNames="item"
                        >
                            <MapPopup
                                latitude={selectedMarker.latitude}
                                longitude={selectedMarker.longitude}
                                label={selectedMarker.label}
                                description={selectedMarker.description}
                                imgUrl={selectedMarker.img}
                                handleClose={setSelectMarker}
                            />
                        </CSSTransition>
                    ) : null}

                </TransitionGroup>

            </ReactMapGL>}
        </div>
    )
}
