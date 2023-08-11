import { SectorType } from "common/type/SectorType";
import CustomAxios from "module/axios";

export async function getSector() {
    const { data } = await CustomAxios.get<SectorType[]>(`sector`)
    return data;
}