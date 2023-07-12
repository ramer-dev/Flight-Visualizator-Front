import CustomAxios from "module/axios"

const delay = (ms = 1000) => {
    return new Promise((res) => setTimeout(res, ms))
}

export const FlightResultService = {
    getData: async (id: number) => {
        const { data } = await CustomAxios.get(`flight/result/${id}`)
        return data;
    }
}