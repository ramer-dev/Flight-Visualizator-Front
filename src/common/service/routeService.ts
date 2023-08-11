import { RouteType } from "common/type/RouteType";
import CustomAxios from "module/axios";

export async function getRoute() {
    const { data } = await CustomAxios.get<RouteType[]>(`route`)
    return data;
}