import { Layout, Button, Card, Tag, Typography, Breadcrumb } from 'antd';
import { BookOutlined, UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ChapterPage.css';
import Footer from "../../components/Footer/Footer.tsx";
import Header from "../../components/Header/Header.tsx";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TempPic from "../../assets/pic1.jpg"

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

interface Chapter {
    id: number;
    title: string;
    description: string;
    image: string;
    lessons: number;
    students: number;
    subjectId: number; //
}

const ChapterPage = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const { id } = useParams();
    const { id } = useParams();//
    // const subjectId = id ? parseInt(id.replace(':', '')) : null;

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                // Lấy id từ URL và bỏ dấu ':' nếu có
                if (!id) {
                    setError('Missing subject ID');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/chapters`);

                console.log("API Response:", response.data);

                // Transform và filter chapters theo subjectId
                const transformedChapters = response.data.data.items
                    .map((chapter: any) => ({
                        id: chapter.id,
                        name: chapter.name,
                        title: chapter.title,
                        description: chapter.description,
                        image: chapter.imageUrl || TempPic,
                        lessons: chapter.lessonCount || 0,
                        students: chapter.studentCount || 0,
                        subjectId: chapter.subjectId,
                        subjectName: chapter.subjectName,
                        // link: `topic/${chapter.id}`
                    }))
                    .filter(chapter => chapter.subjectId === id);//

                setChapters(transformedChapters);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching chapters:', err);
                setError('Failed to load chapters');
                setLoading(false);
            }
        };

        fetchChapters();
    }, [id]); // Dependency array vẫn giữ id để khi URL thay đổi sẽ fetch lại

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

                <Title level={1}>Khám phá các chương của môn {chapters[0]?.subjectName}</Title>
                <Paragraph>
                    Hãy chọn chương mà bạn muốn học nhé.
                </Paragraph>
                <div className="course-filters mb-4">
                    {/* <Tag color="blue">Tất cả</Tag> */}
                    <Tag>Cơ học</Tag>
                    <Tag>Điện từ học</Tag>
                    <Tag>Nhiệt học</Tag>
                    <Tag>Quang học</Tag>
                </div>

                <div className="chapter-container">
                    <Button className="scroll-button left" icon={<LeftOutlined />} onClick={scrollLeft} />
                    <div className="chapter-list" ref={listRef}>
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
                                <Title level={4} className='mb-2'>{chapter.name}</Title>
                                <Paragraph ellipsis={{ rows: 2 }}>{chapter.description}</Paragraph>
                                {/* <div className="chapter-details">
                                    <Text><BookOutlined /> {chapter.lessons} bài học</Text>
                                    <Text><UserOutlined /> {chapter.students.toLocaleString()} học viên</Text>
                                </div> */}
                                <div className="chapter-button">
                                    <Link to={`/chapter/${chapter.id}`}>
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