import CustomAxios from "module/axios"

export const postRoute = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await CustomAxios.post(`file/route`, formData )
    return data;
}

export const postImage = async (files: FileList) => {
    const formData = new FormData()
    for (let i of files){
        formData.append('file', i);
    }
    const {data } = await CustomAxios.post(`file/ocr`, formData)
}