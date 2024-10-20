import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import './Auth.css';

interface RegisterFormData {
  email: string;
  password: string;
  fullName: string;
  address: string;
  country: string;
  gender: string;
  birthDate: string;
  phoneNumber: string;
  agreeTerms: boolean;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    fullName: '',
    address: '',
    country: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    agreeTerms: false
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Register:', formData);
  };

  return (
      <div className="auth-container">
        <div className="auth-tabs">
          <Link to="/login" className="tab">LOGIN</Link>
          <button className="tab active">REGISTER</button>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2 className="text-center">Create an account</h2>
          <button type="button" className="social-button">
            <FaGoogle /> Sign up with Google
          </button>
          <div className="divider">
            <span>or sign up with email</span>
          </div>
          <div className="form-group">
            <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
          </div>
          <div className="two-columns">
            <div className="form-group">
              <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
              />
            </div>
            <div className="form-group">
              <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input
                type="text"
                name="country"
                className="form-control"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
            />
          </div>
          <div className="two-columns">
            <div className="form-group">
              <select
                  name="gender"
                  className="form-control"
                  value={formData.gender}
                  onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <input
                  type="date"
                  name="birthDate"
                  className="form-control"
                  value={formData.birthDate}
                  onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <input
                type="tel"
                name="phoneNumber"
                className="form-control"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
              />
              {' '}I have read and agree to the terms
            </label>
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
  );
};

export default RegisterPage;