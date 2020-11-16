import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// ui
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FormInput from '../inputs/FormInput';
import FormInputOverlay from '../inputs/FormInputOverlay';
import ListGroup from 'react-bootstrap/ListGroup';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import './EditProfile.css';

// actions updateUser
import { setErrors } from '../../actions/errors';
import { resetUserPassword, updateUser, editedProfileSuccess } from '../../actions/auth';

const EditProfile = (props) => {
    const {
        user,
        editedProfileSuccess,
        isEditedSuccess,
        errors,
        loading,
        resetUserPassword,
        setErrors,
        updateUser,
    } = props;
    const [formFields, updateFormFields] = useState({
        address: '',
        age: '',
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
        if (user.name) {
            updateFormFields({ ...user, first: user.name.first, last: user.name.last, age: user.age.toString() });
        }
    }, [user]);

    useEffect(() => {
        return () => {
            resetAlerts();
        };
    }, []);

    const resetAlerts = () => {
        editedProfileSuccess(null);
        setErrors(null);
    };

    const onSubmit = () => {
        setErrors(null);
        const { email, first, age } = formFields;

        let newErrors = {};
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            newErrors.email = 'Enter a valid email';
        }

        if (!/^\d+$/.test(age)) {
            newErrors.age = 'Enter a valid age, numbers only';
        }

        if (first === '') {
            newErrors.first = 'Enter a valid first name';
        }

        if (Object.keys(newErrors).length === 0) {
            updateUser(formFields);
        } else {
            setErrors(newErrors);
        }
    };

    const resetPassword = () => {
        resetUserPassword(passwords);
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
                                    <ListGroup className="list-group-flush account-settings-links">
                                        <ListGroup.Item
                                            as="a"
                                            className="list-group-item-action active"
                                            data-toggle="list"
                                            href="#account-general"
                                            onClick={resetAlerts}
                                        >
                                            General
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="a"
                                            className=" list-group-item-action"
                                            data-toggle="list"
                                            href="#account-change-password"
                                            onClick={resetAlerts}
                                        >
                                            Change password
                                        </ListGroup.Item>
                                        <ListGroup.Item
                                            as="a"
                                            className="list-group-item-action"
                                            data-toggle="list"
                                            href="/profile"
                                        />
                                            
                                        
                                    </ListGroup>
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
                                                    <Form.Row>
                                                        <Col sm>
                                                            <FormInput
                                                                label="Phone"
                                                                type="phone"
                                                                name="phone"
                                                                onChange={onChange}
                                                                value={formFields.phone}
                                                            />
                                                        </Col>
                                                        <Col sm>
                                                            <FormInputOverlay
                                                                label="Age"
                                                                type="age"
                                                                name="age"
                                                                onChange={onChange}
                                                                value={formFields.age}
                                                                isInvalid={errors && errors.age ? true : false}
                                                                placement={'right'}
                                                                toolTip={errors && errors.age}
                                                            />
                                                        </Col>
                                                    </Form.Row>
                                                    {isEditedSuccess === true ? (
                                                        <Alert variant="success" style={{ marginTop: '1rem' }}>
                                                            Your Profile was successfully updated!
                                                        </Alert>
                                                    ) : null}
                                                    {isEditedSuccess === false ? (
                                                        <Alert variant="danger" style={{ marginTop: '1rem' }}>
                                                            Error 504: Failed to proxy, please try again
                                                        </Alert>
                                                    ) : null}
                                                    <Button fluid="true" onClick={onSubmit} block>
                                                        {loading ? (
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            'Update Profile'
                                                        )}
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
                                                {isEditedSuccess === true ? (
                                                    <Alert variant="success" style={{ marginTop: '1rem' }}>
                                                        Your Profile was successfully updated!
                                                    </Alert>
                                                ) : null}
                                                {isEditedSuccess === false ? (
                                                    <Alert variant="danger" style={{ marginTop: '1rem' }}>
                                                        Error 504: Failed to proxy, please try again
                                                    </Alert>
                                                ) : null}
                                                <Button fluid="true" onClick={resetPassword} block>
                                                    {loading ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />
                                                    ) : (
                                                        'Reset Password'
                                                    )}
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
    editedProfileSuccess: PropTypes.func.isRequired,
    resetUserPassword: PropTypes.func.isRequired,
    setErrors: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isEditedSuccess: state.auth.editedSuccess,
    loading: state.auth.profileLoading,
    user: state.auth.user,
    errors: state.errors,
});

export default connect(mapStateToProps, {
    editedProfileSuccess,
    resetUserPassword,
    setErrors,
    updateUser,
})(EditProfile);
