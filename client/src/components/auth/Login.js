import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const LoginForm = ({}) => {
    return <div>Login Page</div>;
};

const mapStateToProps = (state = {
    auth: state.auth,
});

LoginForm.PropTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { login })(LoginForm);
