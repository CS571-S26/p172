import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const ListingDetailPage = ({ listings, savedListings, onSaveListing }) => {
    const { id } = useParams();
    const listing = listings.find((item) => item.id.toString() === id);

    if (!listing) {
        return (
            <Container className="py-5 text-center">
                <h2>Listing Not Found</h2>
                <p className="text-muted">The listing you are looking for does not exist.</p>
                <Link to="/">
                    <Button className="btn-premium px-4 mt-3">Back to Home</Button>
                </Link>
            </Container>
        );
    }

    const isSaved = savedListings.some((item) => item.id === listing.id);

    return (
        <Container className="py-5">
            <Link to="/" className="text-decoration-none text-muted fw-semibold mb-4 d-inline-block">
                &larr; Back to Listings
            </Link>
            <Card className="glass-panel border-0 mt-3" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <div style={{ height: '350px', background: listing.imageUrl ? `url(${listing.imageUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' }} className="position-relative">
                    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                        <Badge className="premium-badge fs-5 px-4 py-2 shadow">{listing.bedrooms} Bedroom{listing.bedrooms > 1 ? 's' : ''}</Badge>
                    </div>
                </div>
                <Card.Body className="p-4 p-md-5">
                    <Row>
                        <Col md={8}>
                            <h1 className="fw-bold text-dark mb-3" style={{ letterSpacing: '-1px' }}>{listing.title}</h1>
                            <h4 className="text-muted mb-3">📍 {listing.location}</h4>
                            <h5 className="text-primary mb-4 fw-bold">
                                📅 Available: {listing.startDate ? new Date(listing.startDate).toLocaleDateString() : 'TBD'} - {listing.endDate ? new Date(listing.endDate).toLocaleDateString() : 'Flexible'}
                            </h5>

                            <h5 className="fw-bold mt-5 mb-3">Amenities</h5>
                            <div className="d-flex flex-wrap mb-4">
                                {listing.amenities.map((amenity, index) => (
                                    <Badge bg="light" text="dark" className="me-2 mb-2 p-3 border border-2 rounded-pill fw-medium fs-6 text-secondary" key={index}>
                                        {amenity}
                                    </Badge>
                                ))}
                            </div>

                            <h5 className="fw-bold mt-4 mb-3">Description</h5>
                            <p className="fs-5 text-secondary" style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                {listing.description
                                    ? listing.description
                                    : `This beautiful property located in ${listing.location} offers a comfortable and spacious living environment. With ${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''} and excellent amenities like ${listing.amenities.join(', ')}, it is perfect for anyone looking to find a great place on the BadgerLease marketplace. Reach out to the owner for more details or to schedule a tour!`
                                }
                            </p>
                        </Col>
                        {/* Price and Action Section */}
                        <Col md={4} className="mt-5 mt-md-0 d-flex flex-column">
                            <Card className="border-0 shadow-sm rounded-4 bg-light p-4 h-100">
                                <h5 className="text-secondary fw-semibold">Monthly Rent</h5>
                                <h2 className="mb-4 fw-bolder" style={{ color: '#6366f1', fontSize: '3rem' }}>
                                    ${listing.price}
                                    <span className="text-muted fw-normal" style={{ fontSize: '1.2rem' }}>/mo</span>
                                </h2>

                                <div className="mt-auto d-flex flex-column gap-3">
                                    <Button
                                        variant={isSaved ? "outline-secondary" : "primary"}
                                        className={`w-100 py-3 fs-5 ${isSaved ? "rounded-pill fw-bold" : "btn-premium"}`}
                                        onClick={() => onSaveListing(listing)}
                                        disabled={isSaved}
                                    >
                                        {isSaved ? "✓ Saved to Favorites" : "Save to Favorites ❤️"}
                                    </Button>
                                    <Button
                                        variant="dark"
                                        className="w-100 rounded-pill py-3 fw-bold fs-5 shadow-sm"
                                        onClick={() => window.location.href = `mailto:${listing.contactEmail}?subject=Inquiry about ${listing.title}`}
                                    >
                                        Contact Owner ✉️
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ListingDetailPage;
