import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../store/user/action';
import LoadingButton from '../../components/Button';
import { AppDispatch } from '../../store/types';
import { GoogleOutlined, GooglePlusOutlined } from '@ant-design/icons';

// Interface definitions
interface LoginResponse {
  token: {
    accessToken: string;
    refreshToken: string;
  }
  user: {
    id: string;
    email: string;
    fullName: string;
    userName: string;
    gender: number;
    phoneNumber: number;
  }
}

const API_BASE_URL = 'https://manim-api-ffh6c8ewbehjc0hn.canadacentral-01.azurewebsites.net';

const LoginPage: React.FC = () => {
  // State management
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [googleAuthWindow, setGoogleAuthWindow] = useState<Window | null>(null);

  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Configure axios defaults
  useEffect(() => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  }, []);

  // Google Auth Popup Handler
  const openGoogleAuthPopup = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
        `${API_BASE_URL}/api/auth/google-auth/login`,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );

    if (popup) {
      setGoogleAuthWindow(popup);
      // Check if popup was blocked
      if (popup.closed || typeof popup.closed === 'undefined') {
        setError('Popup was blocked by the browser. Please enable popups for this site.');
      }
    } else {
      setError('Failed to open Google login popup. Please enable popups for this site.');
    }
  };

  // Listen for messages from popup
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== API_BASE_URL) {
        console.warn('Received message from unauthorized origin:', event.origin);
        return;
      }

      // Check if we received data from the popup
      if (event.data?.data) {
        try {
          setIsLoading(true);

          // Transform the received data to match LoginResponse interface
          const loginData: LoginResponse = {
            token: {
              accessToken: event.data.data.token.accessToken,
              refreshToken: event.data.data.token.refreshToken
            },
            user: {
              id: event.data.data.id || '',
              email: event.data.data.email,
              fullName: event.data.data.name,
              userName: event.data.data.email.split('@')[0], // fallback username
              gender: event.data.data.gender || 0,
              phoneNumber: event.data.data.phoneNumber || 0
            }
          };

          // Close the popup window
          if (googleAuthWindow && !googleAuthWindow.closed) {
            googleAuthWindow.close();
          }

          // Handle the login success
          handleLoginSuccess(loginData);
        } catch (error: any) {
          console.error('Error handling Google auth:', error);
          setError('Failed to complete Google authentication');
        } finally {
          setIsLoading(false);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [googleAuthWindow]);

  // Regular login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post<{ data: LoginResponse }>(
          `${API_BASE_URL}/api/auth/SignIn`,
          { username, password }
      );

      if (response.data.data) {
        handleLoginSuccess(response.data.data);
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

  // Handle successful login
  const handleLoginSuccess = (data: LoginResponse) => {
    if (!data?.token?.accessToken) {
      setError('Invalid login response: Missing access token');
      return;
    }

    const { accessToken, refreshToken } = data.token;

    // Store tokens based on "remember me" setting
    localStorage.setItem('accessToken', accessToken);
    if (remember) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.setItem('refreshToken', refreshToken);
    }

    // Set up axios interceptor for future requests
    axios.interceptors.request.use(
        (config) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
    );

    // Dispatch user data to Redux store
    dispatch(loginAccount({
      id: data.user.id,
      email: data.user.email,
      fullName: data.user.fullName,
      userName: data.user.userName,
      gender: data.user.gender,
      phoneNumber: data.user.phoneNumber
    }));

    // Navigate to home page
    navigate('/Home');
  };

  return (
      <Container className="auth-container" style={{ maxWidth: '500px', marginTop: '50px' }}>
        <Row className="justify-content-center">
          <Col>
            <div className="auth-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Button className='tab active' variant="light" style={{ marginRight: '20px' }}>LOGIN</Button>
              <Link to="/register" className="btn btn-light">REGISTER</Link>
            </div>
            <Form className="auth-form" onSubmit={handleLogin}>
              <h4 className="text-center mb-4">Sign in with:</h4>

              <div className="social-buttons text-center">
                <Button
                    onClick={openGoogleAuthPopup}
                    className="w-100 mb-3 d-flex align-items-center justify-content-center"
                    variant="outline-danger"
                    disabled={isLoading}
                >
                  {/*<img
                      src="/google-icon.png"
                      alt="Google"
                      style={{ width: '20px', marginRight: '10px' }}
                  />*/}
                  <GooglePlusOutlined className='google-icon' style={{ fontSize: '1.8rem', color: 'red', marginRight: '1rem' }}/>
                  Sign in with Google
                </Button>
              </div>

              <div className="divider text-center">
                <span>or:</span>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

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

              <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  className="w-100 btn btn-primary"
              >
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