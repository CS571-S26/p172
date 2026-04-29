import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AmenityBadges from './AmenityBadges';
import { calculateMatchScore, getMatchTone } from '../utils/matchScore';

const ListingCard = ({
  listing,
  onSave,
  isSaved,
  isAuthenticated,
  isCompared = false,
  onToggleCompare,
  filters,
}) => {
  const displayImage = listing.images && listing.images.length > 0 ? listing.images[0] : 'https://picsum.photos/800/600';
  const matchScore = calculateMatchScore(listing, filters || {});

  return (
    <Card className="h-100 premium-card">
      <div className="premium-image-container position-relative" style={{ height: '220px', backgroundColor: '#e2e8f0' }}>
        <img
          src={displayImage}
          alt={`${listing.title} cover`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', bottom: '12px', right: '12px' }}>
          <Badge className="premium-badge shadow-sm px-3 py-2 fs-6">{listing.bedrooms} Bed</Badge>
        </div>
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <Badge bg={getMatchTone(matchScore)} className="shadow-sm px-2 py-2">
            Match {matchScore}%
          </Badge>
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
          <div className="mb-1">📍 {listing.location}</div>
          <div className="fw-semibold" style={{ fontSize: '0.9rem' }}>📅 {listing.startDate ? new Date(listing.startDate).toLocaleDateString() : 'TBD'} - {listing.endDate ? new Date(listing.endDate).toLocaleDateString() : 'TBD'}</div>
        </Card.Text>
        <div className="mb-4">
          <AmenityBadges amenities={listing.amenities} />
        </div>
        <div className="mt-auto d-flex gap-2">
          <Link to={`/listings/${listing.id}`} className="w-50 text-decoration-none">
            <Button variant="light" className="w-100 fw-bold rounded-pill text-primary" style={{ border: '2px solid #e2e8f0', height: '100%' }}>
              Details
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button
              variant={isSaved ? "outline-secondary" : "primary"}
              className={`w-50 ${isSaved ? "rounded-pill fw-bold" : "btn-premium"}`}
              onClick={() => onSave(listing)}
              disabled={isSaved}
            >
              {isSaved ? "Saved" : "Save"}
            </Button>
          ) : (
            <Link to="/login" className="w-50 text-decoration-none">
              <Button variant="outline-primary" className="w-100 rounded-pill fw-semibold">
                Login to Save
              </Button>
            </Link>
          )}
        </div>
        <Button
          variant={isCompared ? 'dark' : 'outline-dark'}
          className="mt-2 w-100 rounded-pill fw-semibold"
          onClick={() => onToggleCompare?.(listing.id)}
        >
          {isCompared ? 'Remove from Compare' : 'Add to Compare'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ListingCard;
