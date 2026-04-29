import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthForm from './AuthForm';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(formData);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    const nextPath = location.state?.from?.pathname || '/';
    navigate(nextPath, { replace: true });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <AuthForm
            title="Login"
            submitLabel="Login"
            onSubmit={handleSubmit}
            formData={formData}
            onChange={handleChange}
            error={error}
            secondaryText="No account yet?"
            secondaryLinkText="Register"
            secondaryTo="/register"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
