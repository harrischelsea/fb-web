import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER
} from '../actions/actionTypes';

const INITIAL_STATE = {
    isLogged: false,
    username: '',
    id: '',
    token: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLogged: true,
                username: action.payload.name,
                id: action.payload.id,
                pictureUrl: action.payload.picture_url,
                token: action.payload.token,
            };
        case LOGOUT_USER:
            return INITIAL_STATE;
        default:
            return state;
    }
}