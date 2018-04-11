import axios from 'axios';

import { GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_FAILED, GET_CURRENT_USER_PENDING, LOGOUT_USER } from './actionTypes';

export const getCurrentUser = () => dispatch => {
    dispatch(getCurrentUserPending());
    axios.get('/api/get-current-user')
        .then((res) => {
            dispatch(getCurrentUserSuccess(res.data));
        }).catch(err => dispatch(getCurrentUserFailed(err)));
};

const getCurrentUserSuccess = (payload) => ({
    type: GET_CURRENT_USER_SUCCESS,
    payload,
});

const getCurrentUserPending = () => ({
    type: GET_CURRENT_USER_PENDING,
});

export const getCurrentUserFailed = (err) => ({
    type: GET_CURRENT_USER_FAILED,
    error: err,
});
