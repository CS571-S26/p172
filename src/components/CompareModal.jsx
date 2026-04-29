import React from 'react';
import { Modal, Table, Badge } from 'react-bootstrap';

const formatDate = (value) => {
  if (!value) return 'TBD';
  return new Date(value).toLocaleDateString();
};

const CompareModal = ({ show, onHide, listings }) => {
  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Compare Listings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {listings.length === 0 ? (
          <p className="text-secondary mb-0">Select listings first to compare details.</p>
        ) : (
          <Table responsive bordered className="align-middle mb-0">
            <thead>
              <tr>
                <th>Field</th>
                {listings.map((listing) => (
                  <th key={listing.id}>{listing.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="fw-semibold">Price</td>
                {listings.map((listing) => (
                  <td key={`${listing.id}-price`}>${listing.price}/mo</td>
                ))}
              </tr>
              <tr>
                <td className="fw-semibold">Bedrooms</td>
                {listings.map((listing) => (
                  <td key={`${listing.id}-bed`}>{listing.bedrooms}</td>
                ))}
              </tr>
              <tr>
                <td className="fw-semibold">Location</td>
                {listings.map((listing) => (
                  <td key={`${listing.id}-location`}>{listing.location}</td>
                ))}
              </tr>
              <tr>
                <td className="fw-semibold">Availability</td>
                {listings.map((listing) => (
                  <td key={`${listing.id}-date`}>
                    {formatDate(listing.startDate)} - {formatDate(listing.endDate)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="fw-semibold">Amenities</td>
                {listings.map((listing) => (
                  <td key={`${listing.id}-amenity`}>
                    <div className="d-flex flex-wrap gap-1">
                      {listing.amenities.map((amenity) => (
                        <Badge key={`${listing.id}-${amenity}`} bg="light" text="dark">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CompareModal;
