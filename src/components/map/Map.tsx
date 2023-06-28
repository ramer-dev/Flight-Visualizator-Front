import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapContainerProps } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import styled from '@emotion/styled';
import 'lib/leaflet/leaflet.css'
import { MutableRefObject, RefObject, useRef, useState } from 'react';
import L, { LatLng, Draw, LatLngExpression, } from 'leaflet';
import type { FeatureCollection } from 'geojson';
import EditControlFC from './DrawHooks';
import ContextMenu from 'components/context_menu/ContextMenu';
import 'leaflet-geometryutil'

const StyledMapContainer = styled(MapContainer)`
    width:100%;
    height:100vh;
    z-index:0;
`

// 1. 픽스점 레이어 그룹 생성
// 2. 

const MapDraw = {

}
type Props = {
    map : RefObject<L.Map>
}
const ContextMenuEvent = ({map}:Props) => {
    const [position, setPosition] = useState<LatLng>(new LatLng(36.0, 128.09))
    // const originCoord = useRef<L.LatLngExpression | null>(null);
    const contextMenuOpened = useRef<boolean>(false);
    const events = useMapEvents({
        contextmenu(e) {
            setPosition(e.latlng)
            contextMenuOpened.current = true;
            // originCoord.current = e.latlng;
        },
        mousemove(e) {
            if(contextMenuOpened.current) {
                const angle = L.GeometryUtil.angle(map.current!, position, e.latlng)
                const distance = L.GeometryUtil.distance(map.current!, position, e.latlng)
                console.log(L.GeometryUtil.destination(e.latlng, angle, distance ))

            }
        },

        click(e) {
            if(contextMenuOpened.current) {
                contextMenuOpened.current = false;

            }
        }
    })

    return <Popup closeButton={false} keepInView={true} position={position} offset={[0, 0]}>
        <ContextMenu startPosition={position}>
            holy
        </ContextMenu>
    </Popup>
}


const Map = () => {
    const map = useRef<L.Map>(null);
    const [geojson, setGeojson] = useState<FeatureCollection>({
        type: 'FeatureCollection',
        features: [
        ],
      });

    return (
        <StyledMapContainer center={[36.0, 128.09]} zoom={7} minZoom={4} maxZoom={14} ref={map}>
            <ContextMenuEvent map={map}/>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dev by. Hee Sang Shin'
                url="http://localhost:3000/v1/api/map/{z}/{x}/{y}"
            />
            <EditControlFC geojson={geojson} setGeojson={setGeojson}/>
            <Marker position={[37.5519, 126.9918]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    <hr />
                </Popup>
            </Marker>
        </StyledMapContainer>
    )
}

export default Map;