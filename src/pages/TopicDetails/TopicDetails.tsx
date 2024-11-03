import React from 'react';
import Header from '../../components/Header/Header';
import { Layout, Button, Card, Rate, Tag, Typography, Breadcrumb, Row, Col } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../LandingPage/LandingPage.css';

interface TopicDetails {
    id: number;
    chapterId: number;
    chapterName: string;
    problems: [];
    title: string;
    content: string;
    topicName: string;
}

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const TopicDetailsPage = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [topicDetails, setTopicDetails] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [content, setContent] = useState({})
    const [contentParameter, setContentParameter] = useState([])
    const { id } = useParams();//
    const [activeLesson, setActiveLesson] = React.useState(1)

    useEffect(() => {
        const fetchTopicDetails = async () => {
            try {
                // Lấy id từ URL và bỏ dấu ':' nếu có
                if (!id) {
                    setError('Missing subject ID');
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/problems`);

                console.log("API Response:", response.data);
                console.log("TopicId:", id);
                const transformedTopicDetails = response.data.data.items
                    .map((topicDetails: any) => ({
                        id: topicDetails.id,
                        topicId: topicDetails.topicId,
                        topicName: topicDetails.topicName,
                        description: topicDetails.description,
                        name: topicDetails.name,
                    }))
                    .filter(topicDetails => topicDetails.topicId === id);//

                setTopicDetails(transformedTopicDetails);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching topic details:', err);
                setError('Failed to load topic details');
                setLoading(false);
            }
        };
        const fetchParameters = async () => {
            try {
                // Lấy id từ URL và bỏ dấu ':' nếu có
                if (!id) {
                    setError('Missing subject ID');
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/parameter`);
                console.log("API Response2:", response.data);
                console.log("TopicId:", id);
                const transformedParameters = response.data.data.items
                    .map((Parameters: any) => ({
                        id: Parameters.id,
                        name: Parameters.name,
                        unit: Parameters.unit,
                        symbol: Parameters.symbol,
                        topicId: Parameters.topicId,
                        topicName: Parameters.topicName,
                    }))
                    .filter(Parameters => Parameters.topicId === id);//
                setParameters(transformedParameters);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching parameters:', err);
                setError('Failed to load parameters');
                setLoading(false);
            }
        };
        fetchTopicDetails();
        fetchParameters();
    }, [id]); // Dependency array vẫn giữ id để khi URL thay đổi sẽ fetch lại
    console.log("sss", topicDetails);




    const handleChange = (e: any) => {
        setActiveLesson(e.id)
        setContent(e)
        const data = parameters?.filter((i) => i?.topicId === id)
        setContentParameter(data)
        console.log("ds", data);

    }
    console.log("ssd", contentParameter);

    return (
        <Layout className="landing-page">
            <Header />
            <div className="container mx-auto px-4 p-24">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item ><Link to={"/home"}>Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={"/subject"}>Môn học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={"/chapter"}>Chương</Link></Breadcrumb.Item>
                    <Breadcrumb.Item ><Link to={"/topic"}>Bài học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item >{topicDetails[0]?.topicName}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col md={4}><Title level={3}>Bài toán:</Title></Col>
                    <Col md={20}><Title level={2}>Bài: {topicDetails[0]?.topicName}</Title></Col>
                </Row>
                {/* PROBLEMS COL*/}
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/12 pr-4">
                        <nav>
                            {topicDetails.map((e) => (
                                <button
                                    key={e.id}
                                    onClick={() => handleChange(e)}
                                    className={`w-full text-left p-2 mb-2 rounded ${activeLesson === e.id
                                        ? 'bg-green-500 text-white'
                                        : 'bg-green-100 text-gray-800 hover:bg-green-200'
                                        }`}>
                                    {e?.name}
                                </button>
                            ))}
                        </nav>
                        <div className="bg-gray-50 rounded-lg shadow-sm p-3 min-h-[180px] border border-gray-200">
                        <div className="parameter-content text-left p-1 text-black font-bold mb-2">
                                    Các tham số: {contentParameter?.map((e) => {
                                    return <p>{e?.name} {e?.symbol} ({e?.unit})</p>
                                })}</div>
                        </div>
                    </div>
                    <div className="md:w-10/12">
                        {/* TOPIC CONTENTS */}
                        <div className="bg-gray-50 rounded-lg shadow-sm p-3 min-h-[500px] border border-gray-200 ml-2 mr-2">
                            <div className="prose max-w-none">
                                {/* PROBLEM DESCRIPTION */}
                                <div className="problem-description text-left p-3 bg-green-100 text-black font-bold rounded-md mb-2">Bài toán: {content?.description}</div>
                                {/* PARAMETER */}
                                <div className="parameter-content text-left p-1 text-black font-bold mb-2">
                                    {contentParameter?.map((e) => {
                                    return <p>{e?.name} {e?.symbol} ({e?.unit})</p>
                                })}</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default TopicDetailsPage;