import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './LoadingProfile.css';
const LoadingProfile = () => {
    return (
        <Container style={{ height: '100vh' }}>
            <Row className="align-items-center">
                <Col>
                    <div className="loadingProfile"></div>
                    <h3>Loading Your Profile...</h3>
                </Col>
            </Row>
        </Container>
    );
};

export default LoadingProfile;
