import axios  from 'axios';

const CustomAxios = axios.create({
    // headers:{
    //     'Access-Control-Allow-Origin': 'http://localhost:7000'
    // },
    baseURL: 'http://localhost:7000/v1/api',
    withCredentials: true
})

export default CustomAxios;