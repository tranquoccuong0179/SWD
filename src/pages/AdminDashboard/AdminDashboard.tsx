import { Layout, Typography, Row, Col, Statistic, Table, Tag, Avatar, Tabs } from 'antd';
import {
    UserOutlined,
    BookOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import { Card as ShadcnCard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CourseManagement from '../../components/CourseManagement/CourseManagement';
import Header from '../../components/Header/Header';
import './AdminDashboard.css';

const { Title, Text } = Typography;

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
                <Header />
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

                    <Tabs defaultActiveKey="overview" className="w-full">
                        <Tabs.TabPane tab="Overview" key="overview">
                            <div className="overview-content">
                                <Row gutter={[16, 16]} className="stats-section">
                                    <Col xs={24} sm={12} lg={6}>
                                        <Layout.Content className="site-layout-background p-4 rounded-lg shadow">
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
                                        </Layout.Content>
                                    </Col>
                                    <Col xs={24} sm={12} lg={6}>
                                        <Layout.Content className="site-layout-background p-4 rounded-lg shadow">
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
                                        </Layout.Content>
                                    </Col>
                                    <Col xs={24} sm={12} lg={6}>
                                        <Layout.Content className="site-layout-background p-4 rounded-lg shadow">
                                            <Statistic
                                                title="Total Revenue"
                                                value={425.8}
                                                prefix={<DollarOutlined />}
                                                suffix="M ₫"
                                            />
                                            <Text type="success" className="stat-trend">
                                                <ArrowUpOutlined /> 18.2%
                                            </Text>
                                        </Layout.Content>
                                    </Col>
                                    <Col xs={24} sm={12} lg={6}>
                                        <Layout.Content className="site-layout-background p-4 rounded-lg shadow">
                                            <Statistic
                                                title="Completion Rate"
                                                value={78.5}
                                                prefix={<CheckCircleOutlined />}
                                                suffix="%"
                                            />
                                            <Text type="success" className="stat-trend">
                                                <ArrowUpOutlined /> 2.4%
                                            </Text>
                                        </Layout.Content>
                                    </Col>
                                </Row>

                                <ShadcnCard className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Tabs defaultActiveKey="1" type="card" className="ant-tabs-custom">
                                            <Tabs.TabPane tab="Overview" key="1">
                                                <Row gutter={[16, 16]}>
                                                    <Col span={24}>
                                                        <div className="activity-card">
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
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Tabs.TabPane>

                                            <Tabs.TabPane tab="Courses" key="2">
                                                <Table
                                                    columns={courseColumns}
                                                    dataSource={courseData}
                                                    pagination={false}
                                                />
                                            </Tabs.TabPane>

                                            <Tabs.TabPane tab="Students" key="3">
                                                <Table
                                                    columns={studentColumns}
                                                    dataSource={studentData}
                                                    pagination={false}
                                                />
                                            </Tabs.TabPane>
                                        </Tabs>
                                    </CardContent>
                                </ShadcnCard>
                            </div>
                        </Tabs.TabPane>

                        <Tabs.TabPane tab="Course Management" key="courses-management">
                            <CourseManagement />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Layout>
        </div>
    );
};

export default AdminDashboard;
