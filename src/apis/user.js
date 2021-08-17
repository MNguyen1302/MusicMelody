import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    getUser(userId) { 
        return api.get(`/user/${userId}`) 
    },
    
    editProfile(userId, formData, config) { 
        return api.patch(`/user/edit/${userId}`, formData, config) 
    },
    
    changePassword(userId, formData) { 
        return api.patch(`/user/password/${userId}`, formData) 
    },
    
    getFavourite(userId) { 
        return api.get(`/user/${userId}/getFavourite`) 
    }
}