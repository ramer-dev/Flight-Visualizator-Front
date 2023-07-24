export interface FlightResultModel {
  id: number,
  siteName: string,
  frequency: number,
  txmain?: string,
  rxmain?: string,
  txstby?: string,
  rxstby?: string,
  angle: number,
  distance: number,
  height: number,

}

export interface FlightResult {
  id: number,
  siteName: string,
  frequency: number,
  testId: number,
  txmain?: string,
  rxmain?: string,
  txstby?: string,
  rxstby?: string,
  angle: number,
  distance: number,
  height: number,
  status?: boolean,
  updatedAt?: Date,
  deletedAt?: Date,
}

export interface TableFlightResult extends FlightResult {
  isNew?:boolean,
}

export interface FlightList {
  id: number,
  testName: string,
  testDate: Date | string,
  testType: string,
  testRoute?: string,
  userId: string,
  updatedAt?: Date,
  deletedAt?: Date
  data: FlightResult[]
}

export interface TableFlightList extends FlightList {
  data:TableFlightResult[],
}