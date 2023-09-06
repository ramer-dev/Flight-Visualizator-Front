import {Area} from "common/type/AreaType";
import { AreaDTO } from "dto/areaDTO";
import { frequencyDTO } from "dto/frequencyDTO";
import CustomAxios from "module/axios"

export async function getEntireArea(valid : boolean) {
    const { data } = await CustomAxios.get<Area[]>(`area`,{params:{valid}})
    return data;
}

export async function postArea(item: AreaDTO) {
    const response = await CustomAxios.post(`area`, item);
    return response;
}

export async function patchArea(item: AreaDTO, id: number) {
    const response = await CustomAxios.patch(`area/${id}`, item);
    return response;
}

export async function deleteArea(id: number) {
    const response = await CustomAxios.delete(`area/${id}`,);
    return response;
}