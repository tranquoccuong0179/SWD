import React from 'react';
import { Layout, Card, Tabs, Typography, Row, Col, Statistic, Table, Tag, Avatar } from 'antd';
import {
    UserOutlined,
    BookOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import './AdminDashboard.css';
import '../LandingPage/LandingPage.css'
import Header from '../../components/Header/Header';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// Mock data for the courses table
const courseColumns = [
    {
        title: 'Course Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <div className="course-name">
                <BookOutlined className="course-icon" />
                <span>{text}</span>
            </div>
        ),
    },
    {
        title: 'Students',
        dataIndex: 'students',
        key: 'students',
    },
    {
        title: 'Completion Rate',
        dataIndex: 'completion',
        key: 'completion',
        render: (rate) => `${rate}%`,
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (status) => (
            <Tag color={status === 'active' ? 'success' : 'default'}>
                {status.toUpperCase()}
            </Tag>
        ),
    },
];

const courseData = [
    {
        key: '1',
        name: 'Physics 101',
        students: 125,
        completion: 85,
        status: 'active',
    },
    {
        key: '2',
        name: 'Physics 102',
        students: 98,
        completion: 78,
        status: 'active',
    },
    {
        key: '3',
        name: 'Advanced Physics',
        students: 64,
        completion: 92,
        status: 'active',
    },
];

// Mock data for the students table
const studentColumns = [
    {
        title: 'Student',
        dataIndex: 'name',
        key: 'name',
        render: (text) => (
            <div className="student-name">
                <Avatar icon={<UserOutlined />} />
                <span>{text}</span>
            </div>
        ),
    },
    {
        title: 'Enrolled Courses',
        dataIndex: 'courses',
        key: 'courses',
    },
    {
        title: 'Progress',
        dataIndex: 'progress',
        key: 'progress',
        render: (progress) => `${progress}%`,
    },
    {
        title: 'Last Active',
        dataIndex: 'lastActive',
        key: 'lastActive',
    },
];

const studentData = [
    {
        key: '1',
        name: 'Student 1',
        courses: 3,
        progress: 75,
        lastActive: '2h ago',
    },
    {
        key: '2',
        name: 'Student 2',
        courses: 2,
        progress: 60,
        lastActive: '1h ago',
    },
    {
        key: '3',
        name: 'Student 3',
        courses: 4,
        progress: 90,
        lastActive: '30m ago',
    },
];

const AdminDashboard = () => {
    return (
        <div>
        <Layout className="landing-page">
        <Header/> 
        <div className="admin-dashboard">
            
            <div className="dashboard-header">
                <div>
                    <Title level={2}>Dashboard</Title>
                    <Text type="secondary">Welcome back, Admin</Text>
                </div>
                <div className="date-display">
                    <ClockCircleOutlined />
                    <Text type="secondary" style={{ marginLeft: '8px' }}>
                        {new Date().toLocaleDateString('vi-VN')}
                    </Text>
                </div>
            </div>

            {/* Stats Cards */}
            <Row gutter={[16, 16]} className="stats-section">
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Students"
                            value={10482}
                            prefix={<UserOutlined />}
                            suffix={
                                <Text type="success" className="stat-trend">
                                    <ArrowUpOutlined /> 12.5%
                                </Text>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Active Courses"
                            value={245}
                            prefix={<BookOutlined />}
                            suffix={
                                <Text type="success" className="stat-trend">
                                    <ArrowUpOutlined /> 5%
                                </Text>
                            }
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Total Revenue"
                            value={425.8}
                            prefix={<DollarOutlined />}
                            suffix="M ₫"
                        />
                        <Text type="success" className="stat-trend">
                            <ArrowUpOutlined /> 18.2%
                        </Text>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Completion Rate"
                            value={78.5}
                            prefix={<CheckCircleOutlined />}
                            suffix="%"
                        />
                        <Text type="success" className="stat-trend">
                            <ArrowUpOutlined /> 2.4%
                        </Text>
                    </Card>
                </Col>
            </Row>

            {/* Main Content */}
            <Card className="main-content">
                <Tabs defaultActiveKey="1" type="card">
                    <TabPane tab="Overview" key="1">
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card title="Recent Activity" className="activity-card">
                                    {[1, 2, 3].map((_, index) => (
                                        <div key={index} className="activity-item">
                                            <div className="activity-icon">
                                                <BookOutlined />
                                            </div>
                                            <div className="activity-content">
                                                <Text strong>New course enrollment</Text>
                                                <Text type="secondary">Student enrolled in "Physics 101"</Text>
                                            </div>
                                            <Text type="secondary">2 hours ago</Text>
                                        </div>
                                    ))}
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>

                    <TabPane tab="Courses" key="2">
                        <Card className="courses-card">
                            <Table
                                columns={courseColumns}
                                dataSource={courseData}
                                pagination={false}
                            />
                        </Card>
                    </TabPane>

                    <TabPane tab="Students" key="3">
                        <Card className="students-card">
                            <Table
                                columns={studentColumns}
                                dataSource={studentData}
                                pagination={false}
                            />
                        </Card>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
        </Layout>
        </div>
    );
};

export default AdminDashboard;