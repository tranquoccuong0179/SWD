import React, { useState, ChangeEvent, useEffect } from 'react';
import { Container, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';
import LoadingButton from '../../components/Button';
import { Layout } from 'antd';

// Interface for the main registration form data
interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
}

// Interface for OTP verification data
interface OtpFormData {
  otp: string;
  userId: string;
}

const RegisterPage: React.FC = () => {
  // Main form state initialization
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
  });

  // OTP form state initialization
  const [otpFormData, setOtpFormData] = useState<OtpFormData>({
    otp: '',
    userId: '',
  });

  // UI state management
  const [showOtpForm, setShowOtpForm] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Timer state for OTP expiration
  const [otpTimer, setOtpTimer] = useState<number>(300); // 5 minutes in seconds
  const [canResendOtp, setCanResendOtp] = useState<boolean>(false);

  const navigate = useNavigate();

  // Timer effect for OTP expiration
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (showOtpForm && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [showOtpForm, otpTimer]);

  /**
   * Formats the timer into MM:SS format
   */
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  /**
   * Handles the main registration form submission
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Convert gender value for API
      const genderValue = formData.gender === '0' ? 0 : 1;

      // Send registration request
      const response = await axios.post(
          'https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/auth/SignUp',
          {
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            fullName: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phone,
            gender: genderValue,
          }
      );

      // Store userId for OTP verification
      setOtpFormData(prev => ({
        ...prev,
        userId: response.data.userId
      }));

      // Show success message and OTP form
      setSuccess('Registration successful! Please check your email for the OTP code.');
      setShowOtpForm(true);
      setOtpTimer(300); // Reset timer to 5 minutes
      setCanResendOtp(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles OTP verification form submission
   */
  /**
   * Handles OTP verification form submission
   */
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate OTP format
    if (!/^\d{6}$/.test(otpFormData.otp)) {
      setError('Please enter a valid 6-digit OTP code');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
          'https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/auth/Verify',
          {
            userId: otpFormData.userId,
            otp: otpFormData.otp
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
      );

      // Check if the response is successful (status code 200)
      if (response.status === 200) {
        setSuccess('Email verified successfully! Redirecting to login...');

        // Clear any existing timers
        setOtpTimer(0);
        setCanResendOtp(false);

        // Redirect to login page after a short delay
        setTimeout(() => navigate('/Login'), 3000);
      } else {
        throw new Error('Verification failed');
      }
    } catch (err: any) {
      // Handle specific error cases
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        switch (err.response.status) {
          case 400:
            setError('Invalid OTP code. Please try again.');
            break;
          case 401:
            setError('OTP has expired. Please request a new one.');
            setCanResendOtp(true);
            break;
          case 404:
            setError('User not found. Please register again.');
            // Optionally redirect back to registration
            setTimeout(() => setShowOtpForm(false), 3000);
            break;
          default:
            setError('Verification failed. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('Network error. Please check your connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles resending OTP
   */
  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Implement your resend OTP API call here
      await axios.post(
          'https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/auth/ResendOTP',
          {
            userId: otpFormData.userId
          }
      );

      // Reset timer and disable resend button
      setOtpTimer(300);
      setCanResendOtp(false);
      setSuccess('New OTP has been sent to your email.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles form input changes for both registration and OTP forms
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'otp') {
      // Only allow numbers and limit to 6 digits
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 6);
      setOtpFormData(prev => ({
        ...prev,
        otp: sanitizedValue
      }));
    } else {
      // Handle other form inputs...
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      if (name === 'password') {
        validatePassword(value);
      }
    }
  };

  /**
   * Validates password complexity
   */
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one special character, and one number.');
    } else {
      setPasswordError('');
    }
  };

  /**
   * Validates Vietnamese phone numbers
   */
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;

    if (numericValue === '' || phoneRegex.test(numericValue)) {
      setPhoneError('');
    } else {
      setPhoneError('Please enter a valid Vietnamese phone number');
    }

    setFormData(prev => ({
      ...prev,
      phone: numericValue
    }));
  };

  /**
   * Toggles password visibility
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <Layout className="landing-page">
        <Row className="h-100 imageSetup">
          <Col md={4}></Col>
          <Col md={4}>
            <Container className="auth-container">
              {/* Auth tabs */}
              <div className="auth-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Link to="/login" className="btn btn-light">LOGIN</Link>
                <Button className='tab active' variant="light" style={{ marginLeft: '20px' }}>REGISTER</Button>
              </div>

              {/* Alert messages */}
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              {/* Conditional rendering of forms */}
              {!showOtpForm ? (
                  // Registration Form
                  <Form className="auth-form" onSubmit={handleRegister}>
                    {/* Username field */}
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                      />
                    </Form.Group>

                    {/* Password field */}
                    <Form.Group className="mb-3">
                      <InputGroup>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <Button
                            variant="outline-secondary"
                            onClick={togglePasswordVisibility}
                            style={{
                              border: '1px solid gray',
                              borderRadius: '0 4px 4px 0'
                            }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputGroup>
                      {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
                    </Form.Group>

                    {/* Confirm Password field */}
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                      />
                    </Form.Group>

                    {/* Full Name field */}
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          name="fullName"
                          placeholder="Full Name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                      />
                    </Form.Group>

                    {/* Email field */}
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                      />
                    </Form.Group>

                    {/* Phone field */}
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="tel"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          onChange={handlePhoneChange}
                          isInvalid={!!phoneError}
                          required
                      />
                      {phoneError && <Form.Text className="text-danger">{phoneError}</Form.Text>}
                    </Form.Group>

                    {/* Gender field */}
                    <Form.Group className="mb-3">
                      <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          required
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    {/* Terms checkbox */}
                    <Form.Group className="mb-3">
                      <Form.Check type="checkbox" label="I have read and agree to the terms" required />
                    </Form.Group>

                    {/* Submit button */}
                    <LoadingButton
                        type="submit"
                        isLoading={isLoading}
                        className="w-100 btn btn-primary"
                    >
                      SIGN UP
                    </LoadingButton>
                  </Form>
              ) : (
                  // OTP Verification Form
                  <Form className="auth-form" onSubmit={handleOtpSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Control
                          type="text"
                          name="otp"
                          placeholder="Enter OTP from email"
                          value={otpFormData.otp}
                          onChange={handleInputChange}
                          maxLength={6}
                          required
                      />
                      <Form.Text className="text-muted">
                        Time remaining: {formatTime(otpTimer)}
                      </Form.Text>
                    </Form.Group>

                    {/* OTP Submit button */}
                    <LoadingButton
                        type="submit"
                        isLoading={isLoading}
                        className="w-100 btn btn-primary mb-3"
                    >
                      VERIFY OTP
                    </LoadingButton>

                    {/* Resend OTP button */}
                    {canResendOtp && (
                        <Button
                            onClick={handleResendOtp}
                            disabled={isLoading || !canResendOtp}
                            className="w-100 btn btn-secondary"
                        >
                          Resend OTP
                        </Button>
                    )}
                  </Form>
              )}
            </Container>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Layout>
  );
};

export default RegisterPage;