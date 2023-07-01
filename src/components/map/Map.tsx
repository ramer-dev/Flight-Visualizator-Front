import { MapContainer, TileLayer, LayersControl, LayerGroup, useMap, Pane, ZoomControl } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';
import NavBar from 'components/navbar/NavBar';

import 'lib/leaflet/leaflet.css'
import icon from 'lib/leaflet/images/marker-icon.png'
import iconShadow from 'lib/leaflet/images/marker-shadow.png';
import styled from '@emotion/styled';
import { Ref, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import type { FeatureCollection } from 'geojson';
import 'leaflet-geometryutil'
import EditControlFC from './DrawHooks';
import LoadSites from './initialize/LoadSites';
import MapEvents from './MapEvents';
import LoadSector from './initialize/LoadSector';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { globalMap } from 'common/store/atom';

const StyledMapContainer = styled(MapContainer)`
    width:100%;
    height:100vh;
    z-index:0;
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
    const [geojson, setGeojson] = useState<FeatureCollection>({
        type: 'FeatureCollection',
        features: [
        ],
    }); 

    // const displayMap = useMemo(
    //     () => (
    //     (
    //         <StyledMapContainer center={[36.0, 128.09]} zoom={7} minZoom={4} maxZoom={10} id='enroute' ref={map}>
    //             <MapEvents isOpen={contextMenuOpened} setOpen={setContextMenuOpened} />

    //             <TileLayer url="http://localhost:3000/v1/api/map/{z}/{x}/{y}" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dev by. Hee Sang Shin' />
    //             <LayersControl position="topright">
    //                 <LayersControl.Overlay name='range-bearing' checked>
    //                     <LayerGroup pane='range-bearing'>
    //                         <Pane name='range-bearing'>

    //                         </Pane>
    //                     </LayerGroup>
    //                 </LayersControl.Overlay>


    //                 <LayersControl.Overlay name='site' checked>
    //                     <LayerGroup pane='site'>
    //                         <Pane name='site' style={{ zIndex: 600 }}>
    //                             <LoadSites />
    //                         </Pane>
    //                     </LayerGroup>
    //                 </LayersControl.Overlay>

    //                 <LayersControl.Overlay name='sector' checked>
    //                     <LayerGroup pane='sector'>
    //                         <Pane name='hover' style={{ zIndex: 999 }}></Pane>
    //                         <Pane name='sector' style={{ zIndex: 200 }}>
    //                             <LoadSector />
    //                         </Pane>
    //                     </LayerGroup>
    //                 </LayersControl.Overlay>


    //                 <LayersControl.Overlay name='draw2' checked>
    //                     <LayerGroup >

    //                     </LayerGroup>
    //                 </LayersControl.Overlay>
    //             </LayersControl>
    //             <EditControlFC geojson={geojson} setGeojson={setGeojson} />

    //         </StyledMapContainer>
    //     )
    // )
    // , [])

    return (
        (
            <StyledMapContainer center={[36.0, 128.09]} zoom={7} minZoom={4} maxZoom={10} id='enroute' zoomControl={false}>
                <ZoomControl position='bottomright'/>
                <NavBar></NavBar>
                <MapEvents isOpen={contextMenuOpened} setOpen={setContextMenuOpened}/>

                <TileLayer url="http://localhost:3000/v1/api/map/{z}/{x}/{y}" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dev by. Hee Sang Shin' />
                <LayersControl position="topright">
                    <LayersControl.Overlay name='range-bearing' checked>
                        <LayerGroup pane='range-bearing'>
                            <Pane name='range-bearing'>

                            </Pane>
                        </LayerGroup>
                    </LayersControl.Overlay>


                    <LayersControl.Overlay name='site' checked>
                        <LayerGroup pane='site'>
                            <Pane name='site' style={{ zIndex: 600 }}>
                                <LoadSites />
                            </Pane>
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name='sector' checked>
                        <LayerGroup pane='sector'>
                            <Pane name='hover' style={{ zIndex: 999 }}></Pane>
                            <Pane name='sector' style={{ zIndex: 200 }}>
                                <LoadSector />
                            </Pane>
                        </LayerGroup>
                    </LayersControl.Overlay>


                    <LayersControl.Overlay name='draw2' checked>
                        <LayerGroup >

                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                <EditControlFC geojson={geojson} setGeojson={setGeojson} />

            </StyledMapContainer>
        )
    )
}

export default Map;