import * as types from '../types';
import * as apis from '../../apis/user';

export const getUser = (userId) => async (dispatch) => {
    try {
        const { data } = await apis.getUser(userId);

        dispatch({
            type: types.GET_USER,
            payload: data
        })

    } catch(error) {
        console.log(error)
    }
}
export const logout = (history) => (dispatch) => {
    dispatch({
        type: types.USER_LOGOUT,
    })
    history.push('/');
}