import { useMutation } from "@tanstack/react-query"
import CustomAxios from "module/axios"

export const getLogin = async (id: string, pw: string) => {
    try {
        const result =  await CustomAxios.post('auth/login', { id, pw })
        
        return result;
    } catch (e) {
        return false;
    }
}


export const getTestCookie = async () => {
    const result = await CustomAxios.get('auth/cookies');
    return result
} 

export const postLogout = async () => {
    try {
        const result = await CustomAxios.post('auth/logout')
        return result;
    } catch (e) {
        console.error(e)
    }
}
