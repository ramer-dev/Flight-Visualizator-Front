import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import styled from '@emotion/styled';
import '../../lib/leaflet/leaflet.css'



const StyledMapContainer = styled(MapContainer)`
    width:100%;
    height:100vh;
`

// 1. 픽스점 레이어 그룹 생성
// 2. 
const Map = () => {
    return (
        <StyledMapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </StyledMapContainer>
    )
}

export default Map;