import React, { useMemo, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ListingChatPanel = ({ listing, inquiries, onCreateInquiry }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [formData, setFormData] = useState({
    message: '',
    moveInDate: '',
    contactMethod: 'In-app chat',
    budget: '',
  });

  const myThreads = useMemo(
    () =>
      inquiries.filter(
        (item) => item.listingId === listing.id && item.fromEmail === currentUser?.email
      ),
    [inquiries, listing.id, currentUser]
  );

  const submitMessage = (e) => {
    e.preventDefault();
    if (!formData.message.trim() || !isAuthenticated) return;

    onCreateInquiry({
      listingId: listing.id,
      listingTitle: listing.title,
      ownerEmail: listing.postedByEmail || listing.contactEmail || '',
      ownerName: listing.postedByName || 'Listing Owner',
      fromEmail: currentUser.email,
      fromName: currentUser.name,
      message: formData.message.trim(),
      moveInDate: formData.moveInDate,
      contactMethod: formData.contactMethod,
      budget: formData.budget,
    });
    setFormData({ message: '', moveInDate: '', contactMethod: 'In-app chat', budget: '' });
  };

  if (!isAuthenticated) {
    return (
      <Alert variant="info" className="rounded-4">
        Login to use in-app messaging with listing owners.{' '}
        <Link to="/login" className="fw-semibold">Go to Login</Link>
      </Alert>
    );
  }

  return (
    <div className="glass-panel rounded-4 p-3 p-md-4 mt-4">
      <h2 className="h5 fw-bold mb-3">Connect with Poster</h2>
      <p className="text-secondary mb-3">
        Send an inquiry with your move-in timing and budget. The poster can reply from My Page Inbox.
      </p>
      <div className="chat-scroll mb-3">
        {myThreads.length === 0 ? (
          <p className="text-secondary mb-0">No inquiry yet. Start by sending your first message.</p>
        ) : (
          myThreads.map((thread) => (
            <div key={thread.id} className="chat-bubble mb-3">
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">You</span>
                <small className="text-secondary">{new Date(thread.createdAt).toLocaleString()}</small>
              </div>
              <p className="mb-1 mt-1">{thread.message}</p>
              <small className="text-secondary d-block">
                Move-in: {thread.moveInDate || 'Flexible'} / Budget: {thread.budget || 'Not specified'}
              </small>
              <small className="text-secondary d-block">Status: {thread.status}</small>
              {thread.replies?.map((reply) => (
                <div key={reply.id} className="mt-2 pt-2 border-top">
                  <div className="d-flex justify-content-between">
                    <span className="fw-semibold">{reply.fromName}</span>
                    <small className="text-secondary">{new Date(reply.createdAt).toLocaleString()}</small>
                  </div>
                  <p className="mb-0 mt-1">{reply.message}</p>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
      <Form onSubmit={submitMessage}>
        <Form.Group controlId="listingMessage">
          <Form.Label className="fw-semibold">Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            className="premium-input"
            placeholder="Hi! Is this listing still available?"
          />
        </Form.Group>
        <div className="d-flex gap-2 mt-3 flex-wrap">
          <Form.Control
            type="date"
            className="premium-input"
            value={formData.moveInDate}
            onChange={(e) => setFormData((prev) => ({ ...prev, moveInDate: e.target.value }))}
            aria-label="Preferred move-in date"
          />
          <Form.Control
            type="text"
            className="premium-input"
            placeholder="Budget (optional)"
            value={formData.budget}
            onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
          />
          <Form.Select
            className="premium-input"
            value={formData.contactMethod}
            onChange={(e) => setFormData((prev) => ({ ...prev, contactMethod: e.target.value }))}
            aria-label="Preferred contact method"
          >
            <option>In-app chat</option>
            <option>Text message</option>
            <option>Phone call</option>
          </Form.Select>
        </div>
        <Button type="submit" className="btn-premium mt-3 px-4">Send</Button>
      </Form>
    </div>
  );
};

export default ListingChatPanel;
