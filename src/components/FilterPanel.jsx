import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const FilterPanel = ({ filters, onFilterChange, onReset }) => {
    const handlePriceChange = (e) => {
        onFilterChange({ ...filters, maxPrice: e.target.value });
    };

  const handleQueryChange = (e) => {
    onFilterChange({ ...filters, query: e.target.value });
  };

    const handleBedroomsChange = (e) => {
        onFilterChange({ ...filters, bedrooms: e.target.value });
    };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sortBy: e.target.value });
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
                            <Form.Group controlId="searchFilter">
                                <Form.Label className="text-secondary fw-semibold">Search by title or location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g. Downtown, furnished, studio"
                                    value={filters.query}
                                    onChange={handleQueryChange}
                                    className="premium-input"
                                />
                            </Form.Group>
                        </Col>
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
                        <Col md={6}>
                            <Form.Group controlId="sortByFilter">
                                <Form.Label className="text-secondary fw-semibold">Sort listings</Form.Label>
                                <Form.Select
                                    value={filters.sortBy}
                                    onChange={handleSortChange}
                                    className="premium-input"
                                >
                                    <option value="recommended">Recommended</option>
                                    <option value="price_low_high">Price: Low to High</option>
                                    <option value="price_high_low">Price: High to Low</option>
                                    <option value="bedrooms_high_low">Bedrooms: High to Low</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={12}>
                            <Form.Label className="text-secondary fw-semibold">Roommate-friendly preferences</Form.Label>
                            <div className="d-flex flex-wrap gap-3 mt-1">
                                <Form.Check
                                    id="petFriendlyOnly"
                                    type="checkbox"
                                    label="Pet friendly"
                                    checked={filters.petFriendlyOnly}
                                    onChange={(e) => onFilterChange({ ...filters, petFriendlyOnly: e.target.checked })}
                                />
                                <Form.Check
                                    id="noSmokingOnly"
                                    type="checkbox"
                                    label="No smoking"
                                    checked={filters.noSmokingOnly}
                                    onChange={(e) => onFilterChange({ ...filters, noSmokingOnly: e.target.checked })}
                                />
                                <Form.Check
                                    id="studyFriendlyOnly"
                                    type="checkbox"
                                    label="Study-friendly / quiet"
                                    checked={filters.studyFriendlyOnly}
                                    onChange={(e) => onFilterChange({ ...filters, studyFriendlyOnly: e.target.checked })}
                                />
                            </div>
                        </Col>
                        <Col md={6} className="d-flex align-items-end">
                            <Button
                                type="button"
                                variant="outline-secondary"
                                className="w-100 fw-semibold rounded-pill py-2"
                                onClick={onReset}
                            >
                                Reset Filters
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterPanel;
