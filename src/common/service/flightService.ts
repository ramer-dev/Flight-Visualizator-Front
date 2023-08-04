import { FlightResult } from "common/type/FlightType"
import CustomAxios from "module/axios"

const delay = (ms = 1000) => {
    return new Promise((res) => setTimeout(res, ms))
}

export const getFlightData = async (id: number) => {
    const { data } = await CustomAxios.get(`flight/result/${id}`)
    return data;
}

export const postFlightData = async (data:FlightResult[]) => {
    const response = await CustomAxios.post(`flight/result`, data);
    return response;
}

export const patchFlightData = async (data:FlightResult[]) => {
    const response = await CustomAxios.patch(`flight/result`, data);
    return response;
}

export const deleteFlightData = async(id:number) => {
    const response = await CustomAxios.delete(`flight/result/${id}`);
    return response;
}