import React from 'react';
import Header from '../../components/Header/Header';
import { Layout, Button, Breadcrumb, Typography, Input, message } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Footer from "../../components/Footer/Footer.tsx";
import '../LandingPage/LandingPage.css';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const TopicDetailsPage = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [topicDetails, setTopicDetails] = useState([]);
    const [parameters, setParameters] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [content, setContent] = useState({});
    const [contentParameter, setContentParameter] = useState([]);
    const { id } = useParams();
    const [activeLesson, setActiveLesson] = useState(1);
    const [inputValues, setInputValues] = useState({});
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Quay về trang trước
    };
    const handleGoBack2 = () => {
        navigate(-2); // Quay về trang trước
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (/^\d*\.?\d*$/.test(value)) { // chỉ cho phép số hoặc chuỗi rỗng
            setInputValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
    };
    // const [selectedParameters, setSelectedParameters] = useState([
    //     { parameterId: '', value: 0 },
    //     { parameterId: '', value: 0 }
    // ]);

    const [problemId, setProblemId] = useState(''); // Thêm problemId
    const token = localStorage.getItem('accessToken');
    // console.log("Token exist?:", !!token);
    // console.log("Token value:", token);

    const headers = { 
        'accept': '*/*',
        'Authorization': `Bearer ${token}`,
    };
    useEffect(() => {
        const fetchTopicDetails = async () => {
            try {
                if (!id) {
                    setError('Missing subject ID');
                    setLoading(false);
                    return;
                }
                console.log("Request Headers:", headers);

                const response = await axios.get(
                    `https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/problems`,
                    { headers }
                );
                const transformedTopicDetails = response.data.data.items
                    .filter(topic => topic.topicId === id);
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
                if (!id) {
                    setError('Missing subject ID');
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/parameter`);
                const transformedParameters = response.data.data.items
                    .filter(parameter => parameter.topicId === id);
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
    }, [id]);

    const handleChange = (e) => {
        setActiveLesson(e.id);
        setContent(e);
        setProblemId(e.id);
        const data = parameters.filter((i) => i.topicId === id);
        setContentParameter(data);
    };
    console.log("Input:", inputValues);

    // const handleSubmit = async () => {
    //     // let dataMap= content?.getPPVM
    //     const mappedData = content?.getPPVM.map((item) => ({
    //         parameterId: item.parameterId,
    //         value: inputValues[item.symbol] ? parseInt(inputValues[item.symbol]) : item.value
    //     }));
    //     // Bắt trường hợp
    //     message.success("Gửi tham số thành công!")
    //     let data = {
    //         problemId: problemId,
    //         postPPVMs: mappedData
    //     }
    //     try {
    //         const response = await axios.post(
    //             `https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/problems/purchaseProblem`,
    //             data,
    //             { headers }
    //         );


    //         if (response.status === 200) {
    //             console.log('Response from API:', response.data);
    //             // Xử lý phản hồi từ API ở đây
    //         }
    //     } catch (error) {
    //         console.error('Error sending data:', error);
    //     }
    // };


    // const handleSubmit = async () => {
    //     const mappedData = content?.getPPVM.map((item) => ({
    //         parameterId: item.parameterId,
    //         value: inputValues[item.symbol] ? parseInt(inputValues[item.symbol]) : item.value,
    //     }));

    //     let data = {
    //         problemId: problemId,
    //         postPPVMs: mappedData,
    //     };

    //     try {
    //         const response = await axios.post(
    //             `https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/problems/purchaseProblem`,
    //             data,
    //             { headers }
    //         );

    //         if (response.status === 200) {
    //             console.log('Response from API:', response.data);
    //             message.success("Gửi tham số thành công!");
    //             // Xử lý phản hồi từ API ở đây
    //         } else {
    //             message.error("Có lỗi xảy ra khi gửi tham số");
    //         }
    //     } catch (error) {
    //         console.error('Error sending data:', error);
    //         message.error("Có lỗi xảy ra khi gửi tham số");
    //     }
    // };

    const handleSubmit = async () => {
        if (!problemId) {
            message.error("Thiếu problemId. Vui lòng kiểm tra lại.");
            return;
        }
    
        const mappedData = content?.getPPVM?.map((item) => ({
            parameterId: item.parameterId,
            value: inputValues[item.symbol] ? parseInt(inputValues[item.symbol]) : item.value,
        }));
    
        const data = {
            problemId: problemId,
            postPPVMs: mappedData,
        };
    
        console.log("Data gửi lên:", data);
    
        try {
            const response = await axios.post(
                `https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api/problems/purchaseProblem`,
                data,
                { headers }
            );
    
            if (response.status === 200) {
                console.log('Response từ API:', response.data);
                message.success(response.data.data);
            } else {
                message.error("Có lỗi xảy ra khi gửi tham số");
            }
        } catch (error) {
            console.error('Error gửi dữ liệu:', error);
            console.log("Chi tiết lỗi:", error.response);
            message.error("Có lỗi xảy ra khi gửi tham số");
        }
    };
    
    return (
        <Layout className="landing-page">
            <Header />
            <div className="container mx-auto px-4 p-24">
                <Breadcrumb className="breadcrumb">
                    <Breadcrumb.Item><Link to={"/home"}>Trang chủ</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to={"/subject"}>Môn học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item onClick={handleGoBack2} style={{ cursor: 'pointer' }}><Link>Chương</Link></Breadcrumb.Item>
                    <Breadcrumb.Item onClick={handleGoBack} style={{ cursor: 'pointer' }}><Link>Bài học</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{topicDetails[0]?.topicName}</Breadcrumb.Item>
                </Breadcrumb>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/12 p-2 font-semibold text-2xl mb-2">Bài toán:</div>
                    <div className="md:w-10/12 p-2 font-bold text-3xl mb-2">Bài: {topicDetails[0]?.topicName}</div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/12">
                        <nav>
                            {topicDetails.map((e) => (
                                <button
                                    key={e.id}
                                    onClick={() => handleChange(e)}
                                    className={`w-full text-left text-base p-2 mb-2 rounded text-center ${activeLesson === e.id ? 'bg-blue-500 text-white' : 'bg-blue-100 text-gray-800 hover:bg-blue-200'}`}>
                                    {e?.name}
                                </button>
                            ))}
                        </nav>
                        <div className="p-2 font-semibold text-xl mt-2 mb-2">Các tham số:</div>
                        <div className="bg-gray-50 rounded-lg shadow-sm p-3 min-h-[100px] border border-gray-200">
                            <div className="parameter-content text-left text-base text-center p-1 text-black font-medium">
                                {contentParameter?.map((e) => {
                                    return <p key={e.id}>{e?.name} {e?.symbol} ({e?.unit})</p>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-10/12">
                        <div className="bg-gray-50 rounded-lg shadow-sm p-4 min-h-[500px] border border-gray-200 ml-10 mr-10">
                            <div className="prose max-w-none">
                                <div className="problem-description text-left p-4 bg-blue-100 text-black text-lg font-bold rounded-md">
                                    Bài toán: {content?.description}
                                </div>
                                <div className="input-question text-left p-4 text-black text-lg font-medium mb-2">
                                    Nhập các tham số để tính toán:
                                    {/* <p>Giả sử g = 10  m/s^2</p> */}
                                </div>
                                {/* <div className="parameter-inputs">
                                        <div className="mb-6">
                                            <label className="block text-left text-base font-medium text-black mb-2" htmlFor="input1">Tham số 1:</label>
                                            <div className="flex items-center space-x-2">
                                                <select
                                                    id="type1"
                                                    className="p-2 text-base text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300 bg-blue-100"
                                                    onChange={(e) => handleSelectChange(0, e.target.value)}
                                                >
                                                    {contentParameter?.map((e) => (
                                                        <option key={e.id} value={e.id}>
                                                            {e?.name} {e?.symbol} ({e?.unit})
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    id="input1"
                                                    type="number"
                                                    className="block w-full p-2 text-base text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300 bg-blue-100"
                                                    placeholder="Nhập tham số 1"
                                                    onChange={(e) => handleInputChange(0, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-left text-base font-medium text-black mb-2" htmlFor="input2">Tham số 2:</label>
                                            <div className="flex items-center space-x-2">
                                                <select
                                                    id="type2"
                                                    className="p-2 text-base text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300 bg-blue-100"
                                                    onChange={(e) => handleSelectChange(1, e.target.value)}
                                                >
                                                    {contentParameter?.map((e) => (
                                                        <option key={e.id} value={e.id}>
                                                            {e?.name} {e?.symbol} ({e?.unit})
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    id="input2"
                                                    type="number"
                                                    className="block w-full p-2 text-base text-black border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300 bg-blue-100"
                                                    placeholder="Nhập tham số 2"
                                                    onChange={(e) => handleInputChange(1, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <Button type="primary w-40 h-10 text-lg font-semibold p-3" onClick={handleSubmit}>Gửi</Button>
                                    </div> */}
                                <div>
                                    {content?.getPPVM?.map((e) => {
                                        return (<>
                                            <div className='input-param-name text-left text-black text-lg font-normal mb-3'>Nhập {e?.symbol}</div>
                                            <div className='input-form mb-3'><Input name={e?.symbol} value={inputValues[e.symbol] || ""}
                                                onChange={handleInputChange} placeholder={`Nhập ${e.symbol}`} /></div>

                                        </>)
                                    })}
                                    <Button type="primary" size="large" onClick={handleSubmit}>Gửi tham số</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Layout>
    );
};
export default TopicDetailsPage;