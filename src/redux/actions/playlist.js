import * as types from '../types';
import apis from '../../apis/playlist';

export default {
    createPlaylist: (userId) => async (dispatch) => {
        try {
            const { data } = await apis.createPlaylist(userId);
            console.log(data);
            dispatch({
                type: types.CREATE_PLAYLIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    getPlaylist: (userId) => async (dispatch) => {
        try {
            const { data } = await apis.getPlaylist(userId);

            dispatch({
                type: types.GET_PLAYLIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    getPlaylistDetail: (userId, id) => async (dispatch) => {
        try {
            const { data } = await apis.getPlaylistDetail(userId, id) 

            dispatch({
                type: types.GET_PLAYLIST_DETAIL,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    addToPlaylist: (userId, id, slug) => async (dispatch) => {
        try {
            const { data } = await apis.addToPlaylist(userId, id, slug);

            dispatch({
                type: types.UPDATE_PLAYLIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    removeFromPlaylist: (userId, id, slug) => async (dispatch) => {
        try {
            const { data } = await apis.removeFromPlaylist(userId, id, slug);

            dispatch({
                type: types.UPDATE_PLAYLIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },

    updatePlaylist: (userId, id, formPlaylist) => async (dispatch) => {
        try {
            const formData = new FormData();
    
            formData.append('image', formPlaylist.image);
            formData.set('name', formPlaylist.name);
            formData.set('description', formPlaylist.description);

            if(!formPlaylist.name) formData.delete('name');
            if(!formPlaylist.description) formData.delete('description');
            if(!formPlaylist.image) formData.delete('image');
            
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await apis.updatePlaylist(userId, id, formData, config);

            dispatch({
                type: types.UPDATE_PLAYLIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}