import { LatLngExpression, LatLngLiteral } from "leaflet";

export function convertToWGS(coord : number){
    const degree = Math.floor(coord);
    const minutes = ((coord - degree) * 100) / 60
    const seconds = (((coord - degree - minutes)) / 3600)
    return degree + minutes + seconds
}