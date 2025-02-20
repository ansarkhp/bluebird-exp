'use client'

import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';
import * as topojson from 'topojson-client';

import pointsData from '../assets/random-locations.json';
import globeJson from '../assets/countries_110m.json';

const min = 1000;
const max = 4000;
const sliceData = pointsData

const arcsData = sliceData.map(() => {
    const randStart = Math.floor(Math.random() * sliceData.length);
    const randEnd = Math.floor(Math.random() * sliceData.length);
    const randTime = Math.floor(Math.random() * (max - min + 10) + min);
    let r = [Math.round(Math.random() * 3)]
    return {
        startLat: sliceData[randStart].lat,
        startLng: sliceData[randStart].lng,
        endLat: sliceData[randEnd].lat,
        endLng: sliceData[randEnd].lng,
        time: randTime,
        color: [['#fa3e48', '#af74e2', '#f8404b', '#ffcb58'][r], ['#ffc656', '#90dffe', '#aa64ec', '#90e0ff'][r], ['#fa3e48', '#af74e2', '#f8404b', '#ffcb58'][r]]
    };
});



const GlobeSection = () => {

    const globeRef = useRef(null);

    const globeReady = () => {
        if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
            globeRef.current.controls().autoRotateSpeed = 0.25; 
            globeRef.current.controls().enableZoom = false;

            globeRef.current.pointOfView({
                lat: 28.61,
                lng: 77.20,
                altitude: 1.5,
            });
        }
    };


    return (
        <div className='globe-wrap'>
            <Globe
                ref={globeRef}
                onGlobeReady={globeReady}
                backgroundColor='#151638'
                rendererConfig={{ antialias: true, alpha: true }}
                globeMaterial={
                    new THREE.MeshPhongMaterial({
                        color: '#151638',
                        opacity: 0.9,
                        transparent: true,
                    })
                }
                atmosphereColor='#000'
                atmosphereAltitude={0.75}

                //point 

                pointsMerge={true}
                pointsData={pointsData}
                pointAltitude={0.01}
                pointRadius={0.2}
                pointResolution={5}
                pointColor={() => '#eed31f'}

                //arc

                arcsData={arcsData}
                arcAltitudeAutoScale={0.3}
                arcColor='color'
                arcStroke={0.5}
                arcDashGap={2}
                arcDashAnimateTime='time'


                // polygonsData={topojson.feature(landTopology, landTopology.objects.land).features}
                // polygonSideColor={() => '#00000000'}
                // polygonCapMaterial={
                //     new THREE.MeshPhongMaterial({
                //         color: '#49ac8f',
                //         // side: THREE.DoubleSide,
                //         map: new THREE.TextureLoader().load('texture.jpg'),
                //     })
                // }
                // polygonAltitude={0.01}
                // customLayerData={[...Array(500).keys()].map(() => ({
                //     lat: (Math.random() - 1) * 360,
                //     lng: (Math.random() - 1) * 360,
                //     altitude: Math.random() * 2,
                //     size: Math.random() * 0.4,
                //     color: '#faadfd',
                // }))}
                // customThreeObject={(sliceData) => {
                //     const { size, color } = sliceData;
                //     return new THREE.Mesh(new THREE.SphereGeometry(size), new THREE.MeshBasicMaterial({ color }));
                // }}
                // customThreeObjectUpdate={(obj, sliceData) => {
                //     const { lat, lng, altitude } = sliceData;
                //     return Object.assign(obj.position, globeRef.current?.getCoords(lat, lng, altitude));
                // }}

                ///hex 
                hexPolygonsData={globeJson.features}
                hexPolygonResolution={3}
                hexPolygonColor={(geometry) => {
                    return ['#6CD5FF7A'][geometry.properties.abbrev_len % 1];
                }}
                // pointsData={myData}
                // pointAltitude='altitude'
                // pointColor='color'

                ///
                hexPolygonMargin={0.7}
                showAtmosphere={false}
            // atmosphereColor={"#3a228a"}
            // atmosphereAltitude={0.25}
            // hexPolygonColor={((e) => {
            //     if (
            //         ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
            //             e.properties.ISO_A3
            //         )
            //     ) {
            //         return "rgba(255,255,255, 1)";
            //     } else return "rgba(255,255,255, 0.7)";
            // })}



            ///arc

            />
        </div>
    )
};

export default GlobeSection;
