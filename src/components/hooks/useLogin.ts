import { useMutation } from "@tanstack/react-query"
import CustomAxios from "module/axios"
import crypto from 'crypto'

const getLogin = async () => {
    await CustomAxios.post('login', )
}

export function useGetNotice(id:string, pw:string) {
    
    // const fallback: NoticeContentType[] = [] 
    // return useMutation(['login'], async () => getLogin(), /*{ suspense: true }*/)
}
