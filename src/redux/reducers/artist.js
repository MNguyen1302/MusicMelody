import * as types from '../types';

let initialState = {
    artists: [],
    artist: {},
    loading: false,
    errors: null
}

const artist = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.GET_ALL_ARTIST: 
            return {
                ...state,
                artists: payload
            }
        default: 
            return state;
    }
}

export default artist;