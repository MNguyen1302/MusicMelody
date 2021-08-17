import * as types from '../types';
import apis from '../../apis/admin';

export default {
    getAllSongs: () => async (dispatch) => {
        try {
            const { data } = await apis.getAllSongs();
    
            dispatch({
                type: types.GET_ALL_SONGS,
                payload: data
            });
        } catch (error) {
            console.log(error);
        }
    },
    getSong: (slug) => async (dispatch) => {
        try {
            const { data } = await apis.getSong(slug);
    
            dispatch({
                type: types.GET_SONG,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    editSong: (name, artist, composer, type, image, audio, lyric, slug) => async (dispatch) => {
        try {
            const formData = new FormData();
    
            formData.append('name', name);
            formData.append('artist', artist);
            formData.append('composer', composer);
            formData.append('type', type);
            formData.append('image', image);
            formData.append('audio', audio);
            formData.append('lyric', lyric);
    
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
    
            const { data } = await apis.editSong(slug, formData, config);
            dispatch({
                type: types.EDIT_SONG,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    
    createSong: (name, artist, composer, type, image, audio, lyric, id) => async (dispatch) => {
        try {
            const formData = new FormData();
    
            formData.append('name', name);
            formData.append('artist', artist);
            formData.append('composer', composer);
            formData.append('type', type);
            formData.append('image', image);
            formData.append('audio', audio);
            formData.append('lyric', lyric);
            formData.append('id', id);
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            const { data } = await apis.createSong(formData, config);
    
            dispatch({
                type: types.CREATE_SONG,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    deleteSong: (id) => async (dispatch) => {
        try {
            const { data } = await apis.deleteSong(id);
            console.log(data);
            dispatch({
                type: types.DELETE_SONG,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
    
}