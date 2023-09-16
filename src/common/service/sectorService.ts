import { SectorType } from "common/type/SectorType";
import { SectorDTO } from "dto/sectorDTO";
import CustomAxios from "module/axios";

export async function getSector() {
    const { data } = await CustomAxios.get<SectorType[]>(`sector`)
    return data;
}

export async function postSectorData(body: SectorDTO) {
    const { data } = await CustomAxios.post<SectorDTO>(`sector`, body)
    return data;
}

export async function patchSectorData(id:number, body:SectorDTO) {
    const {data } = await CustomAxios.patch<SectorDTO>(`sector/${id}`, body)
    return data
}

export async function deleteSectorData(id:number) {
    const {data} = await CustomAxios.delete(`sector/${id}`);
    return data
}