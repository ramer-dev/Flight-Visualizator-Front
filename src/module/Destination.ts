import L from "leaflet";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { convertToWGS } from 'module/DMS' 

// const radians = (i: number) => {
//     return i * Math.PI / 180;
// }


export const Destination = (origin: string | LatLngExpression | null, angle: number | null, distance: number | null) => {
    if (!origin) return;
    if (angle === null) return;
    if (distance === null) return;

    

    // 좌표 방식
    if (typeof origin === 'string') {
        if (origin?.includes('/')) {
            let origin_ = origin.split('/')
            const point: LatLngLiteral = { lat: +origin_[0], lng: +origin_[1] }

            const target = L.GeometryUtil.destination(point, angle, distance * 1852)

            return target
        }

        // 표지소 방식
    } else if (typeof origin === 'object') {
        origin = origin as LatLngLiteral
        origin = { lat: convertToWGS(origin['lat']), lng: convertToWGS(origin['lng']) }
        const target = L.GeometryUtil.destination(origin, angle, distance * 1852)
        // target.lat = convertToWGS(target.lat)
        // target.lng = convertToWGS(target.lng)

        return target


    }
}