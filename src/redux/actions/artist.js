import * as types from '../types';
import apis from '../../apis/artist';

export default {
    getAllArtist: () => async (dispatch) => {
        try {
            const { data } = await apis.getAllArtist();
    
            dispatch({
                type: types.GET_ALL_ARTIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    getArtist: (slug) => async (dispatch) => {
        try {
            const { data } = await apis.getArtist(slug);
    
            dispatch({
                type: types.GET_ARTIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    followArtist: (slug, userId) => async (dispatch) => {
        try {
            const { data } = await apis.followArtist(slug, userId);
    
            dispatch({
                type: types.FOLLOW_ARTIST,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    
    createArtist: (name, genre, image, description) => async (dispatch) => {
        try {
            const formData = new FormData();
    
            formData.append('name', name);
            formData.append('genre', genre);
            formData.append('image', image);
            formData.append('description', description);
    
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            const { data } = await apis.createArtist(formData, config);
    
            dispatch({
                type: types.CREATE_ARTIST,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
    
}