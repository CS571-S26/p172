import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // Reset after 3 seconds
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <Form onSubmit={handleSubmit}>
            {submitted && (
                <Alert variant="success" className="mb-4">
                    Thank you for reaching out! We will get back to you shortly.
                </Alert>
            )}
            <Form.Group className="mb-3" controlId="contactName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@wisc.edu" required />
            </Form.Group>

            <Form.Group className="mb-4" controlId="contactMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message..." required />
            </Form.Group>

            <Button variant="primary" type="submit" className="px-4">
                Send Message
            </Button>
        </Form>
    );
};

export default ContactForm;
