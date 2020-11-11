import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
//actions
import { login } from '../../actions/auth';

// ui
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormInput from '../inputs/FormInput';
import Row from 'react-bootstrap/Row';

import './Login.css';

const LoginForm = ({ auth, login }) => {
    const [formFields, updateFormFields] = useState({
        email: '',
        password: '',
    });

    const onSubmit = ({ target }) => {
        console.log(target);
        login(formFields);
    };

    const onChange = ({ target }) => {
        updateFormFields({ ...formFields, [target.type]: target.value });
    };

    if (auth.isAuthenticated) {
        //removeAlert();
        return <Redirect to="/profile" />;
    }

    return (
        <Container className="h-100">
            <Row className="h-100 align-items-center">
                <Col sm="9" md="7" lg="5" className="mx-auto">
                    <Card className="card-login align-middle">
                        <Card.Title className="text-center">Login</Card.Title>
                        <Card.Body>
                            <Form className="form-login">
                                <FormInput
                                    label="Email address"
                                    type="email"
                                    onChange={onChange}
                                    value={formFields.email}
                                />
                                <FormInput
                                    label="Password"
                                    type="password"
                                    onChange={onChange}
                                    value={formFields.password}
                                />
                                <Button fluid="true" onClick={onSubmit} block>
                                    Login
                                </Button>
                                <Button as={Link} to="/register" fluid="true" variant="info" onClick={onSubmit} block>
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { login })(LoginForm);
