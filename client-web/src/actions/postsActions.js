import axios from 'axios';

import {
    GET_POSTS_FAILED,
    GET_POSTS_PENDING,
    GET_POSTS_SUCCESS,
    GET_STATUS_FAILED,
    GET_STATUS_SUCCESS,
    GET_STATUS_PENDING,
    DELETE_STATUS_SUCCESS
} from './actionTypes';

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

const getStatusSuccess = (payload) => ({
    type: GET_STATUS_SUCCESS,
    payload,
});

const getStatusPending = () => ({
    type: GET_STATUS_PENDING,
});

export const getStatusFailed = (err) => ({
    type: GET_STATUS_FAILED,
    payload: err,
});

export const getStatus = (postID) => dispatch => {
    dispatch(getStatusPending());
    axios.get('/api/status/' + postID)
        .then((res) => {
            console.log('11111', res.data);
            dispatch(getStatusSuccess(res.data));
        }).catch(err => dispatch(getStatusFailed(err)));
};


const deleteStatusSuccess = (payload) => ({
    type: DELETE_STATUS_SUCCESS,
    payload,
});

export const deleteStatus = (postID) => dispatch => {
    dispatch(deleteStatusSuccess(postID));
};