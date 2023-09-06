import { LatLngLiteral } from "leaflet";

export interface SiteDTO {
    id?:number,
    siteName: string,
    siteCoordinate : LatLngLiteral,
    siteType:string,
}

export interface FixPointAutoCompleteItemType {
    label: string, coord: LatLngLiteral, id: number
}