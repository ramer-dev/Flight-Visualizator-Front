import { FixPointType } from "./FixPointType"

export interface RouteType {
    routeId: number,
    routeName: string,
    routeData : RoutePointType[] 
} 

export interface RoutePointType {
    routeId: number,
    routeName: string,
    routePoint: string,
    routeEntry: number,
    minHeight:number,
    maxHeight:number,
    routeArea:string,
    routeTytpe:string,
    routePointData : FixPointType
}