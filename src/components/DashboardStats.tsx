import { Card, CardContent, CardHeader } from "@/components/ui/card.tsx";
import { CardTitle } from "react-bootstrap";
import {
    Users,
    CheckCircle,
    FileText,
    AlertCircle,
    Layers,
    DollarSign
} from "lucide-react";

interface DashboardStatsProps {
    data: any;
    loading: boolean;
    error: string | null;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ data, loading, error }) => {
    const stats = [
        { title: "Tổng số người dùng", value: data.totalUsers, icon: Users, color: "text-blue-600" },
        { title: "Thanh toán thành công", value: data.totalSuccessTransactions, icon: CheckCircle, color: "text-green-600" },
        { title: "Tổng số lời giải", value: data.totalSolutions, icon: FileText, color: "text-purple-600" },
        { title: "Tổng số bài tập", value: data.totalProblems, icon: AlertCircle, color: "text-yellow-600" },
        { title: "Tổng số môn học", value: data.totalSubjects, icon: Layers, color: "text-indigo-600" },
        { title: "Tổng doanh thu (VNĐ)", value: data.totalRevenue, icon: DollarSign, color: "text-green-800" }
    ];

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 py-4">{error}</div>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};