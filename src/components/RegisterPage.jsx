import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(formData);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    navigate('/', { replace: true });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <AuthForm
            title="Create Account"
            submitLabel="Register"
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            error={error}
            secondaryText="Already have an account?"
            secondaryLinkText="Login"
            secondaryTo="/login"
            showNameField
          />
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
