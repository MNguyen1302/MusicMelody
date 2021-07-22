import { combineReducers } from "redux";

import auth from './reducers/auth';
import song from './reducers/song';
import user from './reducers/user';
import artist from './reducers/artist';

export default combineReducers({ auth, song, user, artist })