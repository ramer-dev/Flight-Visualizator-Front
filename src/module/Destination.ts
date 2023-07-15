import L from "leaflet";
import { LatLngExpression, LatLngLiteral } from "leaflet";
import { convertToWGS } from 'module/DMS'

export const Destination = (map: L.Map, origin: string | LatLngExpression | null, range: number | null, distance: number | null, line = true) => {
    if (!origin) return;
    if (!range) return;
    if (!distance) return;
    if (!map) return;
    if (typeof origin === 'string') {
        if (origin?.includes('/')) {
            let origin_ = origin.split('/')
            const point: LatLngLiteral = { lat: +origin_[0], lng: +origin_[1] }

            const target = L.GeometryUtil.destination(point, range, distance * 1852)

            if (line) L.polyline([point, target]).addTo(map);
            L.marker(target).addTo(map);

            return
        }
    } else if (typeof origin === 'object') {
        origin = origin as LatLngLiteral
        origin = { lat: convertToWGS(origin['lat']), lng: convertToWGS(origin['lng']) }
        const target = L.GeometryUtil.destination(origin, range, distance * 1852)
        if (line) L.polyline([origin, target]).addTo(map);
        L.marker(target).addTo(map);
    }
}