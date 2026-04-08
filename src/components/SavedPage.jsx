import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SavedPage = ({ savedListings, onRemoveListing }) => {
    return (
        <div className="pt-5 pb-5">
            <Container>
                <div className="mb-4 text-center">
                    <h2 className="fw-bold text-dark mb-2">My Saved Favorites ❤️</h2>
                    <p className="text-secondary fs-5">Keep track of your top apartment selections.</p>
                </div>

                {savedListings.length === 0 ? (
                    <div className="text-center py-5 bg-white rounded-4 shadow-sm mt-4 border">
                        <h4 className="text-muted mb-3">You haven't saved any listings yet.</h4>
                        <p className="text-secondary mb-4">Go back to the home page to start browsing.</p>
                        <Link to="/">
                            <Button variant="primary" className="fw-bold py-2 px-4 shadow-sm rounded-pill">
                                Return Home
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {savedListings.map((listing) => (
                            <Col key={listing.id}>
                                <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                    <div style={{ height: '160px', backgroundColor: '#e9ecef', position: 'relative' }}>
                                        <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
                                            <Badge bg="primary" className="fw-semibold px-3 py-2">{listing.bedrooms} Bed</Badge>
                                        </div>
                                    </div>
                                    <Card.Body className="d-flex flex-column p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <Card.Title className="fw-bold mb-0 text-dark fs-5">{listing.title}</Card.Title>
                                            <h5 className="text-success mb-0 fw-bold ms-2">${listing.price}</h5>
                                        </div>
                                        <Card.Text className="text-secondary mb-3">
                                            📍 {listing.location}
                                        </Card.Text>
                                        <div className="mt-auto">
                                            <Button
                                                variant="outline-danger"
                                                className="w-100 fw-bold py-2 shadow-sm rounded-pill"
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
