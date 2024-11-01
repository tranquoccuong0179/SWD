import { Layout, Button, Card, Tag, Typography, Breadcrumb } from 'antd';
import { BookOutlined, UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ChapterPage.css';
import Footer from "../../components/Footer/Footer.tsx";
import Header from "../../components/Header/Header.tsx";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios'; // Make sure to install axios if not already installed

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// Define an interface for the Chapter structure
interface Chapter {
    id: number;
    title: string;
    description: string;
    image: string;
    lessons: number;
    students: number;
}

const ChapterPage = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get(`https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/subjects/${id}/chapters`);

                // Transform the data to match your existing structure
                const transformedChapters = response.data.map((chapter: any) => ({
                    id: chapter.id,
                    title: chapter.title,
                    description: chapter.description,
                    image: chapter.imageUrl || 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg',
                    lessons: chapter.lessonCount || 0,
                    students: chapter.studentCount || 0,
                    link: `topic/${chapter.id}` // Adjust link generation as needed
                }));

                setChapters(transformedChapters);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching chapters:', err);
                setError('Failed to load chapters');
                setLoading(false);
            }
        };

        if (id) {
            fetchChapters();
        }
    }, [id]);

    const scrollLeft = () => {
        listRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        listRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <Layout className="chapter-page">
                <Header />
                <Content className="content">
                    <Title level={2}>Loading Chapters...</Title>
                </Content>
                <Footer />
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout className="chapter-page">
                <Header />
                <Content className="content">
                    <Title level={2}>Error: {error}</Title>
                </Content>
                <Footer />
            </Layout>
        );
    }

    return (
        <Layout className="chapter-page">
            <Header />

            <Content className="content">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item><Link to="/home">Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/subject">Môn học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Chương</Breadcrumb.Item>
                </Breadcrumb>

                <Title level={1}>Khám phá các chương của môn Vật Lý</Title>
                <Paragraph>
                    Hãy chọn chương mà bạn muốn học nhé.
                </Paragraph>
                <div className="course-filters">
                    <Tag color="blue">Tất cả</Tag>
                    <Tag>Cơ học</Tag>
                    <Tag>Điện từ học</Tag>
                    <Tag>Nhiệt học</Tag>
                    <Tag>Quang học</Tag>
                </div>

                <div className="chapter-container">
                    <Button className="scroll-button left" icon={<LeftOutlined />} onClick={scrollLeft} />
                    <div className="subject-list" ref={listRef}>
                        {chapters.map(chapter => (
                            <Card key={chapter.id} hoverable className="subject-card">
                                <img
                                    alt={chapter.title}
                                    src={chapter.image}
                                    className="subject-image mb-2"
                                    onError={(e) => {
                                        const imgElement = e.target as HTMLImageElement;
                                        imgElement.src = 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg';
                                    }}
                                />
                                <Title level={4} className='mb-2'>{chapter.title}</Title>
                                <Paragraph ellipsis={{ rows: 2 }}>{chapter.description}</Paragraph>
                                <div className="subject-details">
                                    <Text><BookOutlined /> {chapter.lessons} bài học</Text>
                                    <Text><UserOutlined /> {chapter.students.toLocaleString()} học viên</Text>
                                </div>
                                <div className="subject-button">
                                    <Link to={`/${chapter.link}`}>
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

export default ChapterPage;