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
                <Form.Label className="fw-semibold">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required className="premium-input" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactEmail">
                <Form.Label className="fw-semibold">Email address</Form.Label>
                <Form.Control type="email" placeholder="name@wisc.edu" required className="premium-input" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="contactMessage">
                <Form.Label className="fw-semibold">Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message..." required className="premium-input" />
            </Form.Group>

            <Button type="submit" className="btn-premium px-5 py-3 w-100 fs-5 mt-2">
                Send Message
            </Button>
        </Form>
    );
};

export default ContactForm;
