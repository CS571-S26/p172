import React from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthForm = ({
  title,
  submitLabel,
  onSubmit,
  formData,
  onChange,
  error,
  secondaryText,
  secondaryLinkText,
  secondaryTo,
  showNameField = false,
}) => {
  return (
    <Card className="glass-panel border-0" style={{ borderRadius: '24px' }}>
      <Card.Body className="p-4 p-md-5">
        <h1 className="fw-bold mb-4 text-center">{title}</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={onSubmit}>
          {showNameField && (
            <Form.Group className="mb-3" controlId="nameField">
              <Form.Label className="fw-semibold">Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
                required
                className="premium-input"
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="emailField">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="premium-input"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="passwordField">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              minLength={6}
              className="premium-input"
            />
          </Form.Group>

          <Button type="submit" className="btn-premium w-100 py-2">
            {submitLabel}
          </Button>
        </Form>
        <p className="text-center text-secondary mt-4 mb-0">
          {secondaryText}{' '}
          <Link to={secondaryTo} className="fw-semibold">
            {secondaryLinkText}
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
};

export default AuthForm;
