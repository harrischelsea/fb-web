import { combineReducers } from 'redux';
import authReducers from "./authReducers";
import postsReducers from "./postsReducers";
import getCurrentUserReducers from "./getCurrentUserReducers";

export default combineReducers({
    auth: authReducers,
    posts: postsReducers,
    user: getCurrentUserReducers
});