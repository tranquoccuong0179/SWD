import React, { useState, ChangeEvent } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Auth.css';

interface FormData {
  email: string;
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <Form className="auth-form">
              <h4 className="text-center mb-4">Sign up with:</h4>
              <div className="social-buttons">
                <Button variant="outline-danger"><FaGoogle /></Button>
              </div>
              <div className="divider">
                <span>or:</span>
              </div>
              <Form.Group className="mb-3">
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <InputGroup>
                  <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                  />
                  <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" name="fullName" placeholder="Full Name" value={formData.fullName} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" name="address" placeholder="Address" value={formData.address} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" name="country" placeholder="Country" value={formData.country} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="date" name="birthDate" placeholder="Birth Date" value={formData.birthDate} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    isInvalid={!!phoneError}
                />
                <Form.Control.Feedback type="invalid">
                  {phoneError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="I have read and agree to the terms" />
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