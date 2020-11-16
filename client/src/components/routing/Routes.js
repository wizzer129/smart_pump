import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import Login from '../auth/Login';
import Navigation from '../navbar/Navbar';
import Register from '../auth/Register';
import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';
import axios from 'axios';
import { USER_LOADED, AUTH_ERROR } from '../../actions/types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import setAuthToken from '../../utils/setAuthToken';
const Routes = (props) => {
    useEffect(() => {
        const loadUser = () => async (dispatch) => {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            try {
                const res = await axios.get('/api/auth/');
                if (res.status === 200) {
                    dispatch({
                        type: USER_LOADED,
                        payload: res.data,
                    });
                }
                console.log('loadUser', res.data);
                dispatch({
                    type: USER_LOADED,
                    payload: res.data,
                });
            } catch (err) {
                console.log('auth error');
                console.log(err);
                dispatch({
                    type: AUTH_ERROR,
                });
            }
        };
        loadUser();
    }, [props.auth]);
    return (
        <Router>
            {props.auth.isAuthenticated ? <Navigation /> : null}
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />

                <React.Fragment>
                    <PrivateRoute exact path={['/', '/profile']} component={Profile} />
                    <PrivateRoute exact path="/profile/edit" component={EditProfile} />
                </React.Fragment>
            </Switch>
        </Router>
    );
};

Routes.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(Routes);
