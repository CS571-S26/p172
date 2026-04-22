import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing, onSave, isSaved }) => {
  return (
    <Card className="h-100 premium-card">
      <div className="premium-image-container" style={{ height: '200px' }}>
        <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
          <Badge className="premium-badge shadow-sm">{listing.bedrooms} Bed</Badge>
        </div>
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Link to={`/listings/${listing.id}`} className="text-decoration-none">
            <Card.Title className="fw-bold mb-0 text-dark fs-4 listing-title-hover">{listing.title}</Card.Title>
          </Link>
          <h5 className="mb-0 fw-bold ms-3" style={{ color: '#6366f1' }}>${listing.price}<span className="text-muted fw-normal" style={{ fontSize: '0.8rem' }}>/mo</span></h5>
        </div>
        <Card.Text className="text-secondary mb-3">
          📍 {listing.location}
        </Card.Text>
        <div className="mb-4">
          {listing.amenities.map((amenity, index) => (
            <Badge bg="light" text="dark" className="me-2 mb-2 p-2 border border-2 rounded-pill fw-medium text-secondary" key={index}>
              {amenity}
            </Badge>
          ))}
        </div>
        <div className="mt-auto d-flex gap-2">
          <Link to={`/listings/${listing.id}`} className="w-50 text-decoration-none">
            <Button variant="light" className="w-100 fw-bold rounded-pill text-primary" style={{ border: '2px solid #e2e8f0', height: '100%' }}>
              Details
            </Button>
          </Link>
          <Button
            variant={isSaved ? "outline-secondary" : "primary"}
            className={`w-50 ${isSaved ? "rounded-pill fw-bold" : "btn-premium"}`}
            onClick={() => onSave(listing)}
            disabled={isSaved}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
