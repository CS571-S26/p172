import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

const ListingCard = ({ listing, onSave, isSaved }) => {
  return (
    <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ height: '180px', backgroundColor: '#e9ecef', position: 'relative' }}>
          <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
              <Badge bg="primary" className="fw-semibold px-3 py-2">{listing.bedrooms} Bed</Badge>
          </div>
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="fw-bold mb-0 text-dark fs-5">{listing.title}</Card.Title>
            <h5 className="text-success mb-0 fw-bold ms-2">${listing.price}<span className="text-muted fw-normal" style={{fontSize: '0.8rem'}}>/mo</span></h5>
        </div>
        <Card.Text className="text-secondary mb-3">
            📍 {listing.location}
        </Card.Text>
        <div className="mb-4">
          {listing.amenities.map((amenity, index) => (
            <Badge bg="light" text="dark" className="me-2 mb-2 p-2 border" key={index}>
              {amenity}
            </Badge>
          ))}
        </div>
        <div className="mt-auto">
            <Button 
                variant={isSaved ? "outline-secondary" : "primary"} 
                className="w-100 fw-bold py-2 shadow-sm rounded-pill" 
                onClick={() => onSave(listing)}
                disabled={isSaved}
            >
                {isSaved ? "✓ Saved to Favorites" : "Save Listing"}
            </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
