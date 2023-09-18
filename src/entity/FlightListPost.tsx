import { FlightResult } from "common/type/FlightType"
import { LatLngLiteral } from "leaflet"

export interface FlightListPost {
    id?: number,
    testName: string,
    testDate: Date | string,
    testType: string,
    testRoute?: string,
    userId: string,
    updatedAt?: Date,
    deletedAt?: Date
    data?: FlightResult[]
    count?:number
    point?:LatLngLiteral;
  }