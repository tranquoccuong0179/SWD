import { Layout, Button, Card, Rate, Tag, Typography, Breadcrumb } from 'antd';
import { ClockCircleOutlined, BookOutlined, UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './TopicPage.css';
import Footer from "../../components/Footer/Footer.tsx"
import Header from "../../components/Header/Header.tsx";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import TempPic from "../../assets/pic1.jpg"

interface Topic {
    id: number;
    name: string;
    description: string;
    image: string;
    lessons: number;
    students: number;
    chapterId: number; //
}

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const TopicPage = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const { id } = useParams();
    const { id } = useParams();//
    // const subjectId = id ? parseInt(id.replace(':', '')) : null;
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Quay về trang trước
    };
    useEffect(() => {
        const fetchTopics = async () => {
            try {
                // Lấy id từ URL và bỏ dấu ':' nếu có
                if (!id) {
                    setError('Missing subject ID');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api/topics`);

                console.log("API Response:", response.data);
                console.log("ChapterId:", id);
                const transformedTopics = response.data.data.items
                    .map((topic: any) => ({
                        id: topic.id,
                        name: topic.name,
                        description: topic.description,
                        image: topic.imageUrl || TempPic,
                        lessons: topic.lessonCount || 0,
                        students: topic.studentCount || 0,
                        chapterId: topic.chapterId,
                        chapterName: topic.chapterName,
                        // link: `topic/${chapter.id}`
                    }))
                    .filter(topic => topic.chapterId === id);//

                setTopics(transformedTopics);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching topics:', err);
                setError('Failed to load topics');
                setLoading(false);
            }
        };

        fetchTopics();
    }, [id]); // Dependency array vẫn giữ id để khi URL thay đổi sẽ fetch lại

    const scrollLeft = () => {
        listRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        listRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <Layout className="topic-page">
                <Header />
                <Content className="content">
                    <Title level={2}>Loading Topics...</Title>
                </Content>
                <Footer />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout className="topic-page">
                <Header />
                <Content className="content">
                    <Title level={2}>Error: {error}</Title>
                </Content>
                <Footer />
            </Layout>
        );
    }

    return (
        <Layout className="topic-page">
            <Header />

            <Content className="content">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item><Link to={"/home"}>Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/subject"}>Môn học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item onClick={handleGoBack} style={{ cursor: 'pointer' }}><Link>Chương</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Bài học</Breadcrumb.Item>
                </Breadcrumb>

                <Title level={1}>{topics[0]?.chapterName}</Title>
                <Paragraph>
                    Giới thiệu các khái niệm và phương trình cơ bản về dao động điều hòa, con lắc, giúp hiểu rõ hơn về chuyển động lặp lại trong tự nhiên.
                </Paragraph>
                <div className="course-filters mb-4">
                    {/* <Tag color="blue">Tất cả</Tag> */}
                    <Tag>Dao động điều hòa</Tag>
                    <Tag>Con lắc lò xo</Tag>
                    <Tag>Con lắc đơn</Tag>
                    <Tag>Dao động cưỡng bức - Dao động tắt dần</Tag>
                </div>

                <div className="topic-container">
                    <Button className="scroll-button left" icon={<LeftOutlined />} onClick={scrollLeft} />
                    <div className="topic-list" ref={listRef}>
                        {topics.map(topic => (
                            <Card key={topic.id} hoverable className="subject-card">
                                <img
                                    alt={topic.name}
                                    src={topic.image}
                                    className="subject-image mb-2"
                                    onError={(e) => {
                                        const imgElement = e.target as HTMLImageElement;
                                        imgElement.src = 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg';
                                    }}
                                />
                                <Title level={4} className='mb-2'>{topic.name}</Title>
                                <Paragraph ellipsis={{ rows: 2 }}>{topic.description}</Paragraph>
                                {/* <div className="topic-details">
                                    <Text><BookOutlined /> {topic.lessons} bài học</Text>
                                    <Text><UserOutlined /> {topic.students.toLocaleString()} học viên</Text>
                                </div> */}
                                <div className="topic-button">
                                    <Link to={`/topic/${topic.id}`}>
                                        <Button type="primary">Khám phá ngay</Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <Button className="scroll-button right" icon={<RightOutlined />} onClick={scrollRight} />
                </div>
            </Content>
            <Footer />
        </Layout>
    );
};

export default TopicPage;