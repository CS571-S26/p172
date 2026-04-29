import React from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = ({ savedCount, listings }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, currentUser, logout } = useAuth();

    const handleRandomPick = () => {
        if (!listings?.length) return;
        const random = listings[Math.floor(Math.random() * listings.length)];
        navigate(`/listings/${random.id}`);
    };

    return (
        <Navbar expand="lg" className="glass-nav py-2" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bolder fs-5 nav-brand-mark">
                    <span className="nav-brand-dot" />
                    <span className="text-gradient-danger">Badger</span><span className="text-gradient-primary">Lease</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center nav-pill-wrap px-2 py-1">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`fw-semibold mx-1 px-3 nav-chip ${location.pathname === '/' ? 'text-primary nav-chip-active' : 'text-dark'}`}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/mypage"
                            className={`fw-semibold mx-1 px-3 d-flex align-items-center nav-chip ${location.pathname === '/mypage' ? 'text-primary nav-chip-active' : 'text-dark'}`}
                        >
                            My Page
                            {savedCount > 0 && (
                                <Badge bg="danger" pill className="ms-2 align-self-center">
                                    {savedCount}
                                </Badge>
                            )}
                        </Nav.Link>
                        <Button
                            variant="light"
                            className="ms-1 me-2 rounded-pill fw-semibold nav-random-btn"
                            onClick={handleRandomPick}
                        >
                            Random Pick
                        </Button>
                        {isAuthenticated ? (
                            <>
                                <span className="mx-2 text-secondary fw-semibold d-none d-lg-inline" aria-label="Signed in user">
                                    {currentUser.name}
                                </span>
                                <Button
                                    variant="outline-secondary"
                                    className="rounded-pill fw-semibold"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className={`fw-semibold mx-1 px-3 nav-chip ${location.pathname === '/login' ? 'text-primary nav-chip-active' : 'text-dark'}`}
                            >
                                Login
                            </Nav.Link>
                        )}
                        <Link to="/create" className="text-decoration-none ms-lg-2 mt-3 mt-lg-0">
                            <span className="btn-premium px-4 py-2 d-inline-block">
                                Post Listing
                            </span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
