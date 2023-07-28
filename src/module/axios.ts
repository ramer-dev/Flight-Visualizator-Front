import axios from 'axios';

 const CustomAxios = axios.create({
    baseURL: 'http://localhost:7000/v1/api'
})

export default CustomAxios;