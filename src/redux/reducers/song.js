import * as types from '../types';

let initialState = {
    currSong: JSON.parse(localStorage.getItem('currSong')),
    song: {},
    comments: [],
    loading: false,
    error: null
}

const song = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        case types.TOGGLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case types.LIKE_SONG:
            return {
                ...state
            }
        case types.GET_SONG: 
            return {
                ...state,
                song: payload.song,
                comments: payload.comments,
                loading: false
            }
        case types.ADD_CURRENT_SONG:
            localStorage.setItem('currSong', JSON.stringify(payload));
            localStorage.removeItem('currPlaylist');
            
            return {
                ...state,
            }
        case types.PLAY_PAUSE_SONG: 
            localStorage.removeItem('currPlaylist');
            
            return {
                ...state,
                currSong: payload.currSong,
            }
        case types.POST_COMMENT: 
            return {
                ...state,
                comments: [...state.comments, payload]
            }
        default: 
            return state;
    }
}

export default song;