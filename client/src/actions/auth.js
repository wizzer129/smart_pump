import axios from 'axios';

import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    USER_LOADING,
    UPDATE_USER_PROFILE,
    UPDATING_PROFILE,
} from './types';
import { setErrors } from './errors';
import setAuthToken from '../utils/setAuthToken';

export const login = (user) => async (dispatch) => {
    dispatch({ type: USER_LOADING });
    try {
        const res = await axios.post('/api/auth', user);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        dispatch(loadUser());
    } catch (err) {
        console.error(err);
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const registerUser = (newUser) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth', newUser);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const resetUserPassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATING_PROFILE, payload: true });
        const res = await axios.post('/api/auth/reset', passwords);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    } finally {
        dispatch({ type: UPDATING_PROFILE, payload: false });
    }
};

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({ type: UPDATING_PROFILE, payload: true });
        const res = await axios.post('/api/users', user);
        console.log(res.data);
        dispatch({ type: UPDATE_USER_PROFILE, payload: res.data });
    } catch (error) {
        console.error(error);
    } finally {
        dispatch({ type: UPDATING_PROFILE, payload: false });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};
