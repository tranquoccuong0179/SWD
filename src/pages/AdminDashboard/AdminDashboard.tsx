import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useApiClient } from '@/hooks/useApiClient.ts';
import { DashboardStats } from '../../components/DashboardStats';
import { EntityManager } from '../../components/EntityManger';

const API_BASE_URL = 'https://manim-api-ffh6c8ewbehjc0hn.southeastasia-01.azurewebsites.net/api';

// Types
interface DashboardData {
    totalUsers: number;
    totalSuccessTransactions: number;
    totalSolutions: number;
    totalProblems: number;
    totalSubjects: number;
    totalChapters: number;
    totalRevenue: number;
}

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        totalUsers: 0,
        totalSuccessTransactions: 0,
        totalSolutions: 0,
        totalProblems: 0,
        totalSubjects: 0,
        totalChapters: 0,
        totalRevenue: 0
    });
    const [activeTab, setActiveTab] = useState('overview');
    const { loading, error, unauthorized, apiRequest } = useApiClient(API_BASE_URL);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const data = await apiRequest('get', '/dashboard');
            if (data) {
                setDashboardData(data);
            }
        };
        fetchDashboardData();
    }, []);

    // Configuration for different entities
    const entityConfigs = {
        subjects: {
            title: "Môn Học",
            endpoint: "/subjects",
            fields: [
                { name: 'name', label: 'Tên Môn Học', required: true, type: 'text' },
                { name: 'price', label: 'Giá (VNĐ)', required: true, type: 'number' },
                { name: 'imageLink', label: 'Hình Ảnh', required: false, type: 'file', accept: 'image/*' }
            ],
            columns: [
                { title: 'Tên Môn Học', dataIndex: 'name', key: 'name' },
                {
                    title: 'Giá',
                    dataIndex: 'price',
                    key: 'price',
                    render: (price: number) => new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(price)
                }
            ]
        },
        chapters: {
            title: "Chương",
            endpoint: "/chapters",
            fields: [
                { name: 'name', label: 'Tên Chương', required: true, type: 'text' },
                { name: 'subjectId', label: 'ID Môn Học', required: true, type: 'number' },
                { name: 'order', label: 'Thứ tự', required: true, type: 'number', min: 1 }
            ],
            columns: [
                { title: 'Tên Chương', dataIndex: 'name', key: 'name' },
                { title: 'Môn Học', dataIndex: 'subjectName', key: 'subjectName' }
            ]
        },
        topics: {
            title: "Bài Học",
            endpoint: "/topics",
            fields: [
                { name: 'name', label: 'Tên Bài Học', required: true, type: 'text' },
                { name: 'chapterId', label: 'ID Chương', required: true, type: 'number' }
            ],
            columns: [
                { title: 'Bài Học', dataIndex: 'name', key: 'name' },
                { title: 'Chương', dataIndex: 'chapterName', key: 'chapterName' }
            ]
        },
        problems: {
            title: "Bài Tập",
            endpoint: "/problems",
            fields: [
                { name: 'name', label: 'Tên Bài Toán', required: true, type: 'text' },
                { name: 'topicId', label: 'ID Bài Học', required: true, type: 'number' },
                { name: 'description', label: 'Mô Tả', required: true, type: 'textarea' }
            ],
            columns: [
                { title: 'Bài Toán', dataIndex: 'name', key: 'name' },
                { title: 'Bài Học', dataIndex: 'topicName', key: 'topicName' },
                { title: 'Mô Tả', dataIndex: 'description', key: 'description' }
            ]
        }
    };

    if (unauthorized) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Authentication Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-red-500">Please log in to access this content</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-600">Chào mừng trở lại, Admin</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="flex space-x-2 mb-4">
                        <TabsTrigger value="overview">Tổng Quan</TabsTrigger>
                        {Object.keys(entityConfigs).map(key => (
                            <TabsTrigger key={key} value={key}>
                                {entityConfigs[key].title}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="overview">
                        <DashboardStats data={dashboardData} loading={loading} error={error} />
                    </TabsContent>

                    {Object.entries(entityConfigs).map(([key, config]) => (
                        <TabsContent key={key} value={key}>
                            <EntityManager
                                title={config.title}
                                endpoint={config.endpoint}
                                fields={config.fields}
                                columns={config.columns}
                                apiRequest={apiRequest}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </main>
            <Footer />
        </div>
    );
};

export default AdminDashboard;