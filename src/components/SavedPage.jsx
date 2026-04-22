import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SavedPage = ({ savedListings, onRemoveListing }) => {
    return (
        <div className="pt-5 pb-5">
            <Container>
                <div className="mb-5 text-center hero-section py-5">
                    <h2 className="fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
                        <span className="text-gradient-danger">My Saved</span> Favorites ❤️
                    </h2>
                    <p className="fs-5" style={{ color: '#475569', fontWeight: 500 }}>Keep track of your top apartment selections.</p>
                </div>

                {savedListings.length === 0 ? (
                    <div className="text-center py-5 glass-panel rounded-4 mt-4">
                        <h4 className="text-muted mb-3 fw-bold">You haven't saved any listings yet.</h4>
                        <p className="text-secondary mb-4 fs-5">Go back to the home page to start browsing.</p>
                        <Link to="/">
                            <Button className="btn-premium px-5">
                                Return Home
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {savedListings.map((listing) => (
                            <Col key={listing.id}>
                                <Card className="h-100 premium-card">
                                    <div className="premium-image-container" style={{ height: '180px' }}>
                                        <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
                                            <Badge className="premium-badge shadow-sm">{listing.bedrooms} Bed</Badge>
                                        </div>
                                    </div>
                                    <Card.Body className="d-flex flex-column p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <Card.Title className="fw-bold mb-0 text-dark fs-4">{listing.title}</Card.Title>
                                            <h5 className="mb-0 fw-bold ms-3" style={{ color: '#6366f1' }}>${listing.price}</h5>
                                        </div>
                                        <Card.Text className="text-secondary mb-3">
                                            📍 {listing.location}
                                        </Card.Text>
                                        <div className="mt-auto">
                                            <Button
                                                variant="outline-danger"
                                                className="w-100 fw-bold py-2 shadow-sm rounded-pill"
                                                style={{ border: '2px solid #f43f5e', color: '#f43f5e' }}
                                                onClick={() => onRemoveListing(listing.id)}
                                            >
                                                Remove from Saved
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default SavedPage;
