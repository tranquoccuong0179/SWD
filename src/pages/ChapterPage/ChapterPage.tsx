import { Layout, Button, Card, Typography, Breadcrumb } from 'antd';
import { BookOutlined, UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './ChapterPage.css';
import Footer from "../../components/Footer/Footer.tsx";
import Header from "../../components/Header";
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const chapters = [
    { id: 1, title: 'Chương 1: Dao Động Cơ', description: 'Giới thiệu các khái niệm và phương trình cơ bản về dao động điều hòa, con lắc, giúp hiểu rõ hơn về chuyển động lặp lại trong tự nhiên.', image: 'https://btec.fpt.edu.vn/wp-content/uploads/2024/01/dao-dong-co-hoc-la-gi.jpg.webp', lessons: 41, students: 5000, link: 'NewCourse' },
    { id: 2, title: 'Chương 2: Sóng Cơ và Sóng Âm', description: 'Chương đang được phát triển, hãy đợi nhé.', image: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg', lessons: '??', students: '??', link: 'comingsoon' },
    { id: 3, title: 'Chương 3: Dòng Điện Xoay Chiều', description: 'Chương đang được phát triển, hãy đợi nhé.', image: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg', lessons: '??', students: '??', link: 'comingsoon' },
    { id: 4, title: 'Chương 4: Dao Động và Sóng Điện Từ', description: 'Chương đang được phát triển, hãy đợi nhé.', image: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg', lessons: '??', students: '??', link: 'comingsoon' },
    { id: 5, title: 'Coming Soon', description: 'Chương đang được phát triển, hãy đợi nhé.', image: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg', lessons: '??', students: '??', link: 'comingsoon'  },
];

const ChapterPage = () => {
    const listRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        listRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        listRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <Layout className="chapter-page">
            <Header />

            <Content className="content">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item href="/home">Trang chủ</Breadcrumb.Item>
                    <Breadcrumb.Item href="/subject">Môn học</Breadcrumb.Item>
                    <Breadcrumb.Item>Chương</Breadcrumb.Item>
                </Breadcrumb>

                <Title level={1}>Khám phá các chương của môn Vật Lý</Title>
                <Paragraph>
                    Hãy chọn chương mà bạn muốn học nhé.
                </Paragraph>

                <div className="chapter-container">
                    <Button className="scroll-button left" icon={<LeftOutlined />} onClick={scrollLeft} />
                    <div className="subject-list" ref={listRef}>
                        {chapters.map(chapter => (
                            <Card key={chapter.id} hoverable className="subject-card">
                                <img alt={chapter.title} src={chapter.image} className="subject-image mb-2" />
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
