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
    dispatch({
        type: USER_LOADING,
    });
    try {
        const res = await axios.post('/api/auth', user);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        setAuthToken(res.data.token);
        //dispatch(loadUser());
    } catch (err) {
        console.log('login error', err);
        dispatch({
            type: LOGIN_FAIL,
        });
    }
};

export const loadUser = () => async (dispatch) => {
    //console.log('loadUser token: ', axios.defaults.headers.common['x-auth-token']);
    try {
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
        console.log('auth error');
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const registerUser = (newUser) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth/register', newUser);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const resetUserPassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATING_PROFILE,
            payload: true,
        });
        const res = await axios.post('/api/auth/reset', passwords);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
    } finally {
        dispatch({
            type: UPDATING_PROFILE,
            payload: false,
        });
    }
};

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATING_PROFILE,
            payload: true,
        });
        const res = await axios.post('/api/users', user, { timeout: 5000 });
        console.log(res.data);
        dispatch({
            type: UPDATE_USER_PROFILE,
            payload: res.data.data,
        });
    } catch (error) {
        console.error(error);
    } finally {
        dispatch({
            type: UPDATING_PROFILE,
            payload: false,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
