import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import user from './user';

export default combineReducers({
    auth,
    errors,
    user,
});
