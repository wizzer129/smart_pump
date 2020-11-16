import axios from 'axios';
import {
    AUTH_ERROR,
    EDITED_PROFILE_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    USER_LOADING,
    UPDATE_USER_PROFILE,
    UPDATING_PROFILE,
    SET_USER_REGISTERED,
} from './types';
import { setErrors } from './errors';
import setAuthToken from '../utils/setAuthToken';

export const login = (user) => async (dispatch) => {
    dispatch({
        type: USER_LOADING,
    });
    dispatch(setErrors(null));
    try {
        const res = await axios.post('/api/auth', user);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        setAuthToken(res.data.token);
        //dispatch(loadUser());
    } catch (err) {
        if (err.response.status !== 504) dispatch(setErrors(err.response.data.error));
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOADING,
        });
        const res = await axios.get('/api/auth', {
            headers: {
                'x-auth-token': localStorage.token,
            },
        });
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        console.log('auth error', err);
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const registerUser = (newUser) => async (dispatch) => {
    try {
        dispatch(setErrors(null));
        dispatch({ type: UPDATING_PROFILE, payload: true });
        const res = await axios.post('/api/auth/register', newUser);
        dispatch(setUserRegistered(true));
    } catch (err) {
        if (err.response.status !== 504) {
            dispatch(setErrors(err.response.data.error));
        }
    } finally {
        dispatch({ type: UPDATING_PROFILE, payload: false });
    }
};

export const resetUserPassword = (passwords) => async (dispatch) => {
    dispatch(editedProfileSuccess(null));
    try {
        dispatch({
            type: UPDATING_PROFILE,
            payload: true,
        });
        await axios.post('/api/auth/reset', passwords);

        dispatch(setErrors(null));
        dispatch(editedProfileSuccess(true));
    } catch (err) {
        if (err.response.status !== 504) dispatch(setErrors(err.response.data.errors));
        else {
            dispatch(editedProfileSuccess(false));
        }
    } finally {
        dispatch({
            type: UPDATING_PROFILE,
            payload: false,
        });
    }
};

export const updateUser = (user) => async (dispatch) => {
    dispatch(editedProfileSuccess(null));
    try {
        dispatch({
            type: UPDATING_PROFILE,
            payload: true,
        });
        const res = await axios.post(`/api/users`, user);
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data.data,
        });
        dispatch(editedProfileSuccess(true));
    } catch (err) {
        if (err.response.status !== 504) dispatch(setErrors(err.response.data.errors));
        else {
            dispatch(editedProfileSuccess(false));
        }
    } finally {
        dispatch({
            type: UPDATING_PROFILE,
            payload: false,
        });
    }
};

export const editedProfileSuccess = (value) => (dispatch) => {
    dispatch({ type: EDITED_PROFILE_SUCCESS, payload: value });
};

export const setUserRegistered = (value) => (dispatch) => {
    dispatch({ type: SET_USER_REGISTERED, payload: value });
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
