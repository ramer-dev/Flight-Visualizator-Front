import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapContainerProps, ZoomControl, LayersControl, LayerGroup, useMap, Pane } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png';
import styled from '@emotion/styled';
import 'lib/leaflet/leaflet.css'
import type { } from 'leaflet-draw';
import { useEffect, useRef, useState } from 'react';
import L, { LatLng, Layer, layerGroup, LayerOptions, Polyline, polyline } from 'leaflet';
import type { FeatureCollection } from 'geojson';
import ContextMenu from 'components/contextMenu/ContextMenu';
import 'leaflet-geometryutil'
import EditControlFC from './DrawHooks';

const StyledMapContainer = styled(MapContainer)`
    width:100%;
    height:100vh;
    z-index:0;
`

// 1. 픽스점 레이어 그룹 생성
// 2. 

type Props = {
    isOpen: boolean,
    setOpen: (a: boolean) => void,
}
const ContextMenuEvent = ({ isOpen, setOpen }: Props) => {
    type MenuType = 'range-bearing' | 'analyze' | null;


    const map = useMap()
    const popup = useRef(L.popup({
        closeButton: false,
        autoClose: false,
        offset: [0, 0]
    }))
    const [position, setPosition] = useState<LatLng>(new LatLng(36.0, 128.09))
    const [selectedMenu, setSelectedMenu] = useState<MenuType>(null);
    const currLine = useRef<Polyline | null>(null);
    const events = useMapEvents({
        contextmenu(e) {
            setPosition(e.latlng)
            setOpen(true);
        },
        mousemove(e: any) {
            if (isOpen && selectedMenu === 'range-bearing') {
                const angle = L.GeometryUtil.angle(map, position, e.latlng)
                const distance = map.distance(position, e.latlng) / 1000

                if (currLine.current) currLine.current.remove();
                currLine.current = L.polyline([position, e.latlng], { color: 'red', pane: 'range-bearing' }).addTo(map);

                popup.current.setLatLng(e.latlng).setContent(`${angle.toFixed(1)}|${(distance * 0.539957).toFixed(1)}`)
            }
        },

        click(e) {
            if (isOpen) {
                setOpen(false);
                setSelectedMenu(null)
            }
        },


    })

    return <>
        {isOpen ? <Popup closeButton={false} keepInView={false} position={position} offset={[0, 0]}>

            <ContextMenu startPosition={position} setSelectedMenu={setSelectedMenu} popup={popup.current} />
        </Popup> : null}
    </>
}


const Map = () => {
    const drawLayer = useRef<L.LayerGroup>(null)
    const [contextMenuOpened, setContextMenuOpened] = useState<boolean>(false);

    const [geojson, setGeojson] = useState<FeatureCollection>({
        type: 'FeatureCollection',
        features: [
        ],
    });

    useEffect(() => {
        console.log('layergroup Change')
    }, [drawLayer.current])


    return (
        <StyledMapContainer center={[36.0, 128.09]} zoom={7} minZoom={4} maxZoom={14} zoomControl={true}>
            <ZoomControl position={'bottomright'} />
            <TileLayer url="http://localhost:3000/v1/api/map/{z}/{x}/{y}" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Dev by. Hee Sang Shin' />
            <LayersControl position="topright">
                <LayersControl.Overlay name='range-bearing'>
                    <LayerGroup pane='range-bearing'>
                        <Pane name='range-bearing'>

                        </Pane>
                    </LayerGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay name='draw2'>
                    <LayerGroup >

                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
            <ContextMenuEvent isOpen={contextMenuOpened} setOpen={setContextMenuOpened} />
            <EditControlFC geojson={geojson} setGeojson={setGeojson} />

        </StyledMapContainer>
    )
}

export default Map;