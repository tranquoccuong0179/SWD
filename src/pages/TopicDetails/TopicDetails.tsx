import { Layout, Breadcrumb, Row, Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import '../LandingPage/LandingPage.css';
import Title from 'antd/es/typography/Title';
interface Lesson {
    id: number;
    title: string;
    content: string;
}

const lessons: Lesson[] = [
    { id: 1, title: "CON LẮC LÒ XO", content: 'coming soon' },
    { id: 2, title: "CON LẮC ĐƠN", content: 'coming soon' },
    { id: 3, title: "Coming Soon", content: 'coming soon' },
    { id: 4, title: "Coming Soon", content: 'coming soon' },
    { id: 5, title: "Coming Soon", content: 'coming soon' },
    { id: 6, title: "Coming Soon", content: 'coming soon' },
    { id: 7, title: "Coming Soon", content: 'coming soon' },
    { id: 8, title: "Coming Soon", content: 'coming soon' },
    { id: 9, title: "Coming Soon", content: 'coming soon' },
    { id: 10, title: "Coming Soon", content: 'coming soon' },
];

const ChapterContent: React.FC = () => {
    const [activeLesson, setActiveLesson] = React.useState(1);

    return (
        <Layout className="landing-page">
            <Header />
            <div className="container mx-auto px-4 p-24">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item ><Link to={"/home"}>Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={"/subject"}>Môn học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={"/chapter"}>Chương</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={"/topic"}>Bài học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item >{lessons.find(l => l.id === activeLesson)?.title}</Breadcrumb.Item>
                </Breadcrumb>
                {/* <p className='text-3xl font-bold'>CHƯƠNG</p> */}
                <Row>
                    <Col md={4}><Title level={3}>Bài toán:</Title></Col>
                    <Col md={20}><Title level={2}>  {lessons.find(l => l.id === activeLesson)?.title}</Title></Col>
                </Row>
                {/* PROBLEMS COL*/}
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/12 pr-4">
                        <nav>
                            {lessons.map((lesson) => (
                                <button
                                    key={lesson.id}
                                    onClick={() => setActiveLesson(lesson.id)}
                                    className={`w-full text-left p-2 mb-2 rounded ${activeLesson === lesson.id
                                        ? 'bg-green-500 text-white'
                                        : 'bg-green-100 text-gray-800 hover:bg-green-200'
                                        }`}>
                                    {lesson.title}
                                </button>
                            ))}
                        </nav>
                    </div>
                    <div className="md:w-10/12">
                        {/* TOPIC CONTENTS */}
                        <div className="bg-gray-50 rounded-lg shadow-sm p-6 min-h-[500px] border border-gray-200">
                            <div className="prose max-w-none">
                                {/* Actual lesson content will go here */}
                                {lessons.find(l => l.id === activeLesson)?.content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ChapterContent;