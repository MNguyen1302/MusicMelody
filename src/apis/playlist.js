import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export default {
    createPlaylist(userId) {
        return api.post(`/playlist/${userId}`);
    },

    getPlaylist(userId) {
        return api.get(`/playlist/${userId}`);
    },

    getPlaylistDetail(userId, id) {
        return api.post(`/playlist/detail/${id}`, {userId});
    },

    addToPlaylist(userId, id, slug) {
        return api.patch(`/playlist/add/${id}`, {userId, slug});
    },

    removeFromPlaylist(userId, id, slug) {
        return api.patch(`/playlist/remove/${id}`, {userId, slug});
    },

    updatePlaylist(userId, id, formData, config) {
        return api.patch(`/playlist/update/${id}/${userId}`, formData, config);
    }
}