import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';
import logo from '../../img/logo2.png';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="md" bg="light">
            <div className="navbar-header">
                <Navbar.Brand href="/profile">
                    <img src={logo} width="130" height="60" />
                </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link eventKey={2} href="/profile/edit">
                        Edit Profile
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
