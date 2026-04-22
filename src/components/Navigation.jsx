import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ savedCount }) => {
    const location = useLocation();

    return (
        <Navbar expand="lg" className="glass-nav py-3" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bolder fs-4" style={{ letterSpacing: '-0.5px' }}>
                    <span className="text-gradient-danger">Badger</span><span className="text-gradient-primary">Lease</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`fw-semibold mx-2 ${location.pathname === '/' ? 'text-primary' : 'text-dark'}`}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/saved"
                            className={`fw-semibold mx-2 d-flex align-items-center ${location.pathname === '/saved' ? 'text-primary' : 'text-dark'}`}
                        >
                            Saved
                            {savedCount > 0 && (
                                <Badge bg="danger" pill className="ms-2 align-self-center mt-1">
                                    {savedCount}
                                </Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className={`fw-semibold mx-2 ${location.pathname === '/about' ? 'text-primary' : 'text-dark'}`}
                        >
                            About
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
