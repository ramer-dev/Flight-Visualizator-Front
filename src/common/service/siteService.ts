import { SiteType } from "common/type/SiteType"
import CustomAxios from "module/axios"

const delay = (ms = 1000) => {
    return new Promise((res) => setTimeout(res, ms))
}

const SiteService = {
    getSite: async () => {
        const { data } = await CustomAxios.get<SiteType[]>(`site`)
        return data;
    }
}

export default SiteService;