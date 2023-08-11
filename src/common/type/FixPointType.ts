import { LatLngExpression, LatLngLiteral } from "leaflet";

export interface FixPointType {
    id:number,
    pointName: string,
    pointCoordinate : LatLngLiteral,
    updatedAt:Date | null;
    deletedAt:Date | null;
}