import React from 'react';
import PropTypes from 'prop-types';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';

const EditProfile = (props) => {
    return (
        <Container className="profile-container">
            <Row className="align-items-center justify-content-center">
                <Col md={6}>
                    <Card className="profile-card shadow-lg"></Card>
                </Col>
            </Row>
        </Container>
    );
};

EditProfile.propTypes = {};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default EditProfile;
