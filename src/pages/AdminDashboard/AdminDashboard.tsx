import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Typography } from 'antd';
import {
    UserOutlined,
    BookOutlined,
    DollarOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Pencil, Trash2, Users, CheckCircle, AlertCircle, Layers, FileText } from 'lucide-react';
import Header from '../../components/Header/Header';
import './AdminDashboard.css';

const { Title, Text } = Typography;

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'https://manimapi-hfanb8gyejb3eacw.southeastasia-01.azurewebsites.net/api'
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const AdminDashboard = () => {
    // State management
    const [courses, setCourses] = useState([]);
    const [chapters, setChapters] = useState([]);
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
    const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
    const [isAddChapterOpen, setIsAddChapterOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const [courseForm, setCourseForm] = useState({ name: '', price: '' });
    const [chapterForm, setChapterForm] = useState({ courseId: '', name: '', order: 1 });

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('accessToken');

            if (!token) {
                setUnauthorized(true);
                setError('Authentication required');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('/Dashboards');

                if (response.data.statusCode === 200 && response.data.code === "Success") {
                    setDashboardData(response.data.data);
                    await Promise.all([fetchCourses(), fetchChapters()]);
                } else {
                    throw new Error('Failed to fetch dashboard data');
                }
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 401) {
                        setUnauthorized(true);
                        setError('Unauthorized access - Please log in again');
                    } else {
                        setError(err.response?.data?.message || 'An error occurred while fetching dashboard data');
                    }
                } else {
                    setError('An unexpected error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // API Functions for Courses
    const fetchCourses = async () => {
        try {
            const response = await api.get('/courses');
            if (response.data.statusCode === 200) {
                setCourses(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    const handleAddCourse = async () => {
        try {
            const response = await api.post('/courses', courseForm);
            if (response.data.statusCode === 200) {
                await fetchCourses();
                setIsAddCourseOpen(false);
                setCourseForm({ name: '', price: '' });
            }
        } catch (err) {
            console.error('Error adding course:', err);
        }
    };

    const handleUpdateCourse = async () => {
        try {
            const response = await api.put(`/courses/${selectedCourse.id}`, courseForm);
            if (response.data.statusCode === 200) {
                await fetchCourses();
                setIsAddCourseOpen(false);
                setSelectedCourse(null);
                setCourseForm({ name: '', price: '' });
            }
        } catch (err) {
            console.error('Error updating course:', err);
        }
    };

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await api.delete(`/courses/${courseId}`);
            if (response.data.statusCode === 200) {
                await fetchCourses();
            }
        } catch (err) {
            console.error('Error deleting course:', err);
        }
    };

    // API Functions for Chapters
    const fetchChapters = async () => {
        try {
            const response = await api.get('/chapters');
            if (response.data.statusCode === 200) {
                setChapters(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching chapters:', err);
        }
    };

    const handleAddChapter = async () => {
        try {
            const response = await api.post('/chapters', {
                ...chapterForm,
                courseId: parseInt(chapterForm.courseId)
            });
            if (response.data.statusCode === 200) {
                await fetchChapters();
                setIsAddChapterOpen(false);
                setChapterForm({ courseId: '', name: '', order: 1 });
            }
        } catch (err) {
            console.error('Error adding chapter:', err);
        }
    };

    const handleUpdateChapter = async () => {
        try {
            const response = await api.put(`/chapters/${selectedChapter.id}`, {
                ...chapterForm,
                courseId: parseInt(chapterForm.courseId)
            });
            if (response.data.statusCode === 200) {
                await fetchChapters();
                setIsAddChapterOpen(false);
                setSelectedChapter(null);
                setChapterForm({ courseId: '', name: '', order: 1 });
            }
        } catch (err) {
            console.error('Error updating chapter:', err);
        }
    };

    const handleDeleteChapter = async (chapterId) => {
        try {
            const response = await api.delete(`/chapters/${chapterId}`);
            if (response.data.statusCode === 200) {
                await fetchChapters();
            }
        } catch (err) {
            console.error('Error deleting chapter:', err);
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
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="chapters">Chapters</TabsTrigger>
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

                    <TabsContent value="courses">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Course Management</CardTitle>
                                <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Course
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{selectedCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Course Name</Label>
                                                <Input
                                                    id="name"
                                                    value={courseForm.name}
                                                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="price">Price</Label>
                                                <Input
                                                    id="price"
                                                    value={courseForm.price}
                                                    onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={selectedCourse ? handleUpdateCourse : handleAddCourse}>
                                                {selectedCourse ? 'Update' : 'Add'} Course
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {courses.map((course) => (
                                            <TableRow key={course.id}>
                                                <TableCell>{course.name}</TableCell>
                                                <TableCell>{course.price}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => {
                                                                setSelectedCourse(course);
                                                                setCourseForm(course);
                                                                setIsAddCourseOpen(true);
                                                            }}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => handleDeleteCourse(course.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="chapters">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Chapter Management</CardTitle>
                                <Dialog open={isAddChapterOpen} onOpenChange={setIsAddChapterOpen}>
                                    <DialogTrigger asChild>
                                        <Button>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Add Chapter
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{selectedChapter ? 'Edit Chapter' : 'Add New Chapter'}</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="courseId">Course</Label>
                                                <Select
                                                    value={chapterForm.courseId}
                                                    onValueChange={(value) => setChapterForm({ ...chapterForm, courseId: value })}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a course" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {courses.map((course) => (
                                                            <SelectItem key={course.id} value={course.id.toString()}>
                                                                {course.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Chapter Name</Label>
                                                <Input
                                                    id="name"
                                                    value={chapterForm.name}
                                                    onChange={(e) => setChapterForm({ ...chapterForm, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="order">Order</Label>
                                                <Input
                                                    id="order"
                                                    type="number"
                                                    value={chapterForm.order}
                                                    onChange={(e) => setChapterForm({ ...chapterForm, order: parseInt(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={selectedChapter ? handleUpdateChapter : handleAddChapter}>
                                                {selectedChapter ? 'Update' : 'Add'} Chapter
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Course</TableHead>
                                            <TableHead>Order</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {chapters.map((chapter) => (
                                            <TableRow key={chapter.id}>
                                                <TableCell>{chapter.name}</TableCell>
                                                <TableCell>
                                                    {courses.find(c => c.id === chapter.courseId)?.name || 'Unknown Course'}
                                                </TableCell>
                                                <TableCell>{chapter.order}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => {
                                                                setSelectedChapter(chapter);
                                                                setChapterForm({
                                                                    courseId: chapter.courseId.toString(),
                                                                    name: chapter.name,
                                                                    order: chapter.order
                                                                });
                                                                setIsAddChapterOpen(true);
                                                            }}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => handleDeleteChapter(chapter.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default AdminDashboard;