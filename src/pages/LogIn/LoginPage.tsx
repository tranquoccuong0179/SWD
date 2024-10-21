import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import './Auth.css'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    // Add your login logic here
    console.log({ email, password, remember });
  };

  return (
      <Container className="auth-container" style={{ maxWidth: '500px', marginTop: '50px' }}>
        <Row className="justify-content-center">
          <Col>
            <div className="auth-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Button variant="light" style={{ marginRight: '10px' }}>LOGIN</Button>
              <Link to="/register" className="btn btn-light">REGISTER</Link>
            </div>
            <Form className="auth-form" onSubmit={handleSubmit}>
              <h4 className="text-center mb-4">Sign in with:</h4>
              <div className="social-buttons text-center">
                <Button variant="outline-danger" style={{ width: '100%', marginBottom: '15px' }}>
                  <FaGoogle /> G
                </Button>
              </div>
              <div className="divider text-center">
                <span>or:</span>
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                SIGN IN
              </Button>
              <div className="text-center mt-3">
                <Link to="/forgot">Forgot password?</Link>
              </div>
            </Form>
            <div className="text-center mt-3">
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default LoginPage;