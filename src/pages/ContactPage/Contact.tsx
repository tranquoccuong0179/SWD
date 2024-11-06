import React from 'react';
import { Layout, Typography, Form, Input, Button, Card, Divider } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, SendOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import BackToTopButton from '../../components/BackToTop';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Contact = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Form submitted:', values);
        // Implement form submission logic here
        form.resetFields();
    };

    return (
        <Layout className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            <Header />
            <Content>
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                                Liên Hệ Với Chúng Tôi
                            </h1>
                            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                                Hãy để chúng tôi biết bạn cần gì. Đội ngũ hỗ trợ của chúng tôi sẽ phản hồi trong vòng 24 giờ.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <Title level={2} className="text-3xl font-bold">
                                    Thông Tin Liên Hệ
                                </Title>
                                <Divider className="my-6" />
                            </div>

                            {/* Contact Cards */}
                            <div className="space-y-6">
                                <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-50 p-3 rounded-full">
                                            <EnvironmentOutlined className="text-2xl text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Địa Chỉ</h3>
                                            <p className="text-gray-600">123 Đường ABC, Quận XYZ</p>
                                            <p className="text-gray-600">TP.HCM, Việt Nam</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-green-50 p-3 rounded-full">
                                            <PhoneOutlined className="text-2xl text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Điện Thoại</h3>
                                            <p className="text-gray-600">028.1234.5678</p>
                                            <p className="text-gray-600">028.8765.4321</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-purple-50 p-3 rounded-full">
                                            <MailOutlined className="text-2xl text-purple-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Email</h3>
                                            <p className="text-gray-600">contact@manimphysics.edu.vn</p>
                                            <p className="text-gray-600">support@manimphysics.edu.vn</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="hover:shadow-lg transition-shadow duration-300 border-0 shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-orange-50 p-3 rounded-full">
                                            <ClockCircleOutlined className="text-2xl text-orange-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">Giờ Làm Việc</h3>
                                            <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                                            <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <Title level={2} className="text-3xl font-bold mb-6">
                                Gửi Tin Nhắn
                            </Title>
                            <Form
                                form={form}
                                name="contact"
                                onFinish={onFinish}
                                layout="vertical"
                                className="space-y-4"
                            >
                                <Form.Item
                                    name="name"
                                    label="Họ và tên"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                >
                                    <Input
                                        size="large"
                                        className="rounded-lg"
                                        placeholder="Nhập họ và tên của bạn"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email!' },
                                        { type: 'email', message: 'Email không hợp lệ!' }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        className="rounded-lg"
                                        placeholder="example@email.com"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Số điện thoại"
                                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                                >
                                    <Input
                                        size="large"
                                        className="rounded-lg"
                                        placeholder="0123 456 789"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="subject"
                                    label="Chủ đề"
                                    rules={[{ required: true, message: 'Vui lòng nhập chủ đề!' }]}
                                >
                                    <Input
                                        size="large"
                                        className="rounded-lg"
                                        placeholder="Nhập chủ đề tin nhắn"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="message"
                                    label="Nội dung"
                                    rules={[{ required: true, message: 'Vui lòng nhập nội dung tin nhắn!' }]}
                                >
                                    <TextArea
                                        rows={4}
                                        className="rounded-lg resize-none"
                                        placeholder="Nhập nội dung tin nhắn của bạn"
                                    />
                                </Form.Item>

                                <Form.Item className="mb-0">
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        icon={<SendOutlined />}
                                        className="w-full h-12 rounded-lg text-lg"
                                    >
                                        Gửi tin nhắn
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </Content>
            <BackToTopButton />
            <Footer />
        </Layout>
    );
};

export default Contact;