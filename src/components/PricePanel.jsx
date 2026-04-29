import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PricePanel = ({ listing, isSaved, onSaveListing, isAuthenticated }) => {
  return (
    <Card className="border-0 shadow-sm rounded-4 bg-light p-4 h-100">
      <h2 className="h5 text-secondary fw-semibold">Monthly Rent</h2>
      <p className="mb-4 fw-bolder" style={{ color: '#4338ca', fontSize: '3rem' }}>
        ${listing.price}
        <span className="text-muted fw-normal" style={{ fontSize: '1.2rem' }}>
          /mo
        </span>
      </p>

      <div className="mt-auto d-flex flex-column gap-3">
        {isAuthenticated ? (
          <Button
            variant={isSaved ? 'outline-secondary' : 'primary'}
            className={`w-100 py-3 fs-5 ${isSaved ? 'rounded-pill fw-bold' : 'btn-premium'}`}
            onClick={() => onSaveListing(listing)}
            disabled={isSaved}
          >
            {isSaved ? 'Saved to Favorites' : 'Save to Favorites'}
          </Button>
        ) : (
          <Link to="/login" className="text-decoration-none">
            <Button variant="outline-primary" className="w-100 py-3 fs-5 rounded-pill fw-bold">
              Login to Save Favorites
            </Button>
          </Link>
        )}
        <a
          href={`mailto:${listing.contactEmail}?subject=${encodeURIComponent(`Inquiry about ${listing.title}`)}`}
          className="text-decoration-none"
        >
          <Button
            as="span"
            variant="dark"
            className="w-100 rounded-pill py-3 fw-bold fs-5 shadow-sm"
          >
            Email Owner
          </Button>
        </a>
      </div>
    </Card>
  );
};

export default PricePanel;
