import React, { useState } from 'react';
import { Badge, Button, Card, Col, Container, Form, Row, Tab, Tabs, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyPage = ({
  myListings,
  savedListings,
  onRemoveListing,
  onDeleteListing,
  onShareListingUrl,
  inboxInquiries,
  onReplyInquiry,
}) => {
  const [replyMap, setReplyMap] = useState({});
  const [showShareToast, setShowShareToast] = useState(false);

  return (
    <Container className="py-5">
      <ToastContainer position="bottom-end" className="p-3">
        <Toast bg="dark" show={showShareToast} autohide delay={1800} onClose={() => setShowShareToast(false)}>
          <Toast.Body className="text-white">Listing link copied!</Toast.Body>
        </Toast>
      </ToastContainer>
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
                        src={listing.images?.[0] || 'https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?auto=compress&cs=tinysrgb&w=1200'}
                        alt={`${listing.title} preview`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold">{listing.title}</Card.Title>
                      <p className="text-secondary mb-2">{listing.location}</p>
                      <p className="fw-semibold mb-3">${listing.price}/mo</p>
                      <div className="d-flex flex-column gap-2">
                        <Link to={`/listings/${listing.id}`} className="text-decoration-none">
                          <Button variant="outline-primary" className="w-100 rounded-pill fw-semibold">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          variant="outline-dark"
                          className="w-100 rounded-pill fw-semibold"
                          onClick={async () => {
                            await onShareListingUrl(listing.id);
                            setShowShareToast(true);
                          }}
                        >
                          Share listing
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="w-100 rounded-pill fw-semibold"
                          onClick={() => {
                            if (window.confirm('Delete this listing permanently?')) {
                              onDeleteListing(listing.id);
                            }
                          }}
                        >
                          Delete listing
                        </Button>
                      </div>
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
                        src={listing.images?.[0] || 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=1200'}
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
                      <div className="d-flex flex-column gap-2">
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
                        <Button
                          variant="outline-dark"
                          className="w-100 rounded-pill fw-semibold"
                          onClick={async () => {
                            await onShareListingUrl(listing.id);
                            setShowShareToast(true);
                          }}
                        >
                          Share listing
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Tab>
        <Tab eventKey="inbox" title={`Inbox (${inboxInquiries.length})`}>
          {inboxInquiries.length === 0 ? (
            <div className="glass-panel rounded-4 p-4 text-center">
              <p className="mb-0 text-secondary">No inquiries yet from viewers.</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {inboxInquiries.map((inquiry) => (
                <Card key={inquiry.id} className="glass-panel border-0 rounded-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between flex-wrap gap-2">
                      <div>
                        <h2 className="h5 fw-bold mb-1">{inquiry.listingTitle}</h2>
                        <p className="mb-1 text-secondary">
                          From: {inquiry.fromName} ({inquiry.fromEmail})
                        </p>
                        <p className="mb-2">
                          <strong>Message:</strong> {inquiry.message}
                        </p>
                        <small className="text-secondary d-block">
                          Move-in: {inquiry.moveInDate || 'Flexible'} / Budget: {inquiry.budget || 'Not specified'} / Preferred: {inquiry.contactMethod}
                        </small>
                        <small className="text-secondary d-block">Status: {inquiry.status}</small>
                      </div>
                    </div>
                    {inquiry.replies?.length > 0 && (
                      <div className="mt-3 border-top pt-2">
                        {inquiry.replies.map((reply) => (
                          <div key={reply.id} className="mb-2">
                            <small className="fw-semibold">{reply.fromName}</small>
                            <p className="mb-0">{reply.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <Form
                      className="mt-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const text = replyMap[inquiry.id]?.trim();
                        if (!text) return;
                        onReplyInquiry(inquiry.id, text);
                        setReplyMap((prev) => ({ ...prev, [inquiry.id]: '' }));
                      }}
                    >
                      <Form.Control
                        className="premium-input"
                        placeholder="Reply to this inquiry..."
                        value={replyMap[inquiry.id] || ''}
                        onChange={(e) => setReplyMap((prev) => ({ ...prev, [inquiry.id]: e.target.value }))}
                      />
                      <Button type="submit" className="btn-premium mt-2 px-4">
                        Send Reply
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MyPage;
