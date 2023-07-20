import { LatLngExpression } from "leaflet";

export interface SiteType {
    siteId?: number;
    siteName: string
    siteCoordinate: LatLngExpression;
    siteType: string;
    updatedAt?: Date;
    deletedAt?: Date;
}