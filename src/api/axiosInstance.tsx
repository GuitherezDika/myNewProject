import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    timeout: 10000
})

const axiosPixa  = axios.create({
    baseURL: 'https://pixabay.com/api',
    timeout: 5000,
})

export {axiosPixa};
export default axiosInstance;