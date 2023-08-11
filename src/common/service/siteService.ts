import { SiteType } from "common/type/SiteType"
import CustomAxios from "module/axios"

const SiteService = {
    getSite: async () => {
        const { data } = await CustomAxios.get<SiteType[]>(`site`)
        return data;
    }
}

export default SiteService;