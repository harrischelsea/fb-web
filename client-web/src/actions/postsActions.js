import axios from 'axios';

import { GET_POSTS_FAILED, GET_POSTS_PENDING, GET_POSTS_SUCCESS } from './actionTypes';

export const getPosts = () => dispatch => {

    dispatch(getPostsPending());
    axios.get('/api/get-posts')
        .then((res) => {
            dispatch(getPostsSuccess(res.data));
        }).catch(err => dispatch(getPostsFailed(err)));
};


const getPostsSuccess = (payload) => ({
    type: GET_POSTS_SUCCESS,
    payload,
});

const getPostsPending = () => ({
    type: GET_POSTS_PENDING,
});

export const getPostsFailed = (err) => ({
    type: GET_POSTS_FAILED,
    payload: err,
});