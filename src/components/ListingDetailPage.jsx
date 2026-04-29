import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Toast, ToastContainer } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import AmenityBadges from './AmenityBadges';
import ImageCarousel from './ImageCarousel';
import PricePanel from './PricePanel';
import ListingChatPanel from './ListingChatPanel';

const ListingDetailPage = ({
    listings,
    savedListings,
    onSaveListing,
    isAuthenticated,
    onViewed,
    inquiries,
    onCreateInquiry,
}) => {
    const { id } = useParams();
    const listing = listings.find((item) => item.id.toString() === id);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (!listing) return;
        onViewed?.(listing.id);
    }, [listing, onViewed]);

    if (!listing) {
        return (
            <Container className="py-5 text-center">
                <h1 className="h2">Listing Not Found</h1>
                <p className="text-muted">The listing you are looking for does not exist.</p>
                <Link to="/">
                    <Button className="btn-premium px-4 mt-3">Back to Home</Button>
                </Link>
            </Container>
        );
    }

    const isSaved = savedListings.some((item) => item.id === listing.id);
    const displayImages = listing.images && listing.images.length > 0
        ? listing.images
        : ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400'];

    return (
        <Container className="py-5">
            <ToastContainer position="bottom-end" className="p-3">
                <Toast bg="dark" show={showToast} autohide delay={1800} onClose={() => setShowToast(false)}>
                    <Toast.Body className="text-white">Listing link copied!</Toast.Body>
                </Toast>
            </ToastContainer>
            <Link to="/" className="text-decoration-none text-muted fw-semibold mb-4 d-inline-block">
                &larr; Back to Listings
            </Link>
            <Card className="glass-panel border-0 mt-3" style={{ borderRadius: '24px', overflow: 'hidden' }}>
                <div className="position-relative bg-dark">
                    <ImageCarousel images={displayImages} title={listing.title} />
                    <div style={{ position: 'absolute', bottom: '25px', right: '25px', zIndex: 10 }}>
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
                                <AmenityBadges amenities={listing.amenities} />
                            </div>

                            <h5 className="fw-bold mt-4 mb-3">Description</h5>
                            <p className="fs-5 text-secondary" style={{ lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                                {listing.description
                                    ? listing.description
                                    : `This beautiful property located in ${listing.location} offers a comfortable and spacious living environment. With ${listing.bedrooms} bedroom${listing.bedrooms > 1 ? 's' : ''} and excellent amenities like ${listing.amenities.join(', ')}, it is perfect for anyone looking to find a great place on the BadgerLease marketplace. Reach out to the owner for more details or to schedule a tour!`
                                }
                            </p>
                            <Button
                                variant="outline-dark"
                                className="rounded-pill fw-semibold mt-2"
                                onClick={async () => {
                                    await navigator.clipboard.writeText(window.location.href);
                                    setShowToast(true);
                                }}
                            >
                                Share Listing
                            </Button>
                            <ListingChatPanel
                                listing={listing}
                                inquiries={inquiries}
                                onCreateInquiry={onCreateInquiry}
                            />
                        </Col>
                        <Col md={4} className="mt-5 mt-md-0 d-flex flex-column">
                            <PricePanel
                                listing={listing}
                                isSaved={isSaved}
                                onSaveListing={onSaveListing}
                                isAuthenticated={isAuthenticated}
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ListingDetailPage;
