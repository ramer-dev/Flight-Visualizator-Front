import { FixPointType } from "common/type/FixPointType";
import CustomAxios from "module/axios";

export async function getFixPoint() {
    const { data } = await CustomAxios.get<FixPointType[]>(`point`)
    return data;
}
