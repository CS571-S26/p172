import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-white border-top py-4 mt-auto">
            <Container className="text-center text-muted">
                <p className="mb-0 fw-semibold">
                    &copy; {new Date().getFullYear()} BadgerLease. CS571 Web Project.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
