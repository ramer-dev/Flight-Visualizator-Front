import { FrequencyType } from "common/type/FrequencyType";
import { frequencyDTO } from "dto/frequencyDTO";
import CustomAxios from "module/axios"

export async function getEntireFrequency() {
    const { data } = await CustomAxios.get<FrequencyType[]>(`freq`)
    return data;
}

export async function postFrequency(item: frequencyDTO) {
    const response = await CustomAxios.post(`freq`, item);
    return response;
}

export async function patchFrequnecy(item: frequencyDTO, id: number) {
    const response = await CustomAxios.patch(`freq/${id}`, item);
    return response;
}

export async function deleteFrequency(id: number) {
    const response = await CustomAxios.delete(`freq/${id}`,);
    return response;
}