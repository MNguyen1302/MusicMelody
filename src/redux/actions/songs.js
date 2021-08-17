import * as types from '../types';
import apis from '../../apis/songs';

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
    getTopSong: () => async (dispatch) => {
        try {
            const { data } = await apis.getTopSong();
    
            dispatch({
                type: types.GET_TOP_TRENDING,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    getCategory: (genre) => async (dispatch) => {
        try {
            const { data } = await apis.getCategory(genre);
    
            dispatch({
                type: types.GET_CATEGORY,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


