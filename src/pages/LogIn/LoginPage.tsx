import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../store/user/action';
import LoadingButton from '../../components/Button';
import { AppDispatch } from '../../store/types';
import { GoogleLogin } from '@react-oauth/google';
import { accountService } from '../../services/accountServices';

interface LoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  };
  user: {
    id: string;
    email: string;
    fullName: string;
    userName: string;
    gender: number;
    phoneNumber: number;
  };
}

const API_BASE_URL = 'https://manim-api-ffh6c8ewbehjc0hn.canadacentral-01.azurewebsites.net';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post<{ data: LoginResponse }>(
        `${API_BASE_URL}/api/auth/SignIn`,
        { username, password }
      );
  
      // Adjusted based on possible data nesting
      const responseData = response.data.data || response.data;
  
      if (responseData && responseData.user) {
        dispatch(
          loginAccount({
            id: responseData.user.id,
            email: responseData.user.email,
            fullName: responseData.user.fullName,
            userName: responseData.user.userName,
            gender: responseData.user.gender,
            phoneNumber: responseData.user.phoneNumber,
          })
        );
  
        localStorage.setItem('accessToken', responseData.token.accessToken);
        localStorage.setItem('refreshToken', responseData.token.refreshToken);
        navigate("/Home");
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLoginSuccess = (data: LoginResponse) => {
    console.log("ss", data);

    if (!data?.credential) {
      setError('Invalid login response: Missing access token');
      return;
    } else {
      accountService.fetchUser().then((res) => {
        console.log("dd", res);
        navigate("/home")
      }).catch((err) => {
        console.log("s");

      }).finally((err) => {
        console.log(err);

      })
    }
  };

  return (
    <Container className="auth-container" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <Row className="justify-content-center">
        <Col>
          <div className="auth-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Button className="tab active" variant="light" style={{ marginRight: '20px' }}>
              LOGIN
            </Button>
            <Link to="/register" className="btn btn-light">
              REGISTER
            </Link>
          </div>
          <Form className="auth-form" onSubmit={handleLogin}>
            <h4 className="text-center mb-4">Sign in with:</h4>
            
            <div className="social-buttons text-center mb-3">
              {/* <Button
                    onClick={openGoogleAuthPopup}
                    className="w-100 mb-3 d-flex align-items-center justify-content-center button-with-border"
                    variant="outline-danger"
                    disabled={isLoading}
                >
                  <GooglePlusOutlined className="google-icon" style={{ fontSize: '1.8rem', color: 'red', marginRight: '1rem' }} />
                  Sign in with Google
                </Button> */}
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                  console.log("Login Failed");
                }} />
            </div>
            {error && <Alert variant="danger">{error}</Alert>}

            <div className="divider text-center">
              <span>or:</span>
            </div>
            
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

            <LoadingButton type="submit" isLoading={isLoading} className="w-100 btn btn-primary">
              SIGN IN
            </LoadingButton>

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