import { NoticeContext } from "common/type/NoticeType";
import CustomAxios from "module/axios"

export async function getNotice() {
    const { data } = await CustomAxios.get<NoticeContext[]>(`notice`)
    return data;
}

export async function postNotice(item: NoticeContext) {
    const response = await CustomAxios.post(`notice`, item);
    return response;
}

export async function patchNotice(item: NoticeContext, id: number) {
    const response = await CustomAxios.post(`notice/${id}`, item);
    return response;
}

export async function deleteNotice(id: number) {
    const response = await CustomAxios.delete(`notice/${id}`,);
    return response;
}