import * as types from '../types';

let initialState = {
    loading: false,
    errors: null
}

const user = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.POST_COMMENT: 
            return {
                ...state,
            }
        default: 
            return state;
    }
}

export default user;