import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { registerUser } from '../../actions/auth';
import { setErrors } from '../../actions/errors';

// ui
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormInput from '../inputs/FormInput';
import Row from 'react-bootstrap/Row';
import FormInputOverlay from '../inputs/FormInputOverlay';

import './Login.css';
import './Register.css';

const RegisterForm = ({ errors, registerUser, setErrors }) => {
    const [formFields, updateFormFields] = useState({
        address: '',
        company: '',
        email: '',
        eyeColor: '',
        first: '',
        last: '',
        password: '',
        password2: '',
        phone: '',
    });

    const onSubmit = () => {
        const { email, first, password, password2 } = formFields;
        let errors = {};
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            errors.email = 'Invalid email';
        }

        if (first === '') {
            errors.first = 'Enter a valid first name';
        }

        if (password !== password2) {
            errors.password = 'Passwords do not match';
        }

        if (password.length < 6) {
            errors.password = 'Password is too short';
        }

        if (errors.length === 0) {
            registerUser(formFields);
        } else {
            setErrors(errors);
        }
    };

    const onChange = ({ target }) => {
        updateFormFields({ ...formFields, [target.name]: target.value });
    };

    return (
        <Container className="h-100">
            <Row className="h-100 align-items-center">
                <Col sm="12" md="10" lg="8" className="mx-auto">
                    <Card className="card-register align-middle">
                        <Card.Title className="text-center register-title">Register</Card.Title>
                        <Card.Body>
                            <Form className="form-login needs-validation">
                                <Form.Row>
                                    <Col>
                                        <FormInputOverlay
                                            label="Email Address"
                                            type="email"
                                            name="email"
                                            onChange={onChange}
                                            value={formFields.email}
                                            isInvalid={errors && errors.email}
                                            placement={'left'}
                                            toolTip={errors && errors.email}
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm>
                                        <FormInputOverlay
                                            label="First Name"
                                            type="first"
                                            name="first"
                                            onChange={onChange}
                                            value={formFields.first}
                                            isInvalid={errors && errors.first}
                                            placement={'left'}
                                            toolTip={errors && errors.first}
                                        />
                                    </Col>
                                    <Col sm>
                                        <FormInput
                                            label="Last Name"
                                            type="last"
                                            name="last"
                                            onChange={onChange}
                                            value={formFields.last}
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm>
                                        <FormInput
                                            label="Company"
                                            type="company"
                                            name="company"
                                            onChange={onChange}
                                            value={formFields.company}
                                        />
                                    </Col>
                                    <Col sm>
                                        <FormInput
                                            label="Eye Color"
                                            name="eyeColor"
                                            onChange={onChange}
                                            value={formFields.eyeColor}
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <FormInput
                                            label="Address"
                                            type="address"
                                            name="address"
                                            onChange={onChange}
                                            value={formFields.address}
                                        />
                                    </Col>
                                </Form.Row>

                                <Form.Row>
                                    <Col sm>
                                        <FormInputOverlay
                                            label="Password"
                                            type="password"
                                            name="password"
                                            onChange={onChange}
                                            value={formFields.password}
                                            isInvalid={errors && errors.password}
                                            placement={'left'}
                                            toolTip={errors && errors.password}
                                        />
                                    </Col>
                                    <Col sm>
                                        <FormInputOverlay
                                            label="Confirm Password"
                                            name="password2"
                                            type="password"
                                            onChange={onChange}
                                            value={formFields.password2}
                                            isInvalid={errors && errors.password2}
                                            placement={'right'}
                                            toolTip={errors && errors.password2}
                                        />
                                    </Col>
                                </Form.Row>
                                <Button fluid="true" onClick={onSubmit} block>
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    errors: state.errors,
});

export default connect(mapStateToProps, { registerUser, setErrors })(RegisterForm);
