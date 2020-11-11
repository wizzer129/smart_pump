import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const LoadingProfile = () => {
    return (
        <Container style={{ height: '100vh' }}>
            <Col>
                <div className="loadingProfile"></div>
                <h3>Loading Your Profile...</h3>
            </Col>
        </Container>
    );
};

export default LoadingProfile;
