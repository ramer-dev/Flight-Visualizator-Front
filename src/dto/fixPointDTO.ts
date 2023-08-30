import { LatLngLiteral } from "leaflet";

export interface FixPointDTO {
    id?:number,
    pointName: string,
    pointCoordinate : LatLngLiteral,
}

export interface FixPointAutoCompleteItemType {
    label: string, coord: LatLngLiteral, id: number
}