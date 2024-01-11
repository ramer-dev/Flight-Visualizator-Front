import { markingSelectCursor } from "common/store/atom";
import ContextMenu from "components/map/contextMenu/ContextMenu";
import L from "leaflet";
import { LatLng, Polyline } from "leaflet";
import { useRef, useState } from "react";
import { Popup, PopupProps, useMap, useMapEvents } from "react-leaflet";
import { useRecoilState } from "recoil";
import { renderToString } from 'react-dom/server'
import RangeBearing from "./contextMenu/RangeBearing";
import React from "react";
import Analyze from "./contextMenu/Analyze";

type Props = {
    isOpen: boolean,
    setOpen: (a: boolean) => void,
    setZoom: (a: number) => void,
}
type MenuType = 'range-bearing' | 'analyze' | null;

const MapEvents = ({ isOpen, setOpen, setZoom }: Props) => {
    const map = useMap()

    const popup = useRef(L.popup({
        closeButton: false,
        autoClose: false,
        offset: [0, 0],
    }));
    const [position, setPosition] = useState<LatLng>(new LatLng(36.0, 128.09))
    const [selectedMenu, setSelectedMenu] = useState<MenuType>(null);
    const [marking, setMarking] = useRecoilState(markingSelectCursor)
    const currLine = useRef<Polyline | null>(null);

    useMapEvents({
        contextmenu(e) {
            setPosition(e.latlng)
            popup.current.setLatLng(e.latlng);
            setOpen(true);
        },
        mousemove(e) {
            if (selectedMenu === 'range-bearing') {
                const angle = L.GeometryUtil.angle(map, position, e.latlng).toFixed(1)
                const distance = (map.distance(position, e.latlng) * 0.000539957).toFixed(1)
                if (currLine.current) currLine.current.remove();
                currLine.current = L.polyline([position, e.latlng], { color: 'red', pane: 'range-bearing' }).addTo(map);

                popup.current.setLatLng(e.latlng).setContent(renderToString(<RangeBearing angle={angle} distance={distance} />))
            }

        },

        click(e) {
            if (selectedMenu === 'range-bearing') {
                console.log('Disable range-bearing')
                setSelectedMenu(null)
            } else {
                if (currLine.current) currLine.current.remove();
            }

            if (marking.selection) {

                setMarking({ selection: false, coordinate: e.latlng })
            }



        },
        zoomend(e) {
            setZoom(e.target._animateToZoom)
        },

        popupclose(e: L.PopupEvent) {
            if (e.popup.options.className === 'test' && selectedMenu === 'analyze') setTimeout(() => {setSelectedMenu(null)}, 200)
        }

    })

    return isOpen ? <Popup className="test" closeButton={true} keepInView={false} closeOnClick={false} position={position} offset={[0, 0]} closeOnEscapeKey>
        {selectedMenu === 'analyze' ?
            <Analyze origin={position} />
            : <ContextMenu setOpen={setOpen} startPosition={position} setSelectedMenu={setSelectedMenu} popup={popup.current} />}
    </Popup> : null

}

export default MapEvents;