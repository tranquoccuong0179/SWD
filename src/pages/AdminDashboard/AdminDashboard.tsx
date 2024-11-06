import { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Typography } from 'antd';
import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, CheckCircle, AlertCircle, Layers, FileText } from 'lucide-react';
import Header from '../../components/Header/Header';
import './AdminDashboard.css';

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
        totalChapters: 0
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
                console.log("Making API call to /Dashboards");
                const response = await axios.get(`${API_BASE_URL}/Dashboards`, {
                    headers: {
                        accept: '*/*',// DAY NE DAY NE DAY NE DAY NE DAY NE DAY NE DAY NE
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Dashboard data response:", response.data);

                if (response.data.statusCode === 200 && response.data.code === "Success!") // DAY NE DAY NE DAY NE DAY NE DAY NE DAY NE DAY NE
                {
                    setDashboardData(response.data.data);
                    await Promise.all([fetchSubjects(), fetchChapters(), fetchProblems(), fetchTopics()]);
                } else {
                    console.warn("Unexpected response format:", response.data);
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
            const response = await axios.get(`${API_BASE_URL}/subjects`);
            if (response.data.statusCode === 200) {
                setSubjects(response.data.data);
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
            const response = await axios.get(`${API_BASE_URL}/chapters`);
            if (response.data.statusCode === 200) {
                setChapters(response.data.data);
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
            const response = await axios.get(`${API_BASE_URL}/problems`);
            if (response.data.statusCode === 200) {
                setProblems(response.data.data);
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
            const response = await axios.get(`${API_BASE_URL}/topics`);
            if (response.data.statusCode === 200) {
                setTopics(response.data.data);
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

    const stats = [
        {
            title: "Total Users",
            value: dashboardData.totalUsers,
            icon: Users,
            color: "text-blue-600"
        },
        {
            title: "Success Transactions",
            value: dashboardData.totalSuccessTransactions,
            icon: CheckCircle,
            color: "text-green-600"
        },
        {
            title: "Total Solutions",
            value: dashboardData.totalSolutions,
            icon: FileText,
            color: "text-purple-600"
        },
        {
            title: "Total Problems",
            value: dashboardData.totalProblems,
            icon: AlertCircle,
            color: "text-yellow-600"
        },
        {
            title: "Total Subjects",
            value: dashboardData.totalSubjects,
            icon: BookOutlined,
            color: "text-indigo-600"
        },
        {
            title: "Total Chapters",
            value: dashboardData.totalChapters,
            icon: Layers,
            color: "text-pink-600"
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
        <Layout className="landing-page">
            <Header />
            <div className="admin-dashboard">
                <div className="dashboard-header">
                    <div>
                        <Title level={2}>Dashboard</Title>
                        <Text type="secondary">Welcome back, Admin</Text>
                    </div>
                    <div className="date-display">
                        <ClockCircleOutlined />
                        <Text type="secondary" style={{ marginLeft: '8px' }}>
                            {new Date().toLocaleDateString()}
                        </Text>
                    </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="subjects">Subjects</TabsTrigger>
                        <TabsTrigger value="chapters">Chapters</TabsTrigger>
                        <TabsTrigger value="problems">Problems</TabsTrigger>
                        <TabsTrigger value="topics">Topics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Dashboard Overview</CardTitle>
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

                    <TabsContent value="overview">
                        {/* Overview content */}
                    </TabsContent>

                    <TabsContent value="subjects">
                        {/* Subjects management */}
                    </TabsContent>

                    <TabsContent value="chapters">
                        {/* Chapters management */}
                    </TabsContent>

                    <TabsContent value="problems">
                        {/* Problems management */}
                    </TabsContent>

                    <TabsContent value="topics">
                        {/* Topics management */}
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default AdminDashboard;