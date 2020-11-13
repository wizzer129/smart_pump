import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import './Profile.css';

const Profile = ({ user }) => {
    return (
        <Container className="profile-container">
            <Row className="align-items-center justify-content-center">
                <Col md={6}>
                    <Card className="profile-card shadow-lg">
                        <Card.Body>
                            <div className="profile">
                                <div className="profile-top">
                                    <Row className="justify-content-center">
                                        <Col sm={6}>
                                            <div className="profile-avatar text-center">
                                                <img
                                                    src="http://placehold.it/150x150"
                                                    alt="user-profile"
                                                    className="rounded-circle img-fluid"
                                                    width="150"
                                                    height="150"
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>

                            <div className="profile-middle text-center">
                                <Row>
                                    <Col sm={12}>
                                        <div className="profile-title">
                                            <h5 className="my-1 text-black">{`${user.name.first} ${user.name.last}`}</h5>
                                        </div>

                                        <div className="profile-subtitle">
                                            <div className="text-muted subtitle">{user.email}</div>
                                            <div className="text-muted subtitle">{user.company}</div>
                                        </div>
                                        <Row className="justify-content-center profile-btn-row">
                                            <Col sm={4}>
                                                <Button className="btn-secondary" block>
                                                    Balance
                                                </Button>
                                            </Col>
                                            <Col sm={4}>
                                                <Button className="btn-secondary" block>
                                                    Edit
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center">
                                            <Col>
                                                <div className="profile-desc">
                                                    <p className="text-muted">
                                                        Lifestyle coach and photographer <br />
                                                        delivering best images only...
                                                    </p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(Profile);
