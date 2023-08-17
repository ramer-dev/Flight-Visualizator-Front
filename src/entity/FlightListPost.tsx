import { FlightResult } from "common/type/FlightType"

export interface FlightListPost {
    id?: number,
    testName: string,
    testDate: Date | string,
    testType: string,
    testRoute?: string,
    userId: string,
    updatedAt?: Date,
    deletedAt?: Date
    data: FlightResult[]
    count?:number
  }