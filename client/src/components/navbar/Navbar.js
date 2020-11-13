import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';
import logo from '../../img/logo2.png';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="md" bg="white" className="shadow-lg p-3 rounded">
            <div className="navbar-header">
                <Navbar.Brand href="/profile">
                    <img src={logo} width="80" height="35" />
                </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/profile/edit">Edit Profile</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
