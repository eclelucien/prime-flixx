import axios from 'axios';

// baseURL: 'https://api.themoviedb.org/3/'
// URL: /movie/now_playing?api_key=b5598d298b1080f63e71b57690a0bb28&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;