import * as types from '../types';
import cookies from 'js-cookie';

let initialState = {
    user: null,
    favourites: [],
    isLogged: false,
    loading: false,
    errors: null
}

const user = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
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
        default: 
            return state;
    }
}

export default user;