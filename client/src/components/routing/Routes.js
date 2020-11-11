import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import Login from '../auth/Login';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Routes = (props) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={Login} />
                <React.Fragment>
                    <div className="content-page">
                        <PrivateRoute exact path="/" component={<div>Home Profile</div>} />
                    </div>
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
