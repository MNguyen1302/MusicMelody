import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    getAllSongs() { 
        return api.get('/song') 
    },

    getTopSong() { 
        return api.get('/song/top/trending') 
    },
    
    getCategory(genre) { 
        return api.get(`/song/genre/${genre}`) 
    },
}