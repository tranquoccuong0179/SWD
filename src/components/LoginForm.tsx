import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.css';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { AuthResponse } from './AuthInterface/AuthResponce.ts';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values);

        try {
            // Replace with your actual API endpoint
            const response = await axios.post<AuthResponse>('https://api.yourdomain.com/auth/login', {
                email: values.username,
                password: values.password
            });

            // Logging the response
            console.log('Auth Response:', response.data);

            // Access the token and user data
            const { email, name, token } = response.data.data;

            // Store the tokens (optional)
            localStorage.setItem('accessToken', token.accessToken);
            localStorage.setItem('refreshToken', token.refreshToken);

            // You can now navigate to a different page or display user info
            console.log(`Logged in as: ${name} (${email})`);

        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="login-logo">
                    <img src="../assets/1353727.jpeg" alt="Logo" />
                </div>
                <h2>LOG IN</h2>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">
                            Forgot password?
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p>
                            Don't have an account?{' '}
                            <Link to="/signup">Sign up here</Link>
                        </p>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
