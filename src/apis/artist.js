import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    getAllArtist() { 
        return api.get('/artist') 
    },

    getArtist(slug) { 
        return api.get(`/artist/${slug}`) 
    },
    
    followArtist(slug, userId) { 
        return api.patch(`/artist/${slug}/follow`, {userId}) 
    },
    
    createArtist(formData, config) {
        return api.post('/admin/create/artist', formData, config)
    }
}