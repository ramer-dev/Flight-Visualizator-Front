import { useMutation } from "@tanstack/react-query"
import CustomAxios from "module/axios"

export interface FinderDataType {
    id: string,
    digit: string,
    verifyDigit: string
}

export interface SetterDataType{
    pw:string,
    confirm:string,
}

export interface RegisterType {
    id:string,
    pw:string,
    pwConfirm:string,
    username: string,
    digit: string,
    digitConfirm: string
}

export const getLogin = async (id: string, pw: string) => {
    try {
        const result =  await CustomAxios.post('auth/login', { id, pw })
        
        return result;
    } catch (e) {
        return false;
    }
}

export const postLogout = async () => {
    try {
        const result = await CustomAxios.post('auth/logout')
        return result;
    } catch (e) {
        console.error(e)
    }
}

export const register = async (data : RegisterType) => {
    try {
        const result = await CustomAxios.post('auth/register', data)
        return result;
    } catch (e) {
        console.error(e)
    }
}

export const verifyId = async (id:string) => {
    try {
        const result = await CustomAxios.get('auth/id', {params:{id}})
        return result;
    } catch (e) {
        console.error(e)
    }
}

export const verifyName = async (username:string) => {
    try {
        const result = await CustomAxios.get('auth/name', {params:{username}})
        return result;
    } catch (e) {
        console.error(e)
    }
}

export const findPW = async (data : FinderDataType) => {
    try {
        const result = await CustomAxios.post('auth/findPW', data)
        return result;
    } catch (e) {
        console.error(e)
    }
}

export const setNewPW = async (id:string, pw:string) => {
    try {
        const result = await CustomAxios.post('auth/pw', {id, pw})
        return result
    } catch (e) {
        console.error(e)
    }
}