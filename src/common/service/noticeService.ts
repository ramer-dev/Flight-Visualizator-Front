import { NoticeContentType } from "common/type/NoticeType";
import CustomAxios from "module/axios"

export async function getNotice() {
    const { data } = await CustomAxios.get<NoticeContentType[]>(`notice`)
    return data;
}

export async function postNotice(item: NoticeContentType) {
    const response = await CustomAxios.post(`notice`, item);
    return response;
}

export async function patchNotice(item: NoticeContentType, id: number) {
    const response = await CustomAxios.patch(`notice/${id}`, item);
    return response;
}

export async function deleteNotice(id: number) {
    const response = await CustomAxios.delete(`notice/${id}`,);
    return response;
}