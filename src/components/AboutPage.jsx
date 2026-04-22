import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ContactForm from './ContactForm';

const AboutPage = () => {
    return (
        <Container className="py-5">
            <h1 className="mb-4 fw-bolder" style={{ fontSize: '3rem' }}>
                About <span className="text-gradient-primary">BadgerLease</span>
            </h1>
            <Row className="mb-5">
                <Col md={8}>
                    <p className="lead">
                        BadgerLease is the premier subleasing marketplace designed exclusively for UW-Madison students.
                    </p>
                    <p>
                        Our platform makes it easy to find a place to live during a semester abroad or to list your apartment while you're away.
                        By focusing on the campus community, we provide a safe and reliable environment for students to connect and find housing.
                    </p>
                </Col>
            </Row>

            <Row className="mb-5">
                <Col md={12} lg={10} className="mx-auto">
                    <Card className="glass-panel" style={{ borderRadius: '24px' }}>
                        <Card.Body className="p-4 p-md-5">
                            <h3 className="mb-3 fw-bold text-dark">Get in Touch 👋</h3>
                            <p className="fs-5 mb-4" style={{ color: '#475569' }}>Have questions or feedback? We'd love to hear from you!</p>
                            <ContactForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;
