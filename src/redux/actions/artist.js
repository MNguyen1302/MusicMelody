import * as types from '../types';
import * as apis from '../../apis/artist';

export const getAllArtist = () => async (dispatch) => {
    try {
        const { data } = await apis.getAllArtist();

        dispatch({
            type: types.GET_ALL_ARTIST,
            payload: data
        })
    } catch (error) {
        console.log(error);
    }
}