import { connect } from 'react-redux';

import React, { useEffect } from 'react';
import { setErrors } from '../../actions/errors';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import ButtonModal from '../modals/ButtonModal';
import Row from 'react-bootstrap/Row';
import UserProfileMedia from '../media/UserProfileMedia';

import './Profile.css';

const Profile = ({ user, setErrors }) => {
    useEffect(() => {
        return () => {
            setErrors(null);
        };
    }, []);

    const { name, company, picture, ...rest } = user;

    return (
        <Container className="profile-container">
            <Row className="align-items-center justify-content-center">
                <Col md={6}>
                    <Card className="profile-card shadow-lg">
                        <Card.Body>
                            <div className="profile">
                                <div className="profile-top">
                                    <Row className="justify-content-center">
                                        <div className="profile-avatar text-center">
                                            <img
                                                src={picture}
                                                alt="user-profile"
                                                className="rounded-circle img-fluid"
                                                width="75%"
                                            />
                                        </div>
                                    </Row>
                                </div>
                            </div>

                            <div className="profile-middle text-center">
                                <Row>
                                    <Col sm={12}>
                                        <div className="profile-title">
                                            <h5 className="my-1 text-black">
                                                {name ? `${name.first} ${name.last}` : null}
                                            </h5>
                                        </div>

                                        <div className="profile-subtitle">
                                            <div className="text-muted subtitle">{company}</div>
                                        </div>
                                        <Row className="justify-content-center profile-btn-row">
                                            <Col sm={5}>
                                                <ButtonModal
                                                    block
                                                    buttonClassName="btn-primary profile-btn"
                                                    buttonText="Balance"
                                                    modalTitle={`Balance: ${user.balance}`}
                                                />
                                            </Col>
                                            <Col sm={5}>
                                                <Button
                                                    as={Link}
                                                    to="/profile/edit"
                                                    className="btn-secondary profile-btn"
                                                    block
                                                >
                                                    Edit Profile
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className="profile-middle">
                                <Row className="justify-content-center">
                                    <Col sm={10}>{user !== null ? <UserProfileMedia user={rest} /> : null}</Col>
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

export default connect(mapStateToProps, { setErrors })(Profile);
