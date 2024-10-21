import React, { useState, ChangeEvent } from 'react';
import { Container, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Added axios import
import './Auth.css';

interface FormData {
  email: string;
  username: string; // Added username field
  password: string;
  confirmPassword: string;
  fullName: string;
  address: string;
  country: string;
  gender: string;
  birthDate: string;
  phoneNumber: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '', // Added username field
    password: '',
    confirmPassword: '',
    fullName: '',
    address: '',
    country: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
  });

  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const genderValue = formData.gender === '0' ? 0 : 1;

      const response = await axios.post('https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api/auth/SignUp', {
        email: formData.email,
        username: formData.username, // Include username
        password: formData.password,
        confirmPassword: formData.confirmPassword, // Include confirmPassword
        fullName: formData.fullName,
        address: formData.address,
        country: formData.country,
        gender: genderValue,
        birthDate: formData.birthDate,
        phoneNumber: formData.phoneNumber
      });
      console.log(response.data);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/Login'), 3000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };


  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'password') {
      validatePassword(value);
    }
  };
  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters long, contain at least one uppercase letter, one special character, and one number.');
    } else {
      setPasswordError('');
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;

    if (numericValue === '' || phoneRegex.test(numericValue)) {
      setPhoneError('');
    } else {
      setPhoneError('Please enter a valid Vietnamese phone number');
    }

    setFormData(prevState => ({
      ...prevState,
      phoneNumber: numericValue
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
      <Container className="auth-container">
        <Row className="justify-content-center">
          <Col md={12}>
            <div className="auth-tabs">
              <Link to="/login" className="tab">LOGIN</Link>
              <div className="tab active">REGISTER</div>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form className="auth-form" onSubmit={handleRegister}>
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
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
                {passwordError && <Form.Text className="text-danger">{passwordError}</Form.Text>}
              </Form.Group>
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
              <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                />
              </Form.Group>
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
              <Form.Group className="mb-3">
                <Form.Control
                    type="date"
                    name="birthDate"
                    placeholder="Birth Date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    isInvalid={!!phoneError}
                    required
                />
                {phoneError && <Form.Text className="text-danger">{phoneError}</Form.Text>}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="I have read and agree to the terms" required />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                SIGN UP
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default RegisterPage;