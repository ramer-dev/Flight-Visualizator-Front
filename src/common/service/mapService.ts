import { FlightResult } from "common/type/FlightType";
import { LatLngLiteral } from "leaflet";
import CustomAxios from "module/axios";

export const getNearBy = async (point: LatLngLiteral, distance: number) => {
    const { data } = await CustomAxios.post<FlightResult>(`flight/result/nearby`, {point, distance})
    return data;
}
