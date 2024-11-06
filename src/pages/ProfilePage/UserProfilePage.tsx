import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Input, Row, Col, Form, Divider, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer.tsx";
import './UserProfilePage.css';

const { Title, Text } = Typography;

const UserProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        userName: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: '',
        address: '',
        facebook: '',
        twitter: '',
        linkedin: ''
    });

    useEffect(() => {
        const storedUserData = {
            userName: localStorage.getItem('userName') || '',
            fullName: localStorage.getItem('fullName') || '',
            email: localStorage.getItem('email') || '',
            phoneNumber: localStorage.getItem('phoneNumber') || '',
            gender: localStorage.getItem('gender') || '',
            address: localStorage.getItem('address') || '',
            facebook: localStorage.getItem('facebook') || '',
            twitter: localStorage.getItem('twitter') || '',
            linkedin: localStorage.getItem('linkedin') || ''
        };
        setUserData(storedUserData);
    }, []);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSave = () => {
        Object.keys(userData).forEach(key => localStorage.setItem(key, userData[key]));
        message.success("Profile updated successfully");
        setIsEditing(false);
    };

    return (
        <Layout className="user-profile-page">
            <Header />
            <div className="profile-container">
                <div className="profile-header">
                    <Title level={3}>Welcome, {userData.fullName || 'User'}</Title>
                    <Text type="secondary">{new Date().toDateString()}</Text>
                    <Button type="primary" onClick={handleEditToggle}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                </div>

                <Divider orientation="left">Account Information</Divider>
                <Form layout="vertical" className="profile-form">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="User Name" required>
                                <Input
                                    name="userName"
                                    value={userData.userName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<UserOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Password">
                                <Input.Password
                                    placeholder="********"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left">Contact Details</Divider>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Full Name" required>
                                <Input
                                    name="fullName"
                                    value={userData.fullName}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email" required>
                                <Input
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Phone Number">
                                <Input
                                    name="phoneNumber"
                                    value={userData.phoneNumber}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<PhoneOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Address">
                                <Input
                                    name="address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<HomeOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left">Personal Information</Divider>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Gender">
                                <Input
                                    name="gender"
                                    value={userData.gender}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider orientation="left">Social Links</Divider>
                    <Row gutter={16}>
                        <Col span={8}>
                            <Form.Item label="Facebook">
                                <Input
                                    name="facebook"
                                    value={userData.facebook}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<FacebookOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Twitter">
                                <Input
                                    name="twitter"
                                    value={userData.twitter}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<TwitterOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="LinkedIn">
                                <Input
                                    name="linkedin"
                                    value={userData.linkedin}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    prefix={<LinkedinOutlined />}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {isEditing && (
                        <Button type="primary" onClick={handleSave}>
                            Save
                        </Button>
                    )}
                </Form>
            </div>
        </Layout>
    );
};

export default UserProfilePage;
