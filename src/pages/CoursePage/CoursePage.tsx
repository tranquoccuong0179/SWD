import { Layout, Button, Card, Rate, Tag, Typography, Breadcrumb } from 'antd';
import { ClockCircleOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import './CoursePage.css';
import Footer from "../../components/Footer.tsx"
import Header from "../../components/Header";


const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const CoursePage = () => {
    const courses = [
        { id: 1, title: 'Con lắc lò xo', description: 'Động con lắc lò xo để nghiên cứu dao động điều hòa và năng lượng học trong vật lý động lực học', image: '/con-lac-lo-xo.png', price: 17.84, rating: 4.3, reviews: 18321, duration: '2 giờ 30 phút', lessons: 12, students: 1500 },
        { id: 2, title: 'Con lắc đơn', description: 'Vở con lắc đơn, thành phần lực tác động và động học của vật', image: '/con-lac-don.png', price: 8.99, rating: 3.9, reviews: 8321, duration: '1 giờ 45 phút', lessons: 8, students: 1200 },
        { id: 3, title: 'Dao động điều hòa', description: 'Dao động điều hòa được dùng trong đời sống và các hiện tượng vật lý để mô tả các chuyển động ...', image: '/dao-dong-dieu-hoa.png', price: 11.70, rating: 4.2, reviews: 1231, duration: '3 giờ', lessons: 15, students: 1800 },
    ];

    return (
        <Layout className="course-page">
            <Header />

            <Content className="content">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item>Bài học</Breadcrumb.Item>
                </Breadcrumb>

                <Title level={1}>Khám phá các khóa học Vật lý</Title>
                <Paragraph>
                    Tìm hiểu về các khái niệm vật lý phức tạp thông qua các bài giảng tương tác và mô phỏng trực quan.
                </Paragraph>

                <div className="course-filters">
                    <Tag color="blue">Tất cả</Tag>
                    <Tag>Cơ học</Tag>
                    <Tag>Điện từ học</Tag>
                    <Tag>Nhiệt học</Tag>
                    <Tag>Quang học</Tag>
                </div>

                <div className="course-list">
                    {courses.map(course => (
                        <Card key={course.id} hoverable className="course-card">
                            <img alt={course.title} src={course.image} className="course-image" />
                            <Title level={4}>{course.title}</Title>
                            <Paragraph ellipsis={{ rows: 2 }}>{course.description}</Paragraph>
                            <div className="course-meta">
                                <Rate disabled defaultValue={course.rating} />
                                <Text className="review-count">({course.reviews.toLocaleString()})</Text>
                            </div>
                            <div className="course-details">
                                <Text><ClockCircleOutlined /> {course.duration}</Text>
                                <Text><BookOutlined /> {course.lessons} bài học</Text>
                                <Text><UserOutlined /> {course.students.toLocaleString()} học viên</Text>
                            </div>
                            <div className="course-price">
                                <Text strong>${course.price.toFixed(2)}</Text>
                                <Button type="primary">Đăng ký ngay</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Content>
            <Footer />
        </Layout>
    );
};

export default CoursePage;