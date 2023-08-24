import { LatLngLiteral } from "leaflet"
import CustomAxios from "module/axios"

type RouteType = {
    coords: LatLngLiteral,
    height: number
}

type RouteFileType = {
    route: RouteType[]
    length: number,
}

export const postRoute = async (file: File) => {
    const formData = new FormData()
    // const data = file;
    formData.append('file', file)
    // const mimetype = ''
    // switch (file.name.split('.').pop()) {
    //     case "xlsx":
    //         {
    //         data.type = '' 
    //         }
    // }
    console.log(file);

    // const {data} = await CustomAxios({headers:{"Content-Type":"multipart/form-data"}}).post(`file/route`, formData)
    const { data } = await CustomAxios.post(`file/route`, formData, {
        
        // headers: {
        //     "Content-Type": "multipart/form-data",
        //     'Access-Control-Expose-Headers': 'Contenr-Disposition',
        //     'Content-Disposition': `attachment; filename=${file.name}`
        // }
    })
    return data;
}

export const postImage = async (files: FileList) => {
    const formData = new FormData()
    for (let i of files) {
        formData.append('file', i);
    }
    const { data } = await CustomAxios.post(`file/ocr`, formData)
}

export const getRouteFromFile = async (filename: string) => {
    const { data } = await CustomAxios.get<RouteFileType>(`file/route`, { params: { filename: filename } })
    return data;
}