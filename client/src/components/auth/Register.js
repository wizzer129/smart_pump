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
import Row from 'react-bootstrap/Row';

import './Login.css';
import './Register.css';

const RegisterForm = ({}) => {
    const [formFields, updateFormFields] = useState({
        email: '',
        password: '',
    });

    const onSubmit = ({ target }) => {
        console.log(target);
    };

    const onChange = ({ target }) => {
        updateFormFields({ ...formFields, [target.type]: target.value });
    };

    return (
        <Container className="h-100">
            <Row className="h-100 align-items-center">
                <Col sm="9" md="7" lg="5" className="mx-auto">
                    <Card className="card-login align-middle">
                        <Card.Title className="text-center">Register</Card.Title>
                        <Card.Body>
                            <Form className="form-login">
                                <Form.Group>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" onChange={onChange} value={formFields.email} />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" onChange={onChange} value={formFields.password} />
                                </Form.Group>
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

const mapStateToProps = (state) => ({
    auth: state.auth,
});

RegisterForm.propTypes = {
    registerUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { registerUser })(RegisterForm);
