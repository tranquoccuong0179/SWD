import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Input, Row, Col, Form, Divider, message, Select } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, FacebookOutlined, TwitterOutlined, LinkedinOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './UserProfilePage.css';

const { Title, Text } = Typography;

const UserProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPass, setIsEditingPass] = useState(false);
    const [userData, setUserData] = useState({
        userName: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        gender: 0,
        address: '',
        facebook: '',
        twitter: '',
        linkedin: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    useEffect(() => {
        const userData = localStorage.getItem('userData') || '';
        const map = JSON.parse(userData)
        console.log("map", map);

        const storedUserData = {
            userName: map?.userName || '',
            fullName: map?.fullName || '',
            email: map?.email || '',
            phoneNumber: map?.phoneNumber || '',
            gender: map?.gender !== undefined ? parseInt(map.gender) : '' // Kiểm tra riêng trường hợp undefined
        };

        setUserData(storedUserData);
    }, []);
    // console.log("user", userData);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };
    const handleEditPassToggle = () => {
        setIsEditingPass(!isEditingPass);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };
    const handleSavePass = async () => {
        const token = localStorage.getItem('accessToken');
        if (passwordData.newPassword && passwordData.confirmNewPassword) {
            if (passwordData.newPassword !== passwordData.confirmNewPassword) {
                message.error("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
                return;
            }
            if (passwordData.currentPassword === passwordData.newPassword) {
                message.error("Mật khẩu mới phải khác mật khẩu cũ.");
                return;
            }
            localStorage.setItem('password', passwordData.newPassword);
        }
        try {
            const response = await axios.put(
                'https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api/auth/ChangePassword',
                {
                    oldPassword: passwordData?.currentPassword,
                    password: passwordData?.newPassword,
                    confirmPassword: passwordData?.confirmNewPassword
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log("sđ", response);

            if (response?.status === 200) {
                message.success("Đổi mật khẩu thành công!");
                setIsEditingPass(false);
            } else {
                message.error("Đổi mật khẩu thất bại, vui lòng thử lại.");
            }

        } catch (error) {

        }
    }

    const handleSave = async () => {

        const token = localStorage.getItem('accessToken');
        try {
            const response = await axios.put(
                'https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api/auth/UpdateProfile',
                {
                    userName: userData.userName,
                    fullName: userData.fullName,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    gender: userData.gender,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status === 200) {
                // Object.keys(userData).forEach(key => localStorage.setItem(key, userData[key]));
                localStorage.setItem("userData", JSON.stringify(userData));
                message.success("Sửa thông tin thành công!");
                setIsEditing(false);
            } else {
                message.error("Sửa thông tin thất bại, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            message.error("An error occurred while updating the profile.");
        }
    };

    return (
        <Layout className="user-profile-page">
            <Header />
            <div className="profile-container mb-10">
                <div className="profile-header flex justify-between items-start">
                    <div className="w-10/12 space-y-2">
                        <Title level={3}>Chào mừng, {userData.fullName || 'User'}!</Title>
                        <div className="text-gray-600">
                            {new Date().toLocaleString()} {/* Hiển thị thời gian hiện tại */}
                        </div>
                    </div>

                    <div className="w-2/12 flex flex-col space-y-4">
                        <Button
                            type="primary"
                            onClick={handleEditToggle}
                            className="w-full"
                        >
                            {isEditing ? "Hủy" : "Sửa thông tin"}
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleEditPassToggle}
                            className="w-full"
                        >
                            {isEditingPass ? "Hủy" : "Đổi mật khẩu"}
                        </Button>
                    </div>
                </div>
                {/* <Text type="secondary">{new Date().toDateString()}</Text> */}
                <Divider orientation="left">Thông tin tài khoản</Divider>
                <Form layout="vertical" className="profile-form">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Tên đăng nhập" required>
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
                            <Form.Item label="Mật khẩu">
                                <Input.Password
                                    placeholder="********"
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {isEditingPass && (
                        <>
                            <Divider orientation="left">Đổi mật khẩu</Divider>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Mật khẩu cũ">
                                        <Input.Password
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            prefix={<LockOutlined />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Mật khẩu mới">
                                        <Input.Password
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            prefix={<LockOutlined />}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Nhập lại mật khẩu mới">
                                        <Input.Password
                                            name="confirmNewPassword"
                                            value={passwordData.confirmNewPassword}
                                            onChange={handlePasswordChange}
                                            prefix={<LockOutlined />}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Button type="primary" onClick={handleSavePass}>
                                Lưu
                            </Button>

                        </>
                    )}

                    <Divider orientation="left">Thông tin cá nhân</Divider>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Họ và Tên" required>
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
                                    // disabled={!isEditing}
                                    disabled
                                    prefix={<MailOutlined />}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Số điện thoại">
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
                            {/* <Input
                                    name="gender"
                                    value={userData.gender === 0 ? "Nữ" : userData?.gender === 1 ? "Nam" : ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                /> */}
                            <Form.Item label="Giới tính">
                                {console.log("Gender value:", userData.gender)}
                                <Select
                                    name="gender"
                                    value={userData.gender}
                                    onChange={(value) => handleInputChange({ target: { name: 'gender', value } })}
                                    disabled={!isEditing}
                                >
                                    <Select.Option value={0}>Nữ</Select.Option>
                                    <Select.Option value={1}>Nam</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {isEditing && (
                        <Button type="primary" onClick={handleSave}>
                            Lưu
                        </Button>
                    )}
                </Form>
            </div>
            <Footer />
        </Layout>
    );
};

export default UserProfilePage;
