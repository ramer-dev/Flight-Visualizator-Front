import { MapContainer, TileLayer, Pane } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';
import NavBar from 'components/navbar/NavBar';

import 'lib/leaflet/leaflet.css'
import icon from 'lib/leaflet/images/marker-icon.png'
import iconShadow from 'lib/leaflet/images/marker-shadow.png';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import L from 'leaflet';
import type { FeatureCollection } from 'geojson';
import 'leaflet-geometryutil'
import EditControlFC from './DrawHooks';
import MapEvents from './MapEvents';
import React from 'react';
import Initializer from './initialize/Initializer';
import CustomZoomControl from './control/CustomZoomControl';
import CustomLayerControl from './control/CustomLayerControl';

const StyledMapContainer = styled(MapContainer)`
    width:100%;
    height:100vh;
    z-index:0;
    font-family: 'Pretendard';
`

L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})

// 1. 픽스점 레이어 그룹 생성
// 2. 
const Map = () => {
    const [contextMenuOpened, setContextMenuOpened] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(6);
    const [geojson, setGeojson] = useState<FeatureCollection>({
        type: 'FeatureCollection',
        features: [
        ],
    });
 
    const MapFunction = useMemo(() => (
        <StyledMapContainer center={[36.0, 128.09]} zoom={zoom} minZoom={4} maxZoom={10} id='enroute' zoomControl={false}>
            <NavBar />
            <Initializer />
            <MapEvents isOpen={contextMenuOpened} setOpen={setContextMenuOpened} setZoom={setZoom} />

            <TileLayer url={`${process.env.REACT_APP_API_URL}/map/{z}/{x}/{y}`} attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dev by. Hee Sang Shin' />
            {/* <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            {/* <LayersControl position="topright"> */}

            <Pane name="sector"/>
            <Pane name="route" />
            <Pane name="site" />
            <Pane name="lowsite" />
            <Pane name="vortac" />
            <Pane name="point" />
            <Pane name="marking" />
            <Pane name="pin" />
            <Pane name="flight-record"/>
            <Pane name="range-bearing" />
            <Pane name='analyze'/>
            <Pane name='setting' style={{zIndex:1900}}/>

            <EditControlFC geojson={geojson} setGeojson={setGeojson} />
            <CustomLayerControl position="topright" />
            <CustomZoomControl position="bottomright" zoom={zoom} />

        </StyledMapContainer>
    ), [zoom, contextMenuOpened, geojson])

    return MapFunction;


}

export default Map;