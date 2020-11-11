import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//actions
import { registerUser } from '../../actions/auth';

// ui
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormInput from '../inputs/FormInput';
import Row from 'react-bootstrap/Row';

import './Login.css';
import './Register.css';

const RegisterForm = ({ registerUser }) => {
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
        if (formFields.password === formFields.password2) {
            registerUser(formFields);
        }
    };

    const onChange = ({ target }) => {
        updateFormFields({ ...formFields, [target.type]: target.value });
    };

    return (
        <Container className="h-100">
            <Row className="h-100 align-items-center">
                <Col sm="12" md="10" lg="8" className="mx-auto">
                    <Card className="card-login align-middle">
                        <Card.Title className="text-center">Register</Card.Title>
                        <Card.Body>
                            <Form className="form-login">
                                <Form.Row>
                                    <Col>
                                        <FormInput
                                            label="Email Address"
                                            type="email"
                                            onChange={onChange}
                                            value={formFields.email}
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col sm>
                                        <FormInput
                                            label="First Name"
                                            type="fist"
                                            onChange={onChange}
                                            value={formFields.first}
                                        />
                                    </Col>
                                    <Col sm>
                                        <FormInput
                                            label="Last Name"
                                            type="last"
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
                                            onChange={onChange}
                                            value={formFields.company}
                                        />
                                    </Col>
                                    <Col sm>
                                        <FormInput
                                            label="Eye Color"
                                            type="eyeColor"
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
                                            onChange={onChange}
                                            value={formFields.address}
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row controlId="formBasicPassword">
                                    <Col sm>
                                        <FormInput
                                            label="Password"
                                            type="password"
                                            onChange={onChange}
                                            value={formFields.password}
                                        />
                                    </Col>
                                    <Col sm>
                                        <FormInput
                                            label="Confirm Password"
                                            type="password2"
                                            onChange={onChange}
                                            value={formFields.password2}
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
};

export default connect(null, { registerUser })(RegisterForm);
