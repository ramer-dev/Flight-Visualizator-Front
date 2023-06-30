import { LatLngExpression } from "leaflet";

export interface Site {
    siteId: number;
    siteName: string
    siteCoordinate: LatLngExpression;
    siteType: string;
    updatedAt: Date;
    deletedAt: Date;
}