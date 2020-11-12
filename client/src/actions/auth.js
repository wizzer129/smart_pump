import axios from 'axios';

import { AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED, USER_LOADING } from './types';
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
    } finally {
        dispatch({ type: USER_LOADING });
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
        console.log(err);
        dispatch(logout);
    }
};

export const registerUser = (newUser) => async (dispatch) => {
    try {
        const res = await axios.post('/api/auth', newUser);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (error) {}
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};
