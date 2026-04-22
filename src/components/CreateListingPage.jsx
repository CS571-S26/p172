import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CreateListingPage = ({ onAddListing }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        bedrooms: '',
        location: '',
        amenities: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.bedrooms || !formData.location) {
            setError('Please fill in all required fields.');
            return;
        }

        const newListing = {
            id: Date.now(), // Generate a unique ID
            title: formData.title,
            price: parseFloat(formData.price),
            bedrooms: parseInt(formData.bedrooms),
            location: formData.location,
            amenities: formData.amenities.split(',').map(item => item.trim()).filter(item => item !== '')
        };

        onAddListing(newListing);
        navigate('/'); // Redirect back to home page after posting
    };

    return (
        <Container className="py-5">
            <h1 className="mb-4 fw-bolder text-center" style={{ fontSize: '3rem' }}>
                <span className="text-gradient-primary">Post</span> a Listing
            </h1>

            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Card className="glass-panel" style={{ borderRadius: '24px' }}>
                        <Card.Body className="p-4 p-md-5">
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Listing Title *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Spacious Room near State St"
                                        className="premium-input"
                                        required
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-semibold">Monthly Rent ($) *</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                placeholder="e.g. 850"
                                                className="premium-input"
                                                min="0"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-semibold">Bedrooms *</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="bedrooms"
                                                value={formData.bedrooms}
                                                onChange={handleChange}
                                                placeholder="e.g. 2"
                                                className="premium-input"
                                                min="1"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Location *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Downtown Madison"
                                        className="premium-input"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-5">
                                    <Form.Label className="fw-semibold">Amenities (Comma separated)</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="amenities"
                                        value={formData.amenities}
                                        onChange={handleChange}
                                        placeholder="e.g. In-unit Laundry, Furnished, Gym"
                                        className="premium-input"
                                    />
                                </Form.Group>

                                <Button type="submit" className="btn-premium px-5 py-3 w-100 fs-5 mt-2">
                                    Post Listing
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateListingPage;
