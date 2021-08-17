import * as types from '../types';
import apis from '../../apis/user';

export default {
    getUser: (userId) => async (dispatch) => {
        try {
            const { data } = await apis.getUser(userId);
    
            dispatch({
                type: types.GET_USER,
                payload: data
            })
    
        } catch(error) {
            console.log(error)
        }
    },
    logout: (history) => (dispatch) => {
        try {
            dispatch({
                type: types.USER_LOGOUT,
            })
            // history.push('/');
        } catch (error) {
            console.log(error);
        }
    },
    editProfile: (avatar, firstname, lastname, name, email, address, userId) => async (dispatch) => {
        try {
            const formData = new FormData();
    
            formData.append('avatar', avatar);
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('address', address);
    
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await apis.editProfile(userId, formData, config);
            console.log(data);
            dispatch({
                type: types.EDIT_USER,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    changePassword: (userId, formData) => async (dispatch) => {
        try {
            const { data } = await apis.changePassword(userId, formData);
    
            dispatch({
                type: types.CHANGE_PASSWORD,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    },
    getFavourite: (userId) => async (dispatch) => {
        try {
            const { data } = await apis.getFavourite(userId);
    
            dispatch({
                type: types.GET_FAVOURITE,
                payload: data
            })
        } catch (error) {
            
        }
    }
}