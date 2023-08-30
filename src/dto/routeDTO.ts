export interface RoutePointDTO {
    routeName : string,
    routePoint? : string,
    routeEntry? : number,
}
export interface RouteDTO {
    routeId?: number,
    routeName: string,
    routeData : RoutePointDTO[];
} 