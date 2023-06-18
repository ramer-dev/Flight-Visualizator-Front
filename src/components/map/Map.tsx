import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import styled from '@emotion/styled';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize:  [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const StyledMapContainer = styled(MapContainer)`
    width:100%;
    height:100vh;
    z-index:0;
`

// 1. 픽스점 레이어 그룹 생성
// 2. 

const Event = () => {
    const events = useMapEvents({
        contextmenu: (e) => {
            console.log(e.latlng)
        }
    })

    return null;
}

const Map = () => {
    return (
        <StyledMapContainer center={[36.0, 128.09]} zoom={7} minZoom={4} maxZoom={10} zoomDelta={0.5}>
            <Event/>
            <TileLayer
                attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dev By HS Shin'
                url="http://localhost:3000/v1/api/map/{z}/{x}/{y}"
            />
            <Marker position={[37.55, 126.99]}> 
                <Popup>
                    A pretty CSS3 popup.  Easily customizable.
                </Popup>
            </Marker>
        </StyledMapContainer>
    )
}

export default Map;