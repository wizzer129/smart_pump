import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Navbar.css';
import logo from '../../img/logo2.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const getPathname = () => {
    return new useLocation().pathname;
};

const NavLink = ({ path, title }) => {
    return (
        <Nav.Link as={Link} to={path} active={getPathname() === path}>
            {title}
        </Nav.Link>
    );
};

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
                    <NavLink path={'/profile'} title="Profile" />
                    <NavLink path={'/profile/edit'} title="Edit Profile" />
                    <NavLink path={'/logout'} title="Logout" />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Navigation;
