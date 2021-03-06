import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './Navbar.css';
import PropTypes from 'prop-types';
import logo from '../../img/logo2.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { logout } from '../../actions/auth';

const getPathname = () => {
    return new useLocation().pathname;
};

const NavLink = ({ path, title, eventKey }) => {
    return (
        <Nav.Link as={Link} to={path} active={getPathname() === path} eventKey={eventKey}>
            {title}
        </Nav.Link>
    );
};

const Navigation = ({ logout }) => {
    const handleSelect = (eventKey) => (eventKey === 'logout' ? logout() : null);
    return (
        <Navbar collapseOnSelect expand="md" bg="white" className="shadow-lg p-3 rounded" sticky="top">
            <div className="navbar-header">
                <Navbar.Brand href="/profile">
                    <img src={logo} width="80" height="35" />
                </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" onSelect={handleSelect}>
                    <NavLink path={'/profile'} title="Profile" />
                    <NavLink path={'/profile/edit'} title="Edit Profile" />
                    <NavLink path={''} eventKey="logout" onClick={logout} title="Logout" />
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

Navigation.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Navigation);
