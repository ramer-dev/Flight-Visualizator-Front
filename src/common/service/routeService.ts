import { RouteType } from "common/type/RouteType";
import { RouteDTO } from "dto/routeDTO";
import CustomAxios from "module/axios";

export async function getRoute() {
    const { data } = await CustomAxios.get<RouteType[]>(`route`)
    return data;
}

export async function postRouteData(body: RouteDTO) {
    const { data } = await CustomAxios.post<RouteDTO>(`route`, body)
    return data;
}