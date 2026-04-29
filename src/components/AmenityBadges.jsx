import React from 'react';
import { Badge } from 'react-bootstrap';

const AmenityBadges = ({ amenities }) => {
  return (
    <>
      {amenities.map((amenity) => (
        <Badge
          bg="light"
          text="dark"
          className="me-2 mb-2 p-2 border border-2 rounded-pill fw-medium text-secondary"
          key={amenity}
        >
          {amenity}
        </Badge>
      ))}
    </>
  );
};

export default AmenityBadges;
