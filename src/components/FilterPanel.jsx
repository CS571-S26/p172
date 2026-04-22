import React from 'react';
import { Card, Form, Row, Col } from 'react-bootstrap';

const FilterPanel = ({ filters, onFilterChange }) => {
    const handlePriceChange = (e) => {
        onFilterChange({ ...filters, maxPrice: e.target.value });
    };

    const handleBedroomsChange = (e) => {
        onFilterChange({ ...filters, bedrooms: e.target.value });
    };

    return (
        <Card className="mb-5 glass-panel" style={{ borderRadius: '24px' }}>
            <Card.Body className="p-4 p-md-5">
                <h4 className="mb-4 fw-bold text-dark d-flex align-items-center">
                    <span className="me-2 text-gradient-primary">🔍</span> Find Your Perfect Space
                </h4>
                <Form>
                    <Row className="g-4">
                        <Col md={6}>
                            <Form.Group controlId="maxPriceFilter">
                                <Form.Label className="text-secondary fw-semibold">Max Rent Price ($)</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="e.g. 1000"
                                    value={filters.maxPrice}
                                    onChange={handlePriceChange}
                                    min="0"
                                    step="50"
                                    className="premium-input"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="bedroomsFilter">
                                <Form.Label className="text-secondary fw-semibold">Bedrooms</Form.Label>
                                <Form.Select
                                    value={filters.bedrooms}
                                    onChange={handleBedroomsChange}
                                    className="premium-input cursor-pointer"
                                >
                                    <option value="All">All Sizes</option>
                                    <option value="1">1 Bedroom</option>
                                    <option value="2">2 Bedrooms</option>
                                    <option value="3+">3+ Bedrooms</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterPanel;
