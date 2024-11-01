import { Layout, Button, Card, Typography, Breadcrumb } from 'antd';
import { BookOutlined, UserOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './SubjectPage.css';
import Footer from "../../components/Footer/Footer.tsx";
import Header from "../../components/Header/Header.tsx";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { subjectService } from '../../services/subjectServices.ts';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// const subjects = [
//     { id: 1, title: 'Toán học', description: 'Khám phá các khái niệm cơ bản và nâng cao trong toán học.', image: 'https://ischool.vn/wp-content/uploads/2023/07/phuong-phap-hoc-toan-hieu-qua-thumb.jpeg', lessons: 20, students: 5000, link: 'comingsoon' },
//     { id: 2, title: 'Vật lý', description: 'Hiểu các nguyên lý và ứng dụng trong đời sống thực tiễn.', image: 'https://genk.mediacdn.vn/zoom/700_438/2016/20-nha-khoa-hoc-noi-tieng-the-gioi-0-1476195757480.jpg', lessons: 15, students: 4200, link: 'Chapter' },
//     { id: 3, title: 'Hóa học', description: 'Tìm hiểu về các phản ứng và cấu tạo của chất.', image: 'https://lh6.googleusercontent.com/proxy/EKOc9XdfZM5EMx0f7OO-B9pxVBnHIhRHReYi1ncXWYyyEYO9cr0nq4-SLqrpKfYGoZY6NSUX_BTDLiThBS9ixjYnRTMEEtODWRXvZUpGWDE5mMQjDIGIIU4fwIxP', lessons: 18, students: 3500, link: 'comingsoon' },
//     { id: 4, title: 'Sinh học', description: 'Khám phá cấu trúc và chức năng của các hệ sinh học trong cơ thể.', image: 'https://duhocinec.com/wp-content/uploads/2020/03/Sinh-hoc-PSB-1.jpg', lessons: 14, students: 3000, link: 'comingsoon' },
//     { id: 5, title: 'Coming Soon', description: 'Môn học đang được phát triển, hãy đợi nhé.', image: 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg', lessons: '??', students: '??', link: 'comingsoon' },
// ];

const SubjectPage = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const [subject, setSubject] = useState([])
    const scrollLeft = () => {
        listRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        listRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
    };
    useEffect(() => {
        subjectService.getSubject(page, size, null, null).then((res) => {
            console.log("s", res);
            
            setSubject(res?.data?.data?.items)
        })
    }, [])
    return (
        <Layout className="subject-page">
            <Header />

            <Content className="content">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item><Link to="/home">Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Môn học</Breadcrumb.Item>
                </Breadcrumb>

                <Title level={1}>Khám phá các môn học của chúng tôi</Title>
                <Paragraph>
                    Tìm hiểu về các môn học đa dạng qua các bài giảng và nội dung tương tác.
                </Paragraph>

                <div className="subject-container">
                    <Button className="scroll-button left" icon={<LeftOutlined />} onClick={scrollLeft} />
                    <div className="subject-list" ref={listRef}>
                        {subject.map(subject => (
                            <Card key={subject?.id} hoverable className="subject-card">
                                <img alt={subject?.name} src={subject?.image} className="subject-image mb-2" />
                                <Title level={4} className='mb-2'>{subject?.title}</Title>
                                <Paragraph ellipsis={{ rows: 2 }}>{subject?.description}</Paragraph>
                                <div className="subject-details">
                                    <Text><BookOutlined /> {subject?.lessons} bài học</Text>
                                    <Text><UserOutlined /> {subject?.students?.toLocaleString()} học viên</Text>
                                </div>
                                <div className="subject-button">
                                    <Link to={`/Subject/${subject?.id}`}>
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

export default SubjectPage;
