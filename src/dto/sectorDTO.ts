import { LatLngLiteral } from "leaflet";

export interface SectorDTO {
    sectorId?: number,
    sectorName: string,
    sectorAreaId: number,
    sectorData : LatLngLiteral[];
} 