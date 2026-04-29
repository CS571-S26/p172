import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreateListingPage = ({ onAddListing }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        bedrooms: '',
        location: '',
        amenities: '',
        description: '',
        startDate: '',
        endDate: '',
        contactEmail: '',
        images: [], // Array of base64 strings or Object URLs
        petFriendly: false,
        smokingAllowed: false,
        studyFriendly: false,
    });
    const [error, setError] = useState('');
    const errorId = 'create-listing-error';

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            setError('You can only upload up to 5 pictures.');
            return;
        }
        setError('');

        const imageUrls = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({ ...prev, images: imageUrls }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price || !formData.bedrooms || !formData.location || !formData.startDate || !formData.contactEmail) {
            setError('Please fill in all required fields.');
            return;
        }

        const newListing = {
            id: Date.now(), // Generate a unique ID
            title: formData.title,
            price: parseFloat(formData.price),
            bedrooms: parseInt(formData.bedrooms),
            location: formData.location,
            amenities: formData.amenities.split(',').map(item => item.trim()).filter(item => item !== ''),
            description: formData.description,
            startDate: formData.startDate,
            endDate: formData.endDate,
            contactEmail: formData.contactEmail,
            images: formData.images.length > 0
                ? formData.images
                : ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            roommatePrefs: {
                petFriendly: formData.petFriendly,
                smokingAllowed: formData.smokingAllowed,
                studyFriendly: formData.studyFriendly,
            },
            postedByEmail: currentUser?.email || 'guest@badgerlease.local',
            postedByName: currentUser?.name || 'Guest',
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
                            {error && <Alert id={errorId} variant="danger" role="alert" aria-live="polite">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="listingTitle">
                                    <Form.Label className="fw-semibold">Listing Title *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Spacious Room near State St"
                                        className="premium-input"
                                        required
                                        aria-describedby={error ? errorId : undefined}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="monthlyRent">
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
                                                aria-describedby={error ? errorId : undefined}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="bedrooms">
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
                                                aria-describedby={error ? errorId : undefined}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4" controlId="location">
                                    <Form.Label className="fw-semibold">Location *</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Downtown Madison"
                                        className="premium-input"
                                        required
                                        aria-describedby={error ? errorId : undefined}
                                    />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="moveInDate">
                                            <Form.Label className="fw-semibold">Move In Date *</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="startDate"
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                className="premium-input"
                                                required
                                                aria-describedby={error ? errorId : undefined}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-4" controlId="moveOutDate">
                                            <Form.Label className="fw-semibold">Move Out Date</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="endDate"
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                className="premium-input"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-4" controlId="contactEmail">
                                    <Form.Label className="fw-semibold">Contact Email *</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="contactEmail"
                                        value={formData.contactEmail}
                                        onChange={handleChange}
                                        placeholder="owner@wisc.edu"
                                        className="premium-input"
                                        required
                                        aria-describedby={error ? errorId : undefined}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="photos">
                                    <Form.Label className="fw-semibold">Upload Photos (Up to 5)</Form.Label>
                                    <Form.Control
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="premium-input bg-white"
                                    />
                                    {formData.images.length > 0 && (
                                        <div className="d-flex gap-2 mt-3 overflow-auto pb-2">
                                            {formData.images.map((src, idx) => (
                                                <img key={idx} src={src} alt={`Upload preview ${idx + 1}`} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px' }} className="shadow-sm border border-secondary" />
                                            ))}
                                        </div>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="amenities">
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

                                <Form.Group className="mb-4" controlId="roommatePrefs">
                                    <Form.Label className="fw-semibold">Roommate Preferences</Form.Label>
                                    <div className="d-flex flex-wrap gap-3 mt-1">
                                        <Form.Check
                                            type="checkbox"
                                            id="petFriendly"
                                            name="petFriendly"
                                            label="Pet friendly"
                                            checked={formData.petFriendly}
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="smokingAllowed"
                                            name="smokingAllowed"
                                            label="Smoking allowed"
                                            checked={formData.smokingAllowed}
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            id="studyFriendly"
                                            name="studyFriendly"
                                            label="Study-friendly / quiet"
                                            checked={formData.studyFriendly}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="description">
                                    <Form.Label className="fw-semibold">Detailed Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Write a charming description about your property..."
                                        className="premium-input"
                                        required
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
