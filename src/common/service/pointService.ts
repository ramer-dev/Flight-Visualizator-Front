import { FixPointType } from "common/type/FixPointType";
import { FixPointDTO } from "dto/fixPointDTO";
import CustomAxios from "module/axios";

export async function getFixPoint() {
    const { data } = await CustomAxios.get<FixPointType[]>(`point`)
    return data;
}

export async function postFixPoint(body : FixPointDTO) {
    const { data } = await CustomAxios.post<FixPointDTO>(`point`, body)
    return data
}

export async function patchFixPoint(body : FixPointDTO, id:number) {
    const { data } = await CustomAxios.patch<FixPointDTO>(`point/${id}`, body)
    return data
}