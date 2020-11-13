import {
    UPDATE_USER_PROFILE,
    UPDATING_PROFILE,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    //LOGIN_FAIL,
    LOGOUT,
    LOGIN_FAIL,
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: false,
    profileLoading: false,
    user: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATING_PROFILE:
            return {
                ...state,
                profileLoading: payload,
            };
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                user: payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload[0],
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                user: payload,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return initialState;
        default:
            return state;
    }
}
