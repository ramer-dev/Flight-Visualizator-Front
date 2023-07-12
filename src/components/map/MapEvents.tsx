import { globalMap, markingSelectCursor } from "common/store/atom";
import ContextMenu from "components/contextMenu/ContextMenu";
import L from "leaflet";
import { LatLng, Polyline } from "leaflet";
import { useEffect, useRef, useState } from "react";
import { Popup, useMap, useMapEvents } from "react-leaflet";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

type Props = {
    isOpen: boolean,
    setOpen: (a: boolean) => void,
    setZoom: (a:number) => void,
}

const MapEvents = ({ isOpen, setOpen, setZoom }: Props) => {
    type MenuType = 'range-bearing' | 'analyze' | null;
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


    const events = useMapEvents({
        contextmenu(e) {
            setPosition(e.latlng)
            popup.current.setLatLng(e.latlng);
            setOpen(true);
        },
        mousemove(e) {
            if (selectedMenu === 'range-bearing') {
                const angle = L.GeometryUtil.angle(map, position, e.latlng)
                const distance = map.distance(position, e.latlng) / 1000

                if (currLine.current) currLine.current.remove();
                console.log(position, e.latlng);
                currLine.current = L.polyline([position, e.latlng], { color: 'red', pane: 'range-bearing' }).addTo(map);

                popup.current.setLatLng(e.latlng).setContent(`${angle.toFixed(1)}|${(distance * 0.539957).toFixed(1)}`)
            }

            if (marking.selection) {
                // console.log(e.latlng)
            }

        },

        click(e) {
            if (selectedMenu === 'range-bearing') {
                setSelectedMenu(null)
            }

            if (marking.selection) {

                setMarking({ selection: false, coordinate: e.latlng })
            }
            if (isOpen) {
                setOpen(false);
            }
        },
        zoomend(e){
            console.log(e.target._animateToZoom)
            setZoom(e.target._animateToZoom)
        },

    })

    return <>
        {isOpen ? <Popup closeButton={false} keepInView={false} position={position} offset={[0, 0]}>
            <ContextMenu setOpen={setOpen} startPosition={position} setSelectedMenu={setSelectedMenu} popup={popup.current} />
        </Popup> : null}
    </>
}

export default MapEvents;