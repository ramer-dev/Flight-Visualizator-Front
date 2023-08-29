import { LatLngLiteral } from "leaflet";

export interface FixPointDTO {
    id?:number,
    pointName: string,
    pointCoordinate : LatLngLiteral,
}