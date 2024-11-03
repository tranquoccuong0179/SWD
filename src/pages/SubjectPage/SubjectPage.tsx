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
            console.log("SUBJECT:", res);

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
                                <img alt={subject?.title} src={subject?.image || 'https://img.freepik.com/free-vector/abstract-grunge-style-coming-soon-with-black-splatter_1017-26690.jpg'} className="subject-image mb-2" />
                                <Title level={4} className='mb-2'>{subject?.name}</Title>
                                <Paragraph ellipsis={{ rows: 2 }}>{subject?.description}</Paragraph>
                                {/* <div className="subject-details">
                                        <Text><BookOutlined /> {subject?.lessons} bài học</Text>
                                        <Text><UserOutlined /> {subject?.students?.toLocaleString()} học viên</Text>
                                    </div> */}
                                <div className="subject-button">
                                    <Link to={`/subject/${subject.id}`}>
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
