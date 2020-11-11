import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingProfile from '../loaders/LoadingProfile';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, match, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            loading ? <LoadingProfile /> : isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
