import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    getSong(slug) { 
        return api.get(`/song/${slug}`) 
    },
    
    likeSong(slug, userId) { 
        return api.patch(`/song/${slug}/like`, {userId}) 
    },
    
    postComment(content, userId, slug) { 
        return api.post(`/comment/${slug}`, {content, userId}) 
    }
}