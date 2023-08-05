import { FlightList, FlightResult } from "common/type/FlightType"
import CustomAxios from "module/axios"

export const getFlightData = async (id: number) => {
    const { data } = await CustomAxios.get(`flight/result/${id}`)
    return data;
}

export const postFlightData = async (data: FlightResult[]) => {
    const response = await CustomAxios.post(`flight/result`, data);
    return response;
}

export const patchFlightData = async (data: FlightResult[]) => {
    const response = await CustomAxios.patch(`flight/result`, data);
    return response;
}

export const deleteFlightData = async (id: number) => {
    const response = await CustomAxios.delete(`flight/result/${id}`);
    return response;
}

export const getEntireFlightList = async () => {
    const { data } = await CustomAxios.get(`flight/list`)
    return data;
}

export const getFlightList = async (id: number) => {
    const { data } = await CustomAxios.get(`flight/list/${id}`)
    return data;
}

export const postFlightList = async (data: FlightList) => {
    const response = await CustomAxios.post(`flight/list`, data);
    return response;
}

export const patchFlightList = async (data: FlightList) => {
    const response = await CustomAxios.patch(`flight/list`, data);
    return response;
}


export const deleteFlightList = async (id: number) => {
    const response = await CustomAxios.delete(`flight/list/${id}`);
    return response;
}