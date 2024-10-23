import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../store/user/action';


declare global {
  interface Window {
    google: any;
  }
}
interface AxiosResponse<T = any> {
  data: T; // The actual response data is inside the 'data' property
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
  const dispatch= useDispatch()

  useEffect(() => {
    // Load the Google Sign-In API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      console.log('Google Sign-In script loaded'); // Debugging log
      window.google.accounts.id.initialize({
        client_id: '945895220472-lu73hfjtbhadpp3e6i6hbuanj4dap22s.apps.googleusercontent.com',
        callback: handleGoogleSignIn
      });
      window.google.accounts.id.renderButton(
          document.getElementById('googleSignInButton'),
          { theme: 'outline', size: 'large' }
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<AxiosResponse>(
          'https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api/auth/SignIn',
          { username, password }
      );
      console.log("res1", response.data.data);
      handleLoginSuccess(response.data.data);
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const handleGoogleSignIn = async (response: any) => {
    try {
      console.log('Google Sign-In response:', response);
      const res = await axios.get<LoginResponse>(
          'https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api/auth/google-auth/login',
          {
            params: {
              token: response.credential,
              flowName: 'GeneralOAuthFlow'
            }
          }
      );
      
      handleLoginSuccess(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Google Sign-In failed. Please try again.');
    }
  };

  const handleLoginSuccess = (data: LoginResponse) => {
    
    const { accessToken, refreshToken } = data?.token;
    console.log("data", accessToken);
    
    dispatch(loginAccount(data?.user))
    // Store tokens
    localStorage.setItem('accessToken', accessToken);
    if (remember) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      sessionStorage.setItem('refreshToken', refreshToken);
    }


    // Set up axios interceptor for future authenticated requests
    axios.interceptors.request.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );

    // Redirect to home page or dashboard
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
                <div id="googleSignInButton" style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}></div>
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
