import L from "leaflet";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { convertToWGS } from 'module/DMS'
import { renderToString } from 'react-dom/server'
import divicon from "./NumberIcon";

const radians = (i: number) => {
    return i * Math.PI / 180;
}


export const Destination = (map: L.Map, origin: string | LatLngExpression | null, angle: number | null, distance: number | null, level:number, index:number, line = true) => {
    if (!origin) return;
    if (angle === null) return;
    if (distance === null) return;
    if (!map) return;

    

    // 좌표 방식
    if (typeof origin === 'string') {
        if (origin?.includes('/')) {
            let origin_ = origin.split('/')
            const point: LatLngLiteral = { lat: +origin_[0], lng: +origin_[1] }

            const target = L.GeometryUtil.destination(point, radians(angle), distance * 1852)

            // if (line) L.polyline([point, target]).addTo(map);
            // L.marker(target).addTo(map);
            // L.marker(target, { icon: divicon(0, 1) }).addTo(map);
            return target
            // divicon(target, 1).addTo(map);
            return
        }

        // 표지소 방식
    } else if (typeof origin === 'object') {
        origin = origin as LatLngLiteral
        origin = { lat: convertToWGS(origin['lat']), lng: convertToWGS(origin['lng']) }
        const target = L.GeometryUtil.destination(origin, radians(angle), distance * 1852)
        // if (line) L.polyline([origin, target]).addTo(map);
        // L.marker(target, { icon: divicon(level, index) }).addTo(map);
        return target


    }
}