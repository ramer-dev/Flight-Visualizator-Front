import { FlightList, FlightResult } from "common/type/FlightType"
import { FlightListPost } from "entity/FlightListPost";
import CustomAxios from "module/axios"

export const getEntireFlightData = async (take: number, skip: number) => {
    const { data } = await CustomAxios.get(`flight/result/`, { params: { take, skip } })
    return data;
}


export const getFlightData = async (take?: number, skip?: number, id?: number) => {
    if (id) {
        const { data } = await CustomAxios.get(`flight/result/${id}`)
        return data;
    } else {
        const { data } = await CustomAxios.get(`flight/result`)
        return data;
    }

}

export const postFlightData = async (data: FlightResult[], testId: string) => {
    const response = await CustomAxios.post(`flight/result`, { data, testId });
    return response;
}

export const patchFlightData = async (data: FlightListPost, testID: number) => {
    const titleData = { ...data }
    delete titleData.data;
    if (data?.data) {
        const rows = [...data.data].map(t => {return {...t, testId:testID}})
        const response = await CustomAxios.patch(`flight/list/${testID}`, titleData); 
        const resultResponse = await CustomAxios.patch(`flight/result`, rows)
        return response;
    }
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

export const postFlightList = async (data: FlightListPost) => {
    const response = await CustomAxios.post(`flight/list`, data);
    return response;
}

export const patchFlightList = async (data: FlightList, id: number) => {
    const response = await CustomAxios.patch(`flight/list/${id}`, data);
    return response;
}


export const deleteFlightList = async (id: number) => {
    const response = await CustomAxios.delete(`flight/list/${id}`);
    return response;
}

export const patchFlightResultCoords = async (data: FlightResult, id: string) => {
    const response = await CustomAxios.patch(`flight/result/${id}`, data);
    return response;
}