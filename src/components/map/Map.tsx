import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapContainerProps, ZoomControl, LayersControl, LayerGroup, useMap, Pane } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';

import 'lib/leaflet/leaflet.css'
import icon from 'lib/leaflet/images/marker-icon.png'
import iconShadow from 'lib/leaflet/images/marker-shadow.png';
import styled from '@emotion/styled';
import type { } from 'leaflet-draw';
import { useEffect, useRef, useState } from 'react';
import L, { LatLng, Layer, layerGroup, LayerOptions, Polyline, polyline } from 'leaflet';
import type { FeatureCollection } from 'geojson';
import ContextMenu from 'components/contextMenu/ContextMenu';
import 'leaflet-geometryutil'
import EditControlFC from './DrawHooks';
import CustomAxios from 'module/axios';
import { Site } from 'common/type/SiteType';
import LoadSites from './initialize/LoadSites';
import MapEvents from './MapEvents';

const StyledMapContainer = styled(MapContainer)`
    width:100%;
    height:100vh;
    z-index:0;
`

L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize:  [41, 41]
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


    return (
        <StyledMapContainer center={[36.0, 128.09]} zoom={7} minZoom={4} maxZoom={14} zoomControl={true}>
            <ZoomControl position={'bottomright'} />
            <TileLayer url="http://localhost:3000/v1/api/map/{z}/{x}/{y}" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dev by. Hee Sang Shin' />
            <LayersControl position="topright">
                <LayersControl.Overlay name='range-bearing' checked>
                    <LayerGroup pane='range-bearing'>
                        <Pane name='range-bearing'>

                        </Pane>
                    </LayerGroup>
                </LayersControl.Overlay>


                <LayersControl.Overlay name='site' checked>
                        <Pane name='site' style={{zIndex:500}}>
                            <LoadSites />
                        </Pane>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='draw2' checked>
                    <LayerGroup >

                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
            <MapEvents isOpen={contextMenuOpened} setOpen={setContextMenuOpened} />
            <EditControlFC geojson={geojson} setGeojson={setGeojson} />

        </StyledMapContainer>
    )
}

export default Map;