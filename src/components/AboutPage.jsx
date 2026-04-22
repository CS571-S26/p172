import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ContactForm from './ContactForm';

const AboutPage = () => {
    return (
        <Container className="py-5">
            <h1 className="mb-4">About BadgerLease</h1>
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
                <Col md={12}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <h3 className="mb-3">Contact Us</h3>
                            <p className="text-muted mb-4">Have questions or feedback? We'd love to hear from you!</p>
                            <ContactForm />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;
