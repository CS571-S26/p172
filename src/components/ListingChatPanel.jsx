import React, { useMemo, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ListingChatPanel = ({ listing }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [text, setText] = useState('');
  const storageKey = useMemo(() => `badgerlease_chat_${listing.id}`, [listing.id]);

  const [messages, setMessages] = useState(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  });

  const submitMessage = (e) => {
    e.preventDefault();
    if (!text.trim() || !isAuthenticated) return;

    const next = [
      ...messages,
      {
        id: Date.now(),
        sender: currentUser.name,
        content: text.trim(),
        createdAt: new Date().toISOString(),
      },
    ];

    setMessages(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    setText('');
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
      <h2 className="h5 fw-bold mb-3">In-app Messaging</h2>
      <div className="chat-scroll mb-3">
        {messages.length === 0 ? (
          <p className="text-secondary mb-0">No messages yet. Start the conversation.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="chat-bubble mb-2">
              <div className="d-flex justify-content-between">
                <span className="fw-semibold">{msg.sender}</span>
                <small className="text-secondary">{new Date(msg.createdAt).toLocaleString()}</small>
              </div>
              <p className="mb-0 mt-1">{msg.content}</p>
            </div>
          ))
        )}
      </div>
      <Form onSubmit={submitMessage}>
        <Form.Group controlId="listingMessage">
          <Form.Label className="fw-semibold">Send a message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="premium-input"
            placeholder="Hi! Is this listing still available?"
          />
        </Form.Group>
        <Button type="submit" className="btn-premium mt-3 px-4">Send</Button>
      </Form>
    </div>
  );
};

export default ListingChatPanel;
