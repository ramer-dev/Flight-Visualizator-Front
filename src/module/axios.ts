import axios  from 'axios';

const CustomAxios = axios.create({
    // headers:{
    //     'Access-Control-Allow-Origin': 'http://localhost:7000'
    // },
    baseURL: `${process.env.REACT_APP_API_URL}`,
    withCredentials: true
})

export default CustomAxios;