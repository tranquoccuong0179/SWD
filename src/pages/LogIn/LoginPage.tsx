import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import '../LandingPage/LandingPage.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginAccount } from '../../store/user/action';
import LoadingButton from '../../components/Button';
import { AppDispatch } from '../../store/types';
import { GoogleLogin } from '@react-oauth/google';
import { accountService } from '../../services/accountServices';
import { Layout } from 'antd';

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
    // role: string;
  };
  role: string;
}

const API_BASE_URL = 'https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net';

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
      console.log("DATA:", response.data);
      console.log("ROLE:", responseData.role);


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

        const userData = {
          id: responseData.user.id,
          userName: responseData.user.userName,
          fullName: responseData.user.fullName,
          email: responseData.user.email,
          phoneNumber: responseData.user.phoneNumber,
          gender: responseData.user.gender,
          role: responseData.role
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        // console.log('USER DATA:', userData);
        

        if (responseData.role === 'AdminSystem') {
          localStorage.setItem('accessToken', responseData.token.accessToken);
          localStorage.setItem('refreshToken', responseData.token.refreshToken);
          localStorage.setItem('fullName', responseData.user.fullName);
          localStorage.setItem('id', responseData.user.id);
          localStorage.setItem('role', responseData.role)
          navigate('/admin')
        } else {
          localStorage.setItem('accessToken', responseData.token.accessToken);
          localStorage.setItem('refreshToken', responseData.token.refreshToken);
          localStorage.setItem('fullName', responseData.user.fullName);
          localStorage.setItem('id', responseData.user.id);
          localStorage.setItem('role', responseData.role)
          navigate("/Home");
        }
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
    <Layout className="landing-page">
      <Row className="h-100 imageSetup">
      <Col md={4}></Col>
      <Col md={4}>
          <Container className="auth-container" style={{ maxWidth: '500px', marginBottom: '6.5rem', marginTop: '50px' }}>
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
          </Container>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Layout>
  );
};

export default LoginPage;