import { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Layout, Typography} from 'antd';
import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Users, CheckCircle, AlertCircle, Layers, FileText, DollarSign} from 'lucide-react';
import Header from '../../components/Header/Header';
import './AdminDashboard.css';
import {Dialog, DialogContent } from '@radix-ui/react-dialog';
import {DialogHeader, DialogTitle} from '@/components/ui/dialog';

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
                const response = await axios.get(`${API_BASE_URL}/Dashboards`, {
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

    const CRUDDialog = ({
                            isOpen,
                            setIsOpen,
                            title,
                            children,
                            onSubmit
                        }) => (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                }}>
                    {children}
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );

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
            title: "Tổng doanh thu", // Add this line for total revenue
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
                        <TabsTrigger value="subjects">Môn học</TabsTrigger>
                        <TabsTrigger value="chapters">Chương</TabsTrigger>
                        <TabsTrigger value="problems">Bài tập</TabsTrigger>
                        <TabsTrigger value="topics">Chủ đề</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview">
                        <Card>
                            <CardHeader>
                                <CardTitle>Tổng quan</CardTitle>
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
                                <CardTitle>Quản ly mon học</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => setIsAddSubjectOpen(true)}>Add Subject</Button>
                                <div className="mt-4">
                                    {Array.isArray(subjects) && subjects.length > 0 ? (
                                        subjects.map((subject) => (
                                            <div key={subject.id} className="flex justify-between items-center">
                                                <div>{subject.name} - ${subject.price}</div>
                                                <div>
                                                    <Button onClick={() => {
                                                        setSelectedSubject(subject);
                                                        setSubjectForm({ name: subject.name, price: subject.price });
                                                        setIsAddSubjectOpen(true);
                                                    }}>Edit</Button>
                                                    <Button onClick={() => handleDeleteSubject(subject.id)}>Delete</Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No subjects available</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <CRUDDialog
                            isOpen={isAddSubjectOpen}
                            setIsOpen={setIsAddSubjectOpen}
                            title={selectedSubject ? "Edit Subject" : "Add Subject"}
                            onSubmit={selectedSubject ? handleUpdateSubject : handleAddSubject}
                        >
                            <input
                                type="text"
                                placeholder="Subject Name"
                                value={subjectForm.name}
                                onChange={(e) => setSubjectForm({ ...subjectForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={subjectForm.price}
                                onChange={(e) => setSubjectForm({ ...subjectForm, price: e.target.value })}
                                required
                            />
                        </CRUDDialog>
                    </TabsContent>

                    <TabsContent value="chapters">
                        <Card>
                            <CardHeader>
                                <CardTitle>Chapters Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => setIsAddChapterOpen(true)}>Add Chapter</Button>
                                <div className="mt-4">
                                    {Array.isArray(chapters) && chapters.length > 0 ? (
                                        chapters.map((chapter) => (
                                            <div key={chapter.id} className="flex justify-between items-center">
                                                <div>
                                                    {chapter.name} (Subject: {chapter.subjectName})
                                                    {chapter.topics.length > 0 && (
                                                        <ul>
                                                            {chapter.topics.map((topic) => (
                                                                <li key={topic.id}>{topic.name}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                                <div>
                                                    <Button onClick={() => {
                                                        setSelectedChapter(chapter);
                                                        setChapterForm({ subjectId: chapter.subjectId, name: chapter.name });
                                                        setIsAddChapterOpen(true);
                                                    }}>Edit</Button>
                                                    <Button onClick={() => handleDeleteChapter(chapter.id)}>Delete</Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No chapters available</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <CRUDDialog
                            isOpen={isAddChapterOpen}
                            setIsOpen={setIsAddChapterOpen}
                            title={selectedChapter ? "Edit Chapter" : "Add Chapter"}
                            onSubmit={selectedChapter ? handleUpdateChapter : handleAddChapter}
                        >
                            <input
                                type="text"
                                placeholder="Chapter Name"
                                value={chapterForm.name}
                                onChange={(e) => setChapterForm({ ...chapterForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Subject ID"
                                value={chapterForm.subjectId}
                                onChange={(e) => setChapterForm({ ...chapterForm, subjectId: e.target.value })}
                                required
                            />
                        </CRUDDialog>
                    </TabsContent>

                    <TabsContent value="problems">
                        <Card>
                            <CardHeader>
                                <CardTitle>Problems Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => setIsAddProblemOpen(true)}>Add Problem</Button>
                                <div className="mt-4">
                                    {Array.isArray(problems) && problems.length > 0 ? (
                                        problems.map((problem) => (
                                            <div key={problem.id} className="flex flex-col mb-4">
                                                <div className="font-bold">{problem.name} (Topic: {problem.topicName})</div>
                                                <div>{problem.description}</div>
                                                <div className="mt-2">
                                                    <strong>Parameters:</strong>
                                                    <ul>
                                                        {problem.getPPVM.map((param) => (
                                                            <li key={param.parameterId}>
                                                                {param.symbol}: {param.value}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <Button onClick={() => {
                                                        setSelectedProblem(problem);
                                                        setProblemForm({
                                                            topicId: problem.topicId,
                                                            name: problem.name,
                                                            description: problem.description
                                                        });
                                                        setIsAddProblemOpen(true);
                                                    }}>Edit</Button>
                                                    <Button onClick={() => handleDeleteProblem(problem.id)}>Delete</Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No problems available</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <CRUDDialog
                            isOpen={isAddProblemOpen}
                            setIsOpen={setIsAddProblemOpen}
                            title={selectedProblem ? "Edit Problem" : "Add Problem"}
                            onSubmit={selectedProblem ? handleUpdateProblem : handleAddProblem}
                        >
                            <input
                                type="text"
                                placeholder="Problem Name"
                                value={problemForm.name}
                                onChange={(e) => setProblemForm({ ...problemForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Topic ID"
                                value={problemForm.topicId}
                                onChange={(e) => setProblemForm({ ...problemForm, topicId: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                value={problemForm.description}
                                onChange={(e) => setProblemForm({ ...problemForm, description: e.target.value })}
                                required
                            />
                        </CRUDDialog>
                    </TabsContent>

                    <TabsContent value="topics">
                        <Card>
                            <CardHeader>
                                <CardTitle>Topics Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => setIsAddTopicOpen(true)}>Add Topic</Button>
                                <div className="mt-4">
                                    {Array.isArray(topics) && topics.length > 0 ? (
                                        topics.map((topic) => (
                                            <div key={topic.id} className="flex flex-col mb-4">
                                                <div className="font-bold">{topic.name} (Chapter: {topic.chapterName})</div>
                                                <div>
                                                    <strong>Problems:</strong>
                                                    <ul>
                                                        {topic.problems.map((problem) => (
                                                            <li key={problem.id}>{problem.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <Button onClick={() => {
                                                        setSelectedTopic(topic);
                                                        setTopicForm({
                                                            chapterId: topic.chapterId,
                                                            name: topic.name
                                                        });
                                                        setIsAddTopicOpen(true);
                                                    }}>Edit</Button>
                                                    <Button onClick={() => handleDeleteTopic(topic.id)}>Delete</Button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No topics available</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        <CRUDDialog
                            isOpen={isAddTopicOpen}
                            setIsOpen={setIsAddTopicOpen}
                            title={selectedTopic ? "Edit Topic" : "Add Topic"}
                            onSubmit={selectedTopic ? handleUpdateTopic : handleAddTopic}
                        >
                            <input
                                type="text"
                                placeholder="Topic Name"
                                value={topicForm.name}
                                onChange={(e) => setTopicForm({ ...topicForm, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Chapter ID"
                                value={topicForm.chapterId}
                                onChange={(e) => setTopicForm({ ...topicForm, chapterId: e.target.value })}
                                required
                            />
                        </CRUDDialog>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default AdminDashboard;