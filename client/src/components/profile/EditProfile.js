import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ui
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormInput from '../inputs/FormInput';
import FormInputOverlay from '../inputs/FormInputOverlay';

import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import './EditProfile.css';

// actions updateUser
import { setErrors } from '../../actions/errors';
import { updateUser } from '../../actions/auth';

const EditProfile = (props) => {
    const { user, errors, setErrors, updateUser } = props;
    const [formFields, updateFormFields] = useState({
        address: '',
        company: '',
        email: '',
        eyeColor: '',
        first: '',
        last: '',
        phone: '',
    });

    const [passwords, updatePasswords] = useState({
        current: '',
        password: '',
        password2: '',
    });

    useEffect(() => {
        updateFormFields({ ...user, first: user.name.first, last: user.name.last });
    }, [user]);

    useEffect(() => {
        return () => {
            setErrors(null);
        };
    }, []);

    const onSubmit = () => {
        setErrors(null);
        const { email, first } = formFields;

        let newErrors = {};
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            newErrors.email = 'Enter a valid email';
        }

        if (first === '') {
            newErrors.first = 'Enter a valid first name';
        }

        if (Object.keys(newErrors).length === 0) {
            console.log(formFields);
            updateUser(formFields);
        } else {
            setErrors(newErrors);
        }
    };

    const resetPassword = () => {
        setErrors(null);
        const { current, password, password2 } = passwords;

        let newErrors = {};

        if (current === '') {
            newErrors.current = 'Invalid password';
        }

        if (password !== password2) {
            newErrors.password = 'Passwords do not match';
        }

        if (password.length < 6) {
            newErrors.password = 'Password is too short';
        }

        if (Object.keys(newErrors).length === 0) {
            console.log(passwords);
        } else {
            console.log(newErrors);
            setErrors(newErrors);
        }
    };

    const onChange = ({ target }) => {
        if (target.type === 'password') {
            updatePasswords({ ...passwords, [target.name]: target.value });
        } else {
            updateFormFields({ ...formFields, [target.name]: target.value });
        }
    };

    return (
        <Container className="profile-container">
            <Row className="align-items-center justify-content-center">
                <Col md={10}>
                    <Container className="light-style flex-grow-1 container-p-y">
                        <Card className="overflow-hidden profile-card shadow-lg">
                            <Card.Title className=" text-center">
                                <h4>Account settings</h4>
                            </Card.Title>
                            <Row className="no-gutters row-bordered row-border-light">
                                <Col md={3} className="pt-0">
                                    <div className="list-group list-group-flush account-settings-links">
                                        <a
                                            className="list-group-item list-group-item-action active"
                                            data-toggle="list"
                                            href="#account-general"
                                        >
                                            General
                                        </a>
                                        <a
                                            className="list-group-item list-group-item-action"
                                            data-toggle="list"
                                            href="#account-change-password"
                                        >
                                            Change password
                                        </a>
                                        <Link
                                            className="list-group-item list-group-item-action"
                                            data-toggle="list"
                                            to="/profile"
                                        >
                                            Back to Profile
                                        </Link>
                                    </div>
                                </Col>
                                <Col md={9}>
                                    <TabContent>
                                        <TabPane className="fade active show" id="account-general">
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
                                                                isInvalid={errors && errors.email ? true : false}
                                                                placement={'right'}
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
                                                                isInvalid={errors && errors.first ? true : false}
                                                                placement={'top'}
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

                                                    <Button fluid="true" onClick={onSubmit} block>
                                                        Update Profile
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                        </TabPane>
                                        <TabPane className="fade" id="account-change-password">
                                            <Card.Body className="pb-2">
                                                <FormInputOverlay
                                                    label="Current Password"
                                                    type="password"
                                                    name="current"
                                                    onChange={onChange}
                                                    value={passwords.current}
                                                    isInvalid={errors && errors.current ? true : false}
                                                    placement={'right'}
                                                    toolTip={errors && errors.current}
                                                />
                                                <FormInputOverlay
                                                    label="Password"
                                                    type="password"
                                                    name="password"
                                                    onChange={onChange}
                                                    value={passwords.password}
                                                    isInvalid={errors && errors.password ? true : false}
                                                    placement={'right'}
                                                    toolTip={errors && errors.password}
                                                />

                                                <FormInputOverlay
                                                    label="Confirm Password"
                                                    name="password2"
                                                    type="password"
                                                    onChange={onChange}
                                                    value={passwords.password2}
                                                    isInvalid={errors && errors.password2 ? true : false}
                                                    placement={'right'}
                                                    toolTip={errors && errors.password2}
                                                />
                                                <Button fluid="true" onClick={resetPassword} block>
                                                    Reset Passwords
                                                </Button>
                                            </Card.Body>
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

EditProfile.propTypes = {
    setErrors: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    errors: state.errors,
});

export default connect(mapStateToProps, { setErrors, updateUser })(EditProfile);
