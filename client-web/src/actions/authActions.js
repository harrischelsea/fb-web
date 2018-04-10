import axios from 'axios';

import { LOGIN_USER_PENDING, LOGIN_USER_FAILED, LOGIN_USER_SUCCESS, LOGOUT_USER } from './actionTypes';

export const loginUser = response => dispatch => {
    if (!(response)) {
        dispatch(loginUserFailed(null));
        return;
    }
    dispatch(loginUserPending());
    axios.post('/api/login', response)
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common.Authorization = res.data.token;
            dispatch(loginUserSuccess(res.data));
        }).catch(err => dispatch(loginUserFailed(err)));
};


const loginUserSuccess = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload,
});

const loginUserPending = () => ({
    type: LOGIN_USER_PENDING,
});

export const loginUserFailed = (err) => ({
    type: LOGIN_USER_FAILED,
    error: err,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});