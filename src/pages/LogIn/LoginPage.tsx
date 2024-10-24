import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../store/user/action';
import LoadingButton from '../../components/Button';
import { AppDispatch } from '../../store/types';

declare global {
  interface Window {
    google: any;
  }
}

interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

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

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Configure axios defaults
  useEffect(() => {
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
  }, []);

  useEffect(() => {
    const loadGoogleSignIn = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        try {
          window.google.accounts.id.initialize({
            client_id: '945895220472-lu73hfjtbhadpp3e6i6hbuanj4dap22s.apps.googleusercontent.com',
            callback: handleGoogleSignIn,
            ux_mode: 'popup', // Using popup to avoid redirect issues
          });

          window.google.accounts.id.renderButton(
              document.getElementById('googleSignInButton'),
              {
                theme: 'outline',
                size: 'large',
                width: 250 // Set a specific width for better UI consistency
              }
          );
        } catch (err) {
          console.error('Error initializing Google Sign-In:', err);
          setError('Failed to initialize Google Sign-In. Please try again later.');
        }
      };

      script.onerror = () => {
        console.error('Failed to load Google Sign-In script');
        setError('Failed to load Google Sign-In. Please try again later.');
      };

      document.body.appendChild(script);
      return () => {
        const scriptElement = document.querySelector(`script[src="${script.src}"]`);
        if (scriptElement) document.body.removeChild(scriptElement);
      };
    };

    loadGoogleSignIn();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post<AxiosResponse>(
          'https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api/auth/SignIn',
          { username, password }
      );
      handleLoginSuccess(response.data.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials and try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    if (!response.credential) {
      setError('Google Sign-In failed: No credentials received');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await axios.get<LoginResponse>(
          'https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api/auth/google-auth/login',
          {
            params: {
              token: response.credential,
              flowName: 'GeneralOAuthFlow'
            },
            headers: {
              'Accept': 'application/json',
              'Access-Control-Allow-Origin': '*' // Note: The server must be configured to accept this
            },
            withCredentials: false // Important for CORS requests
          }
      );

      if (res.data) {
        handleLoginSuccess(res.data);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      const errorMessage = err.response?.data?.message || 'Google Sign-In failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = (data: LoginResponse) => {
    if (!data?.token?.accessToken) {
      setError('Invalid login response: Missing access token');
      return;
    }

    const { accessToken, refreshToken } = data.token;

    // Store tokens
    localStorage.setItem('accessToken', accessToken);
    if (remember) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.setItem('refreshToken', refreshToken);
    }

    // Dispatch user data to Redux store with proper typing
    dispatch(loginAccount({
      id: data.user.id,
      email: data.user.email,
      fullName: data.user.fullName,
      userName: data.user.userName,
      gender: data.user.gender,
      phoneNumber: data.user.phoneNumber
    }));

    // Set up axios interceptor
    axios.interceptors.request.use(
        (config) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
    );

    navigate('/Home');
  };

  return (
      <Container className="auth-container" style={{ maxWidth: '500px', marginTop: '50px' }}>
        <Row className="justify-content-center">
          <Col>
            <div className="auth-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Button className='tab active' variant="light" style={{ marginRight: '10px' }}>LOGIN</Button>
              <Link to="/register" className="btn btn-light">REGISTER</Link>
            </div>
            <Form className="auth-form" onSubmit={handleLogin}>
              <h4 className="text-center mb-4">Sign in with:</h4>
              <div className="social-buttons text-center">
                <div
                    id="googleSignInButton"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '15px',
                      minHeight: '40px' // Prevent layout shift
                    }}
                ></div>
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