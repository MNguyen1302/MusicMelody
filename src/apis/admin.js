import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    getAllSongs() { 
        return api.get('/song') 
    },

    getSong(slug) { 
        return api.get(`/song/${slug}`) 
    },

    editSong (slug, formData, config) { 
        return api.patch(`/admin/edit/${slug}`, formData, config) 
    },

    createSong(formData, config) { 
        return api.post('/admin/create/song', formData, config) 
    },
    
    deleteSong(id) { 
        return api.delete(`/admin/delete/${id}`) 
    }
}