import {
    GET_POSTS_FAILED,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    LOGOUT_USER,
    GET_STATUS_FAILED,
    GET_STATUS_PENDING,
    GET_STATUS_SUCCESS,
    DELETE_STATUS_SUCCESS
} from '../actions/actionTypes';

const INITIAL_STATE = {
    loading: true,
    loadingStatus: false,
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
        case GET_STATUS_SUCCESS:
            return {...state, posts: [ action.payload, ...state.posts], loadingStatus: false };
        case GET_STATUS_PENDING:
            return {...state, loadingStatus: true };
        case GET_STATUS_FAILED:
            return {...state, err: action.payload };
        case DELETE_STATUS_SUCCESS:
            return {...state, posts: deletePost(state.posts, action.payload), loadingStatus: false };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}

function deletePost(posts, postId){
    let newPosts = posts.filter( el => el.id !== postId);
    return newPosts;
}