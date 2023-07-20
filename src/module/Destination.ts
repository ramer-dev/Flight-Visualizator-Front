import L from "leaflet";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { convertToWGS } from 'module/DMS'
import { renderToString } from 'react-dom/server'

const radians = (i: number) => {
    return i * Math.PI / 180;
}


const divicon = (point: LatLngExpression, index: number) => { return L.divIcon({ html: `<div style="background-color:white">${index}</div>` }) }


export const Destination = (map: L.Map, origin: string | LatLngExpression | null, range: number | null, distance: number | null, line = true) => {
    if (!origin) return;
    if (range === null) return;
    if (distance === null) return;
    if (!map) return;

    

    // 좌표 방식
    if (typeof origin === 'string') {
        if (origin?.includes('/')) {
            let origin_ = origin.split('/')
            const point: LatLngLiteral = { lat: +origin_[0], lng: +origin_[1] }

            const target = L.GeometryUtil.destination(point, radians(range), distance * 1852)

            if (line) L.polyline([point, target]).addTo(map);
            // L.marker(target).addTo(map);
            L.marker(target, { icon: divicon(target, 1) }).addTo(map);

            // divicon(target, 1).addTo(map);
            return
        }

        // 표지소 방식
    } else if (typeof origin === 'object') {
        origin = origin as LatLngLiteral
        origin = { lat: convertToWGS(origin['lat']), lng: convertToWGS(origin['lng']) }
        const target = L.GeometryUtil.destination(origin, radians(range), distance * 1852)
        if (line) L.polyline([origin, target]).addTo(map);
        L.marker(target, { icon: divicon(target, 1) }).addTo(map);


    }
}