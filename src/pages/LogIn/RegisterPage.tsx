import React, { useState, ChangeEvent } from 'react';
import { Container, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios'; // Added axios import
import './Auth.css';
import LoadingButton from '../../components/Button';

interface FormData {
  
  username: string; // Added username field
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '', // Added username field
    password: '',
    confirmPassword: '',
    fullName: '',
    email: '',
    phone: '',
    gender: '',
  });

  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const genderValue = formData.gender === '0' ? 0 : 1;

      const response = await axios.post('https://mamin-api-hrbrffbrh3h6embb.canadacentral-01.azurewebsites.net/api/auth/SignUp', {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        gender: genderValue,
      });
      console.log(response.data);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/Login'), 3000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
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
            <div className="auth-tabs" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}> 
              <Link to="/login" className="btn btn-light">LOGIN</Link>
              <Button className='tab active' variant="light" style={{ marginRight: '10px' }}>REGISTER</Button>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form className="auth-form" onSubmit={handleRegister}>
              
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
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    // value={formData.phone}
                    onChange={handlePhoneChange}
                    isInvalid={!!phoneError}
                    required
                />
                {phoneError && <Form.Text className="text-danger">{phoneError}</Form.Text>}
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
                <Form.Check type="checkbox" label="I have read and agree to the terms" required />
              </Form.Group>
              <LoadingButton
                  type="submit"
                  isLoading={isLoading}
                  className="w-100 btn btn-primary"
              >
                SIGN UP
              </LoadingButton>
            </Form>
          </Col>
        </Row>
      </Container>
  );
};

export default RegisterPage;