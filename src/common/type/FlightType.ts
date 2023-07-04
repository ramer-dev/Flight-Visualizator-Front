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
  txmain?: "5/5",
  rxmain?: "5/5",
  txstby?: "5/5",
  rxstby?: "5/5",
  angle: number,
  distance: number,
  height: number,
  status?: boolean,
  updatedAt?: Date,
  deletedAt?: Date,
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
  data?: FlightResult[]
}