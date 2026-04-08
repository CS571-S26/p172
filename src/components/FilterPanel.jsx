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
        <Card className="mb-4 shadow-sm border-0" style={{ borderRadius: '16px', background: 'linear-gradient(to right, #ffffff, #f8f9fa)' }}>
            <Card.Body className="p-4">
                <h5 className="mb-4 fw-bold text-dark">Find Your Perfect Space 🏠</h5>
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
                                    className="bg-light border-0 shadow-sm py-2 px-3 rounded-pill"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="bedroomsFilter">
                                <Form.Label className="text-secondary fw-semibold">Bedrooms</Form.Label>
                                <Form.Select
                                    value={filters.bedrooms}
                                    onChange={handleBedroomsChange}
                                    className="bg-light border-0 shadow-sm py-2 px-3 rounded-pill cursor-pointer"
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
