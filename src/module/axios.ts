import axios  from 'axios';

const CustomAxios = axios.create({
    headers:{
        'Access-Control-Allow-Origin': process.env.REACT_SERVER_URL,
        'Access-Control-Allow-Credentials': true,
    },
    baseURL: `${process.env.REACT_APP_API_URL}`,
    withCredentials: true,
})

export default CustomAxios;