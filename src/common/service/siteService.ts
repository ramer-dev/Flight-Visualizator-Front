import { SiteType } from "common/type/SiteType"
import { SiteDTO } from "dto/siteDTO";
import CustomAxios from "module/axios"

export const getSite = async () => {
    const { data } = await CustomAxios.get<SiteType[]>(`site`)
    return data;
}

export async function postSite(body : SiteDTO) {
    const { data } = await CustomAxios.post<SiteDTO>(`site`, body)
    return data
}

export async function patchSite(body : SiteDTO, id:number) {
    const { data } = await CustomAxios.patch<SiteDTO>(`site/${id}`, body)
    return data
}

export async function deleteSite( id:number) {
    const { data } = await CustomAxios.delete(`site/${id}`)
    return data
}
