import { LatLngLiteral } from "leaflet"
import { PageType } from "./PageType"

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
  id?: number,
  siteName: string,
  frequency: number,
  testId: number,
  txmain?: string | null,
  rxmain?: string | null,
  txstby?: string | null,
  rxstby?: string | null,
  angle: number,
  distance: number,
  height: number,
  status?: boolean,
  point?: LatLngLiteral,
  updatedAt?: Date,
  deletedAt?: Date,
}

export interface TableFlightResult extends FlightResult {
  isNew?:boolean,
}

export interface FlightList {
  id?: number,
  testName: string,
  testDate: Date | string,
  testType: string,
  testRoute?: string,
  userId: string,
  updatedAt?: Date,
  deletedAt?: Date
  data?: PageType<FlightResult>
  count?:number
}

export interface RowType {
  no: number;
  id: string;
  siteName: string,
  frequency: number,
  testId?: number,
  txmain?: string | null,
  rxmain?: string | null,
  txstby?: string | null,
  rxstby?: string | null,
  angle: number,
  distance: number,
  height: number,
  status?: boolean,
  point?: LatLngLiteral,
  updatedAt?: Date,
  deletedAt?: Date,
}

export interface OCRReturnType {
  ocr:OCRWrapperType[];
  site:string;
}

export interface OCRWrapperType {
  frequency: number,
  txmain:string | null,
  rxmain:string | null,
  txstby:string | null,
  rxstby:string | null,
  angle: number,
  distance: number,
  height:number,
}