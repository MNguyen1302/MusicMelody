import { combineReducers } from "redux";

import admin from './reducers/admin';
import auth from './reducers/auth';
import song from './reducers/song';
import user from './reducers/user';
import artist from './reducers/artist';
import songs from './reducers/songs';
import playlist from './reducers/playlist';

export default combineReducers({ admin, auth, song, songs, user, artist, playlist })