import { LatLngExpression } from "leaflet";
import { Area } from "./AreaType";

export interface SectorType {
    id: number;
    sectorName: string;
    sectorData: LatLngExpression[];

    // @Column()
    sectorAreaId?: number;

    sectorArea? : Area;
 
    updatedAt: Date;

    deletedAt: Date;
}