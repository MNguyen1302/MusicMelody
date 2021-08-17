import * as types from '../types';
import cookies from 'js-cookie';

let initialState = {
    user: null,
    favourite: [],
    artists: [],
    isLogged: false,
    loading: false,
    errors: null
}

const user = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.TOGGLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.GET_USER: 
            return {
                ...state,
                user: payload,
                isLogged: true
            }

        case types.USER_LOGOUT: 
            localStorage.removeItem('userToken');
            cookies.remove('userId');

            return initialState;

        case types.EDIT_USER:
            return Object.assign({}, state, { user: payload });

        case types.CHANGE_PASSWORD:
            return {
                ...state
            }

        case types.GET_FAVOURITE:
            return {
                ...state,
                favourite: payload.favourites,
                artists: payload.artists,
                loading: false
            }
        default: 
            return state;
    }
}

export default user;