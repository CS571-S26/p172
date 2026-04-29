import React from 'react';
import { Badge, Button, Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyPage = ({ myListings, savedListings, onRemoveListing }) => {
  return (
    <Container className="py-5">
      <div className="hero-section py-4 mb-4">
        <h1 className="h2 fw-bold mb-2">My Page</h1>
        <p className="text-secondary mb-0">Manage your postings and favorites in one place.</p>
      </div>

      <Tabs defaultActiveKey="postings" id="mypage-tabs" className="mb-4">
        <Tab eventKey="postings" title={`My Postings (${myListings.length})`}>
          {myListings.length === 0 ? (
            <div className="glass-panel rounded-4 p-4 text-center">
              <p className="mb-3 text-secondary">You have not posted any listings yet.</p>
              <Link to="/create" className="text-decoration-none">
                <Button className="btn-premium px-4">Create First Listing</Button>
              </Link>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {myListings.map((listing) => (
                <Col key={listing.id}>
                  <Card className="premium-card h-100">
                    <div className="premium-image-container" style={{ height: '180px' }}>
                      <img
                        src={listing.images?.[0] || 'https://picsum.photos/seed/mypost/800/600'}
                        alt={`${listing.title} preview`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold">{listing.title}</Card.Title>
                      <p className="text-secondary mb-2">{listing.location}</p>
                      <p className="fw-semibold mb-3">${listing.price}/mo</p>
                      <Link to={`/listings/${listing.id}`} className="text-decoration-none">
                        <Button variant="outline-primary" className="w-100 rounded-pill fw-semibold">
                          View Details
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>

        <Tab eventKey="saved" title={`Saved (${savedListings.length})`}>
          {savedListings.length === 0 ? (
            <div className="glass-panel rounded-4 p-4 text-center">
              <p className="mb-0 text-secondary">No saved listings yet.</p>
            </div>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {savedListings.map((listing) => (
                <Col key={listing.id}>
                  <Card className="premium-card h-100">
                    <div className="premium-image-container position-relative" style={{ height: '180px' }}>
                      <img
                        src={listing.images?.[0] || 'https://picsum.photos/seed/saved/800/600'}
                        alt={`${listing.title} saved preview`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <Badge className="premium-badge position-absolute" style={{ right: 12, bottom: 12 }}>
                        {listing.bedrooms} Bed
                      </Badge>
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold">{listing.title}</Card.Title>
                      <p className="text-secondary mb-2">{listing.location}</p>
                      <div className="d-flex gap-2">
                        <Link to={`/listings/${listing.id}`} className="text-decoration-none w-50">
                          <Button variant="outline-primary" className="w-100 rounded-pill fw-semibold">
                            Open
                          </Button>
                        </Link>
                        <Button
                          variant="outline-danger"
                          className="w-50 rounded-pill fw-semibold"
                          onClick={() => onRemoveListing(listing.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MyPage;
