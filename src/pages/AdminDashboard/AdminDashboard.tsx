import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Divider, Layout, Typography, Table, Form, Input, Upload, Modal, message } from 'antd';
import { BookOutlined, ClockCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CheckCircle, AlertCircle, Layers, FileText, DollarSign } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './AdminDashboard.css';
import CRUDDialog from "@/components/CRUDDialog/CRUDDialog.tsx";


const { Title, Text } = Typography;

// Create axios instance with base configuration
const API_BASE_URL = 'https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api';

const AdminDashboard = () => {
    // State management
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [problems, setProblems] = useState([]);
    const [topics, setTopics] = useState([]);
    const [dashboardData, setDashboardData] = useState({
        totalUsers: 0,
        totalSuccessTransactions: 0,
        totalSolutions: 0,
        totalProblems: 0,
        totalSubjects: 0,
        totalChapters: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
    const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
    const [isAddProblemOpen, setIsAddProblemOpen] = useState(false);
    const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const [subjectForm, setSubjectForm] = useState({ Name: '', ImageLink: '' });
    const [chapterForm, setChapterForm] = useState({ subjectId: '', name: '', order: 1 });
    const [problemForm, setProblemForm] = useState({ chapterId: '', name: '', description: '' });
    const [topicForm, setTopicForm] = useState({ problemId: '', name: '', description: '' });
    const [activeTab, setActiveTab] = useState('overview');
    const [isOpen, setIsOpen] = useState(false)
    const [form] = Form.useForm();
    const [subjectOptions, setSubjectOptions] = useState([]);
const [chapterOptions, setChapterOptions] = useState([]);
    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('accessToken');
            console.log("Attempting to fetch dashboard data. Token:", token);

            if (!token) {
                setUnauthorized(true);
                setError('Authentication required');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/dashboard`, {
                    headers: {
                        accept: '*/*',
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.statusCode === 200 && response.data.code === "Success!") {
                    setDashboardData(response.data.data); // This will now include totalRevenue
                    await Promise.all([fetchSubjects(), fetchChapters(), fetchProblems(), fetchTopics()]);
                } else {
                    throw new Error('Failed to fetch dashboard data');
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    console.error("Axios error:", err);
                    if (err.response?.status === 401) {
                        setUnauthorized(true);
                        setError('Unauthorized access - Please log in again');
                    } else {
                        setError(err.response?.data?.message || 'An error occurred while fetching dashboard data');
                    }
                } else {
                    console.error("Non-Axios error:", err);
                    setError('An unexpected error occurred while fetching dashboard data');
                }
            } finally {
                setLoading(false);
                console.log("Dashboard data loading complete");
            }
        };
        fetchDashboardData();
    }, []);

    const apiRequest = async (method, url, data = null) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setUnauthorized(true);
            setError('Authentication required');
            return null;
        }

        try {
            const headers = {
                accept: '*/*',
                Authorization: `Bearer ${token}`,
            };

            // Don't set Content-Type for FormData, let browser set it automatically
            if (!(data instanceof FormData)) {
                headers['Content-Type'] = 'application/json';
            }

            const response = await axios({
                method,
                url: `${API_BASE_URL}${url}`,
                headers,
                data,
            });

            if (response.data.statusCode !== 200) {
                throw new Error('Failed to fetch data');
            }

            return response.data.data;
        } catch (err) {
            console.error('API error:', err);
            if (axios.isAxiosError(err) && err.response?.status === 401) {
                setUnauthorized(true);
                setError('Unauthorized access - Please log in again');
            } else {
                setError(err.response?.data?.message || 'An error occurred');
            }
            return null;
        }
    };

    // API Functions for Subjects
    const fetchSubjects = async () => {
        const data = await apiRequest('get', '/subjects');
        if (data) {
            setSubjects(data.items);
        }
    };

    const handleAddSubject = async () => {
        const data = new FormData();
        data.append('Name', subjectForm.Name);

        if (subjectForm.ImageLink && subjectForm.ImageLink[0]) {
            data.append('ImageLink', subjectForm.ImageLink[0]); // Chỉ lấy file đầu tiên
        }
        console.log("ss", subjectForm);

    };

    const handleUpdateSubject = async () => {
        try {
            const formData = new FormData();
            formData.append('id', subjectForm.id);
            formData.append('name', subjectForm.name);
            if (subjectForm.imageLink) {
                formData.append('imageLink', subjectForm.imageLink);
            }

            const response = await apiRequest('put', '/subjects', formData);
            if (response) {
                await fetchSubjects();
                setIsAddSubjectOpen(false);
                setSelectedSubject(null);
                setSubjectForm({ Name: '', ImageLink: '' });
            }
        } catch (err) {
            console.error('Error updating subject:', err);
        }
    };

    const handleDeleteSubject = async (subjectId) => {
        try {
            const response = await apiRequest('delete', `/subjects/${subjectId}`).then((res) => {
                fetchSubjects();
            });
            // if (response.data.statusCode === 200) {
            //     await fetchSubjects();
            // }
        } catch (err) {
            console.error('Error deleting subject:', err);
        }
    };

    // API Functions for Chapters
    const fetchChapters = async () => {
        const data = await apiRequest('get', '/chapters');
        if (data) {
            setChapters(data.items);
        }
    };

    const handleAddChapter = async () => {
        try {
            const response = await axios.post('/api/chapters', {
                subjectId: selectedSubjectId,
                name: form.getFieldValue('chapterName'),
            });
            message.success('Thêm chương thành công');
            setIsAddChapterOpen(false);
            form.resetFields();
            await fetchChapters(); // Cập nhật danh sách chương
        } catch (error) {
            console.error('Error adding chapter:', error);
            message.error('Thêm chương thất bại');
        }
    };

    const handleUpdateChapter = async () => {
        try {
            const response = await apiRequest('put', '/chapters', {
                ...chapterForm,
                subjectId: parseInt(chapterForm.subjectId),
            });
            if (response.data.statusCode === 200) {
                await fetchChapters();
                setIsAddChapterOpen(false);
                setSelectedChapter(null);
                setChapterForm({ subjectId: '', name: '', order: 1 });
            }
        } catch (err) {
            console.error('Error updating chapter:', err);
        }
    };

    const handleDeleteChapter = async (chapterId) => {
        try {
            const response = await apiRequest('delete', `/chapters/${chapterId}`);
            if (response.data.statusCode === 200) {
                await fetchChapters();
            }
        } catch (err) {
            console.error('Error deleting chapter:', err);
        }
    };

    const fetchProblems = async () => {
        const data = await apiRequest('get', '/problems');
        if (data) {
            setProblems(data.items);
        }
    };

    const handleAddProblem = async () => {
        try {
            const response = await apiRequest('post', '/problems', {
                ...problemForm,
                chapterId: parseInt(problemForm.chapterId),
            });
            if (response.data.statusCode === 200) {
                await fetchProblems();
                setIsAddProblemOpen(false);
                setProblemForm({ chapterId: '', name: '', description: '' });
            }
        } catch (err) {
            console.error('Error adding problem:', err);
        }
    };

    const handleUpdateProblem = async () => {
        try {
            const response = await apiRequest('put', '/problems', {
                ...problemForm,
                chapterId: parseInt(problemForm.chapterId),
            });
            if (response.data.statusCode === 200) {
                await fetchProblems();
                setIsAddProblemOpen(false);
                setSelectedProblem(null);
                setProblemForm({ chapterId: '', name: '', description: '' });
            }
        } catch (err) {
            console.error('Error updating problem:', err);
        }
    };

    const handleDeleteProblem = async (problemId) => {
        try {
            const response = await apiRequest('delete', `/problems/{id}`);
            if (response.data.statusCode === 200) {
                await fetchProblems();
            }
        } catch (err) {
            console.error('Error deleting problem:', err);
        }
    };

    const fetchTopics = async () => {
        const data = await apiRequest('get', '/topics');
        if (data) {
            setTopics(data.items);
        }
    };

    const handleAddTopic = async () => {
        try {
            const response = await axios.post('/api/topics', {
                chapterId: selectedChapterId,
                name: form.getFieldValue('topicName'),
            });
            message.success('Thêm bài học thành công');
            setIsAddTopicOpen(false);
            form.resetFields();
            await fetchTopics(); // Cập nhật danh sách bài học
        } catch (error) {
            console.error('Error adding topic:', error);
            message.error('Thêm bài học thất bại');
        }
    };

    const handleUpdateTopic = async () => {
        try {
            const response = await apiRequest('put', '/topics', {
                ...topicForm,
                problemId: parseInt(topicForm.problemId),
            });
            if (response.data.statusCode === 200) {
                await fetchTopics();
                setIsAddTopicOpen(false);
                setSelectedTopic(null);
                setTopicForm({ problemId: '', name: '', description: '' });
            }
        } catch (err) {
            console.error('Error updating topic:', err);
        }
    };

    const handleDeleteTopic = async (topicId) => {
        try {
            const response = await apiRequest('delete', `/topics/${topicId}`);
            if (response.data.statusCode === 200) {
                await fetchTopics();
            }
        } catch (err) {
            console.error('Error deleting topic:', err);
        }
    };

    const subjectFields = [
        {
            name: 'Name',
            label: 'Tên Môn Học',
            required: true,
            type: 'text'
        },
        // {
        //     name: 'price',
        //     label: 'Giá (VNĐ)',
        //     required: true,
        //     type: 'number',
        //     min: 0,
        //     description: 'Nhập giá không bao gồm dấu phẩy hoặc đơn vị tiền tệ'
        // }
        {
            name: 'ImageLink',
            label: 'Ảnh Môn Học',
            required: true,
            type: 'file',
            accept: 'image/*', // Chỉ cho phép upload file ảnh

        },
    ];

    // Field configurations for other sections

    const chapterFields = [
        {
            name: 'name',
            label: 'Tên Chương',
            required: true,
            type: 'text'
        },
        {
            name: 'subjectId',
            label: 'ID Môn Học',
            required: true,
            type: 'number',
            description: 'Chọn môn học cho chương này'
        },
        {
            name: 'order',
            label: 'Thứ tự',
            required: true,
            type: 'number',
            min: 1,
            description: 'Thứ tự hiển thị của chương'
        }
    ];

    const topicFields = [
        {
            name: 'name',
            label: 'Tên Bài Học',
            required: true,
            type: 'text'
        },
        {
            name: 'chapterId',
            label: 'ID Chương',
            required: true,
            type: 'number',
            description: 'Chọn chương cho bài học này'
        }
    ];

    const problemFields = [
        {
            name: 'name',
            label: 'Tên Bài Toán',
            required: true,
            type: 'text'
        },
        {
            name: 'topicId',
            label: 'ID Bài Học',
            required: true,
            type: 'number',
            description: 'Chọn bài học cho bài toán này'
        },
        {
            name: 'description',
            label: 'Mô Tả',
            required: true,
            type: 'textarea',
            description: 'Mô tả chi tiết về bài toán'
        }
    ];

    const stats = [
        {
            title: "Tổng số người dùng",
            value: dashboardData.totalUsers,
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Thanh toán thành công",
            value: dashboardData.totalSuccessTransactions,
            icon: CheckCircle,
            color: "text-green-600"
        },
        {
            title: "Tổng số lời giải",
            value: dashboardData.totalSolutions,
            icon: FileText,
            color: "text-purple-600"
        },
        {
            title: "Tổng số bài tập",
            value: dashboardData.totalProblems,
            icon: AlertCircle,
            color: "text-yellow-600"
        },
        {
            title: "Tổng số môn học",
            value: dashboardData.totalSubjects,
            icon: BookOutlined,
            color: "text-indigo-600"
        },
        {
            title: "Tổng số chương",
            value: dashboardData.totalChapters,
            icon: Layers,
            color: "text-pink-600"
        },
        {
            title: "Tổng doanh thu (VNĐ)", // Add this line for total revenue
            value: dashboardData.totalRevenue, // Use the new state value
            icon: DollarSign, // You can use an appropriate icon for revenue
            color: "text-green-800" // Choose a color for the revenue stat
        }
    ];

    if (unauthorized) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Authentication Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-red-500">
                        Please log in to access this content
                    </div>
                </CardContent>
            </Card>
        );
    }
    console.log("id", selectedSubject);
    
    const handleFinish = (values) => {
        const formData = new FormData();
        formData.append('Name', values.Name);
        formData.append('id', selectedSubject?.id);

        // Nếu có file ảnh, thêm nó vào FormData
        if (values.ImageLink && values.ImageLink[0]) {
            formData.append('ImageLink', values.ImageLink[0].originFileObj);
        }
        if (selectedSubject !== null) {
            axios.put(`https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api/subjects?id=${selectedSubject.id}`, formData)
                .then(async response => {
                    await fetchSubjects();
                    setIsOpen(false)
                    message.success("Update thành công")
                    console.log('Success:', response.data);
                    setSelectedSubject(null)
                    form.resetFields(); // Reset form sau khi submit
                    // Xử lý sau khi submit thành công
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            axios.post('https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api/subjects', formData)
                .then(async response => {
                    await fetchSubjects();
                    setIsOpen(false)
                    message.success("Thêm thành công")
                    console.log('Success:', response.data);
                    form.resetFields(); // Reset form sau khi submit
                    // Xử lý sau khi submit thành công
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        // Gửi formData tới server bằng axios


    };
    const onClose = () => {
        setIsOpen(false)
    }
    const haneleSetSubject = (object) => {
        const item = subjects?.find((e) => e?.id === object?.id);
        console.log("Selected item:", item);

        if (item) {
            // Kiểm tra xem có URL ảnh không
            const imageFile = item.image ? [{
                uid: item.id,          // Duy nhất, dùng id của subject
                name: 'image.jpg',     // Tên file có thể đặt theo ý
                status: 'done',        // Trạng thái là 'done' nếu ảnh đã có
                url: item.image,       // URL ảnh từ API
            }] : [];  // Nếu không có ảnh, để mảng rỗng

            console.log("Image file to set:", imageFile); // Kiểm tra mảng imageFile

            // Cập nhật giá trị vào form
            form.setFieldsValue({
                Name: item.name,      // Cập nhật tên môn học
                ImageLink: imageFile, // Cập nhật trường ImageLink
            });
        }
    };

    console.log("gh", subjects);

    return (
        <Layout className="landing-page mt-16">
            <Header />
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <div>
                        <Title level={2}>Dashboard</Title>
                        <Text type="secondary">Chào mừng trở lại, Admin</Text>
                    </div>
                    <div className="date-display">
                        <ClockCircleOutlined />
                        <Text type="secondary" style={{ marginLeft: '8px', marginRight: '1rem' }}>
                            {new Date().toLocaleDateString()}
                        </Text>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="flex space-x-2 mb-4">
                        <TabsTrigger
                            value="overview"
                            className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'
                                } hover:bg-blue-400`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Tổng Quan
                        </TabsTrigger>
                        <TabsTrigger
                            value="subjects"
                            className={`px-4 py-2 rounded-lg ${activeTab === 'subjects' ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'
                                } hover:bg-blue-400`}
                            onClick={() => setActiveTab('subjects')}
                        >
                            Môn Học
                        </TabsTrigger>
                        <TabsTrigger
                            value="chapters"
                            className={`px-4 py-2 rounded-lg ${activeTab === 'chapters' ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'
                                } hover:bg-blue-400`}
                            onClick={() => setActiveTab('chapters')}
                        >
                            Chương
                        </TabsTrigger>
                        <TabsTrigger
                            value="topics"
                            className={`px-4 py-2 rounded-lg ${activeTab === 'topics' ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'
                                } hover:bg-blue-400`}
                            onClick={() => setActiveTab('topics')}
                        >
                            Bài Học
                        </TabsTrigger>
                        <TabsTrigger
                            value="problems"
                            className={`px-4 py-2 rounded-lg ${activeTab === 'problems' ? 'bg-blue-500 text-black' : 'bg-gray-200 text-black'
                                } hover:bg-blue-400`}
                            onClick={() => setActiveTab('problems')}
                        >
                            Bài Tập
                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <Title level={2}>Tổng quan</Title>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="flex justify-center items-center min-h-[200px]">
                                        Loading dashboard data...
                                    </div>
                                ) : error ? (
                                    <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                                        Error loading dashboard: {error}
                                    </div>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {stats.map((stat, index) => (
                                            <Card key={index}>
                                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                                    <CardTitle className="text-sm font-medium">
                                                        {stat.title}
                                                    </CardTitle>
                                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold">{stat.value}</div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="subjects">
                        <Card>
                            <CardHeader>
                                <Title level={2}>Quản Lý Môn Học</Title>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => {
                                        // setSelectedSubject(null);
                                        // setSubjectForm({ Name: '', ImageLink: '' });
                                        // setIsAddSubjectOpen(true);
                                        setIsOpen(true)
                                    }}
                                    className="mb-4"
                                >
                                    Thêm Môn Học
                                </Button>
                                <div className="mt-4">
                                    {Array.isArray(subjects) && subjects.length > 0 ? (
                                        <Table
                                            dataSource={subjects}
                                            rowKey="id"
                                            columns={[
                                                {
                                                    title: 'Tên Môn Học',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                },
                                                // {
                                                //     title: 'Giá',
                                                //     dataIndex: 'price',
                                                //     key: 'price',
                                                //     render: (price) => new Intl.NumberFormat('vi-VN', {
                                                //         style: 'currency',
                                                //         currency: 'VND'
                                                //     }).format(price),
                                                // },
                                                {
                                                    title: 'Ảnh Môn Học',
                                                    dataIndex: 'image',
                                                    key: 'image',
                                                    render: (text) => (
                                                        <div style={{ textAlign: 'center' }}>
                                                            <img src={text} alt="Ảnh Môn Học" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                                        </div>
                                                    ),
                                                },
                                                {
                                                    title: 'Quản Lý',
                                                    key: 'actions',
                                                    render: (_, subject) => (
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                onClick={() => {
                                                                    haneleSetSubject(subject)
                                                                    setSelectedSubject(subject);
                                                                    // setSubjectForm({ name: subject.Name, image: subject.ImageLink });
                                                                    // setIsAddSubjectOpen(true);
                                                                    setIsOpen(true)
                                                                }}
                                                            >
                                                                Sửa
                                                            </Button>
                                                            <Button danger onClick={() => handleDeleteSubject(subject.id)}>
                                                                Xóa
                                                            </Button>
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                            pagination={false}
                                        />
                                    ) : (
                                        <div>No subjects available</div>
                                    )}
                                </div>
                                <Modal
                                    visible={isOpen}
                                    title="Thêm Môn Học"
                                    onCancel={onClose}
                                    footer={[
                                        <Button key="back" onClick={onClose}>
                                            Hủy
                                        </Button>,
                                        <Button
                                            key="submit"
                                            type="primary"
                                            loading={loading}
                                            onClick={() => form.submit()} // Kích hoạt submit form
                                        >
                                            Lưu
                                        </Button>,
                                    ]}
                                >
                                    <Form form={form} layout="vertical" onFinish={handleFinish}>
                                        <Form.Item
                                            name="Name"
                                            label="Tên Môn Học"
                                            rules={[{ required: true, message: 'Vui lòng nhập tên môn học' }]}
                                        >
                                            <Input placeholder="Nhập tên môn học" />
                                        </Form.Item>

                                        <Form.Item
                                            name="ImageLink"
                                            label="Ảnh Môn Học"
                                            valuePropName="fileList"  // Đảm bảo sử dụng fileList trong valuePropName
                                            getValueFromEvent={(e) => e?.fileList} // Lấy fileList khi thay đổi
                                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh môn học' }]}
                                        >
                                            <Upload
                                                name="file"
                                                listType="picture"
                                                beforeUpload={() => false}  // Ngừng việc upload ngay khi chọn ảnh (chỉ lưu cục bộ)
                                                defaultFileList={form.getFieldValue('ImageLink')}  // Sử dụng giá trị default từ form (dữ liệu đã có)
                                            >
                                                <Button icon={<UploadOutlined />}>Chọn Ảnh</Button>
                                            </Upload>
                                        </Form.Item>

                                    </Form>
                                </Modal>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="chapters">
                        <Card>
                            <CardHeader>
                                <Title level={2}>Quản Lý Chương</Title>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => setIsAddChapterOpen(true)}>Thêm Chương</Button>
                                <div className="mt-4">
                                    {Array.isArray(chapters) && chapters.length > 0 ? (
                                        <Table
                                            dataSource={chapters}
                                            rowKey="id"
                                            pagination={false}
                                            columns={[
                                                {
                                                    title: 'Tên Chương',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                },
                                                {
                                                    title: 'Môn Học',
                                                    dataIndex: 'subjectName',
                                                    key: 'subjectName',
                                                },
                                                {
                                                    title: 'Bài Học',
                                                    key: 'topics',
                                                    render: (_, chapter) => (
                                                        <ul>
                                                            {chapter.topics.map((topic) => (
                                                                <li key={topic.id}>{topic.name}</li>
                                                            ))}
                                                        </ul>
                                                    ),
                                                },
                                                {
                                                    title: 'Quản Lý',
                                                    key: 'actions',
                                                    render: (_, chapter) => (
                                                        <div className="flex space-x-2">
                                                            <Button onClick={() => {
                                                                setSelectedChapter(chapter);
                                                                setChapterForm({ subjectId: chapter.subjectId, name: chapter.name });
                                                                setIsAddChapterOpen(true);
                                                            }}>
                                                                Sửa
                                                            </Button>
                                                            <Button danger onClick={() => handleDeleteChapter(chapter.id)}>
                                                                Xóa
                                                            </Button>
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                    ) : (
                                        <div>No chapters available</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <CRUDDialog
                            isOpen={isAddChapterOpen}
                            onClose={() => setIsAddChapterOpen(false)}
                            title={selectedChapter ? "Sửa/Thêm Chương" : "Thêm Chương"}
                            fields={chapterFields}
                            formData={chapterForm}
                            setFormData={setChapterForm}
                            onSubmit={selectedChapter ? handleUpdateChapter : handleAddChapter}
                            isLoading={loading}
                        />
                    </TabsContent>
                    <TabsContent value="topics">
                        <Card>
                            <CardHeader>
                                <Title level={2}>Quản Lý Bài Học</Title>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => setIsAddTopicOpen(true)}>Thêm Bài Học</Button>
                                <div className="mt-4">
                                    {Array.isArray(topics) && topics.length > 0 ? (
                                        <Table
                                            dataSource={topics}
                                            rowKey="id"
                                            pagination={false}
                                            columns={[
                                                {
                                                    title: 'Bài Học',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                },
                                                {
                                                    title: 'Chương',
                                                    dataIndex: 'chapterName',
                                                    key: 'chapterName',
                                                },
                                                {
                                                    title: 'Bài Toán',
                                                    key: 'problems',
                                                    render: (_, topic) => (
                                                        <ul>
                                                            {topic.problems.map((problem) => (
                                                                <li key={problem.id}>{problem.name}</li>
                                                            ))}
                                                        </ul>
                                                    ),
                                                },
                                                {
                                                    title: 'Quản Lý',
                                                    key: 'actions',
                                                    render: (_, topic) => (
                                                        <div className="flex space-x-2">
                                                            <Button onClick={() => {
                                                                setSelectedTopic(topic);
                                                                setTopicForm({
                                                                    chapterId: topic.chapterId,
                                                                    name: topic.name,
                                                                });
                                                                setIsAddTopicOpen(true);
                                                            }}>
                                                                Sửa
                                                            </Button>
                                                            <Button danger onClick={() => handleDeleteTopic(topic.id)}>
                                                                Xóa
                                                            </Button>
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                    ) : (
                                        <div>No topics available</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <CRUDDialog
                            isOpen={isAddTopicOpen}
                            onClose={() => setIsAddTopicOpen(false)}
                            title={selectedTopic ? "Sửa/Thêm Bài học" : "Thêm Bài học"}
                            fields={topicFields}
                            formData={topicFields}
                            setFormData={setTopicForm}
                            onSubmit={selectedTopic ? handleUpdateTopic : handleAddTopic}
                            isLoading={loading}
                        />
                    </TabsContent>
                    <TabsContent value="problems">
                        <Card>
                            <CardHeader>
                                <Title level={2}>Quản Lý Bài Toán</Title>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => setIsAddProblemOpen(true)}>Thêm Bài Toán</Button>
                                <div className="mt-4">
                                    {Array.isArray(problems) && problems.length > 0 ? (
                                        <Table
                                            dataSource={problems}
                                            rowKey="id"
                                            pagination={false}
                                            columns={[
                                                {
                                                    title: 'Bài Toán',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                },
                                                {
                                                    title: 'Bài Học',
                                                    dataIndex: 'topicName',
                                                    key: 'topicName',
                                                },
                                                {
                                                    title: 'Mô Tả',
                                                    dataIndex: 'description',
                                                    key: 'description',
                                                },
                                                {
                                                    title: 'Tham Số',
                                                    key: 'parameters',
                                                    render: (_, problem) => (
                                                        <ul>
                                                            {problem.getPPVM.map((param) => (
                                                                <li key={param.parameterId}>
                                                                    {param.symbol}: {param.value}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ),
                                                },
                                                {
                                                    title: 'Quản Lý',
                                                    key: 'actions',
                                                    render: (_, problem) => (
                                                        <div className="flex space-x-2">
                                                            <Button onClick={() => {
                                                                setSelectedProblem(problem);
                                                                setProblemForm({
                                                                    topicId: problem.topicId,
                                                                    name: problem.name,
                                                                    description: problem.description,
                                                                });
                                                                setIsAddProblemOpen(true);
                                                            }}>
                                                                Sửa
                                                            </Button>
                                                            <Button danger onClick={() => handleDeleteProblem(problem.id)}>
                                                                Xóa
                                                            </Button>
                                                        </div>
                                                    ),
                                                },
                                            ]}
                                        />
                                    ) : (
                                        <div>No problems available</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <CRUDDialog
                            isOpen={isAddProblemOpen}
                            onClose={() => setIsAddProblemOpen(false)}
                            title={selectedProblem ? "Sửa/Thêm Bài tập" : "Thêm Bài tập"}
                            fields={problemFields}
                            formData={problemFields}
                            setFormData={setProblemForm}
                            onSubmit={selectedProblem ? handleUpdateProblem : handleAddProblem}
                            isLoading={loading}
                        />
                    </TabsContent>
                </Tabs>
            </div>
            <Footer />
        </Layout>
    );
};

export default AdminDashboard;