import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ListingCard from './ListingCard';

const ListingGrid = ({
  listings,
  savedListings,
  onSaveListing,
  isAuthenticated,
  comparedIds = [],
  onToggleCompare,
  filters,
}) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {listings.map((listing) => {
        const isSaved = savedListings.some((item) => item.id === listing.id);
        return (
          <Col key={listing.id}>
            <ListingCard
              listing={listing}
              onSave={onSaveListing}
              isSaved={isSaved}
              isAuthenticated={isAuthenticated}
              isCompared={comparedIds.includes(listing.id)}
              onToggleCompare={onToggleCompare}
              filters={filters}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default ListingGrid;
