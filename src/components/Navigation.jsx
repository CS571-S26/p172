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
        <Navbar expand="lg" className="glass-nav py-2" sticky="top" as="nav" aria-label="Primary">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bolder fs-5 nav-brand-mark">
                    <span className="nav-brand-dot" />
                    <span className="text-gradient-danger">Badger</span><span className="text-gradient-primary">Lease</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center gap-lg-2 nav-clean-wrap">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`fw-semibold px-3 nav-clean-link ${location.pathname === '/' ? 'nav-clean-link-active' : ''}`}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/mypage"
                            className={`fw-semibold px-3 d-flex align-items-center nav-clean-link ${location.pathname === '/mypage' ? 'nav-clean-link-active' : ''}`}
                        >
                            My Page
                            {savedCount > 0 && (
                                <Badge bg="primary" pill className="ms-2 align-self-center nav-count-badge">
                                    {savedCount}
                                </Badge>
                            )}
                        </Nav.Link>
                        <Button
                            variant="light"
                            className="rounded-pill fw-semibold nav-ghost-btn px-3"
                            onClick={handleRandomPick}
                        >
                            Random Pick
                        </Button>
                        {isAuthenticated ? (
                            <>
                                <span className="mx-1 text-secondary fw-semibold d-none d-lg-inline nav-user-chip" aria-label="Signed in user">
                                    {currentUser.name}
                                </span>
                                <Button
                                    variant="outline-secondary"
                                    className="rounded-pill fw-semibold nav-auth-btn"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link
                                as={Link}
                                to="/login"
                                className={`fw-semibold px-3 nav-clean-link nav-auth-link ${location.pathname === '/login' ? 'nav-clean-link-active' : ''}`}
                            >
                                Login
                            </Nav.Link>
                        )}
                        <Link to="/create" className="text-decoration-none mt-2 mt-lg-0">
                            <span className="btn-premium nav-primary-cta px-4 py-2 d-inline-block">
                                + Post Listing
                            </span>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
