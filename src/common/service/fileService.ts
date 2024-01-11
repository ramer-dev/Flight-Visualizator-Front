import { OCRReturnType } from "common/type/FlightType"
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

export const postImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await CustomAxios.post<OCRReturnType>(`file/ocr`, formData, {timeout:120 * 1000})
    return data
}

export const getRouteFromFile = async (filename: string) => {
    const { data } = await CustomAxios.get<RouteFileType>(`file/route`, { params: { filename: filename } })
    return data;
}