import {
    GET_POSTS_FAILED,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    LOGOUT_USER
} from '../actions/actionTypes';

const INITIAL_STATE = {
    loading: true,
    err: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
        return {...state, posts: action.payload.data, loading: false };
        case GET_POSTS_PENDING:
            return {...state, loading: true };
        case GET_POSTS_FAILED:
            return {...state, err: action.payload };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}