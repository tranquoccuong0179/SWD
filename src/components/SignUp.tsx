import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import './SignUp.css';
import axios from 'axios'; // Import axios for making API requests

const SignUpPage: React.FC = () => {
    const onFinish = async (values: any) => {
        try {
            // Make a POST request to your sign-up API
            const response = await axios.post('https://yourapi.com/auth/signup', {
                name: values.name,
                email: values.email,
                password: values.password,
            });

            // Handle success
            message.success('Sign up successful! Please log in.');
            console.log('Sign up response:', response.data);

            // Redirect to login page or dashboard after successful sign-up
            // (e.g., history.push('/login') if using React Router)
        } catch (error) {
            // Handle error
            console.error('Sign-up error:', error);
            message.error('Sign up failed. Please try again.');
        }
    };

    return (
        <div className="sign-up-page">
            <div className="sign-up-box">
                <div className="sign-up-logo">
                    <img src="../assets/1353727.jpeg" alt="Logo" />
                </div>
                <h2>SIGN UP</h2>
                <Form
                    name="sign_up"
                    className="sign-up-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'Please enter a valid Email!' }]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            { required: true, message: 'Please confirm your Password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Passwords do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="sign-up-form-button">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SignUpPage;
