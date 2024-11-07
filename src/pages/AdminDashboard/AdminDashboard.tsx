import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Divider, Layout, Typography, Table } from 'antd';
import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CheckCircle, AlertCircle, Layers, FileText, DollarSign } from 'lucide-react';
import Header from '../../components/Header/Header';
import Footer from '@/components/Footer/Footer';
import './AdminDashboard.css';
import CRUDDialog from "@/components/CRUDDialog/CRUDDialog.tsx";


const { Title, Text } = Typography;

// Create axios instance with base configuration
const API_BASE_URL = 'https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api';

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
    const [subjectForm, setSubjectForm] = useState({ name: '', price: '' });
    const [chapterForm, setChapterForm] = useState({ subjectId: '', name: '', order: 1 });
    const [problemForm, setProblemForm] = useState({ chapterId: '', name: '', description: '' });
    const [topicForm, setTopicForm] = useState({ problemId: '', name: '', description: '' });
    const [activeTab, setActiveTab] = useState('overview');
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

    // API Functions for Subjects
    const fetchSubjects = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_BASE_URL}/subjects`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Subjects response:', response.data); // Log the response
            if (response.data.statusCode === 200) {
                setSubjects(response.data.data.items); // Update this line to access the items array
            }
        } catch (err) {
            console.error('Error fetching subjects:', err);
        }
    };

    const handleAddSubject = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/subjects`, subjectForm);
            if (response.data.statusCode === 200) {
                await fetchSubjects();
                setIsAddSubjectOpen(false);
                setSubjectForm({ name: '', price: '' });
            }
        } catch (err) {
            console.error('Error adding subject:', err);
        }
    };

    const handleUpdateSubject = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/subjects/{id}`, subjectForm);
            if (response.data.statusCode === 200) {
                await fetchSubjects();
                setIsAddSubjectOpen(false);
                setSelectedSubject(null);
                setSubjectForm({ name: '', price: '' });
            }
        } catch (err) {
            console.error('Error updating subject:', err);
        }
    };

    const handleDeleteSubject = async (subjectId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/subjects/{id}`);
            if (response.data.statusCode === 200) {
                await fetchSubjects();
            }
        } catch (err) {
            console.error('Error deleting subject:', err);
        }
    };

    // API Functions for Chapters
    const fetchChapters = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_BASE_URL}/chapters`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Chapters response:', response.data); // Log the response
            if (response.data.statusCode === 200) {
                setChapters(response.data.data.items); // Access the items array
            }
        } catch (err) {
            console.error('Error fetching chapters:', err);
        }
    };

    const handleAddChapter = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/chapters`, {
                ...chapterForm,
                subjectId: parseInt(chapterForm.subjectId)
            });
            if (response.data.statusCode === 200) {
                await fetchChapters();
                setIsAddChapterOpen(false);
                setChapterForm({ subjectId: '', name: '', order: 1 });
            }
        } catch (err) {
            console.error('Error adding chapter:', err);
        }
    };

    const handleUpdateChapter = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/chapters/{id}`, {
                ...chapterForm,
                subjectId: parseInt(chapterForm.subjectId)
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
            const response = await axios.delete(`${API_BASE_URL}/chapters/{id}`);
            if (response.data.statusCode === 200) {
                await fetchChapters();
            }
        } catch (err) {
            console.error('Error deleting chapter:', err);
        }
    };

    // API Functions for Problems
    const fetchProblems = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_BASE_URL}/problems`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Problems response:', response.data); // Log the response
            if (response.data.statusCode === 200) {
                setProblems(response.data.data.items); // Access the items array
            }
        } catch (err) {
            console.error('Error fetching problems:', err);
        }
    };

    const handleAddProblem = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/problems`, {
                ...problemForm,
                chapterId: parseInt(problemForm.chapterId)
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
            const response = await axios.put(`${API_BASE_URL}/problems/{id}`, {
                ...problemForm,
                chapterId: parseInt(problemForm.chapterId)
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
            const response = await axios.delete(`${API_BASE_URL}/problems/{id}`);
            if (response.data.statusCode === 200) {
                await fetchProblems();
            }
        } catch (err) {
            console.error('Error deleting problem:', err);
        }
    };

    // API Functions for Topics
    const fetchTopics = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${API_BASE_URL}/topics`, {
                headers: {
                    accept: '*/*',
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Topics response:', response.data); // Log the response
            if (response.data.statusCode === 200) {
                setTopics(response.data.data.items); // Access the items array
            }
        } catch (err) {
            console.error('Error fetching topics:', err);
        }
    };

    const handleAddTopic = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/topics`, {
                ...topicForm,
                problemId: parseInt(topicForm.problemId)
            });
            if (response.data.statusCode === 200) {
                await fetchTopics();
                setIsAddTopicOpen(false);
                setTopicForm({ problemId: '', name: '', description: '' });
            }
        } catch (err) {
            console.error('Error adding topic:', err);
        }
    };

    const handleUpdateTopic = async () => {
        try {
            const response = await axios.put(`${API_BASE_URL}/topics/{id}`, {
                ...topicForm,
                problemId: parseInt(topicForm.problemId)
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
            const response = await axios.delete(`${API_BASE_URL}/topics/{id}`);
            if (response.data.statusCode === 200) {
                await fetchTopics();
            }
        } catch (err) {
            console.error('Error deleting topic:', err);
        }
    };

    const subjectFields = [
        {
            name: 'name',
            label: 'Tên Môn Học',
            required: true,
            type: 'text'
        },
        {
            name: 'price',
            label: 'Giá (VNĐ)',
            required: true,
            type: 'number',
            min: 0,
            description: 'Nhập giá không bao gồm dấu phẩy hoặc đơn vị tiền tệ'
        }
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
                                        setSelectedSubject(null);
                                        setSubjectForm({ name: '', price: '' });
                                        setIsAddSubjectOpen(true);
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
                                                {
                                                    title: 'Giá',
                                                    dataIndex: 'price',
                                                    key: 'price',
                                                    render: (price) => new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(price),
                                                },
                                                {
                                                    title: 'Quản Lý',
                                                    key: 'actions',
                                                    render: (_, subject) => (
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                onClick={() => {
                                                                    setSelectedSubject(subject);
                                                                    setSubjectForm({ name: subject.name, price: subject.price });
                                                                    setIsAddSubjectOpen(true);
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

                                <CRUDDialog
                                    isOpen={isAddSubjectOpen}
                                    onClose={() => setIsAddSubjectOpen(false)}
                                    title={selectedSubject ? "Sửa Môn Học" : "Thêm Môn Học"}
                                    fields={subjectFields}
                                    formData={subjectForm}
                                    setFormData={setSubjectForm}
                                    onSubmit={selectedSubject ? handleUpdateSubject : handleAddSubject}
                                    isLoading={loading}
                                />
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
                            title={selectedChapter ? "Sửa Chương" : "Thêm Chương"}
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
                            title={selectedTopic ? "Sửa Bài học" : "Thêm Bài học"}
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
                            title={selectedProblem ? "Sửa Bài tập" : "Thêm Bài tập"}
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