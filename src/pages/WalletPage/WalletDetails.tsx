import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, message, Layout } from 'antd';
import { Wallet, CreditCard, History, GraduationCap, TrendingUp, Clock } from 'lucide-react';
import Header from '../../components/Header/Header.tsx';
import "./IntergratedWallet.css";

interface WalletData {
    userId: string;
    balance: number;
    transactions: Array<{
        id: string;
        description: string;
        amount: number;
        date: string;
        status: 'COMPLETED' | 'PENDING' | 'FAILED';
        transactionType: 'PURCHASE' | 'DEPOSIT' | 'REFUND';
    }>;
    purchasedCourses: Array<{
        id: string;
        name: string;
        price: number;
    }>;
}

const BASE_API_URL = 'https://manim-api-ffh6c8ewbehjc0hn.canadacentral-01.azurewebsites.net';

const getAuthToken = () => localStorage.getItem('accessToken');

// Format number as Vietnamese currency (VND)
const formatCurrency = (amount: number | undefined | null) => {
    if (amount === undefined || amount === null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }).format(amount);
};

const IntegratedWallet: React.FC = () => {
    const [walletData, setWalletData] = useState<WalletData>({
        userId: '',
        balance: 0,
        transactions: [],
        purchasedCourses: []
    });
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch wallet data
    const fetchWalletData = async () => {
        try {
            setIsLoading(true);
            const token = getAuthToken();
            if (!token) {
                message.error('Vui lòng đăng nhập để xem thông tin ví');
                return;
            }

            const response = await axios.get(`${BASE_API_URL}/getWallet`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                // Ensure numeric values are properly parsed
                const parsedData = {
                    userId: response.data.data.userId,
                    balance: parseFloat(response.data.data.balance) || 0,
                    transactions: (response.data.data.transactions || []).map((t: any) => ({
                        ...t,
                        amount: parseFloat(t.amount) || 0
                    })),
                    purchasedCourses: (response.data.data.purchasedCourses || []).map((c: any) => ({
                        ...c,
                        price: parseFloat(c.price) || 0
                    }))
                };
                console.log("Parsed wallet data:", parsedData);  // Debug line
                setWalletData(parsedData);
            }
        } catch (error) {
            console.error('Error fetching wallet data:', error);
            message.error('Không thể tải thông tin ví. Vui lòng thử lại sau.');
        } finally {
            setIsLoading(false);
        }
    };

    // Initial fetch when component mounts
    useEffect(() => {
        fetchWalletData();

        // Set up polling for wallet data every 30 seconds
        const pollInterval = setInterval(fetchWalletData, 30000);

        // Cleanup interval on component unmount
        return () => clearInterval(pollInterval);
    }, []);

    // Handle payment success
    const handlePaymentSuccess = async () => {
        await fetchWalletData();
        setShowAddFunds(false);
        message.success('Nạp tiền thành công!');
    };

    // Handle adding funds to wallet
    const handleAddFunds = async () => {
        setLoading(true);

        try {
            const token = getAuthToken();
            if (!token) {
                message.error('Vui lòng đăng nhập để nạp tiền');
                return;
            }

            // Ensure amount is a valid number
            const numericAmount = parseFloat(amount);
            if (isNaN(numericAmount) || numericAmount <= 0) {
                message.error('Vui lòng nhập số tiền hợp lệ');
                return;
            }

            const response = await axios.post(`${BASE_API_URL}/api/wallet/create`, null, {
                params: { balance: numericAmount },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data?.checkoutUrl) {
                const newWindow = window.open(response.data.checkoutUrl, '_blank');
                if (newWindow) {
                    newWindow.focus();
                }

                // Set up payment status check
                const checkPaymentStatus = setInterval(async () => {
                    try {
                        const statusResponse = await axios.get(`${BASE_API_URL}/getWallet`, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        const newBalance = parseFloat(statusResponse.data.data.balance) || 0;
                        if (newBalance > walletData.balance) {
                            clearInterval(checkPaymentStatus);
                            handlePaymentSuccess();
                        }
                    } catch (error) {
                        console.error('Error checking payment status:', error);
                    }
                }, 5000);

                // Clear interval after 5 minutes
                setTimeout(() => {
                    clearInterval(checkPaymentStatus);
                }, 300000);
            }
        } catch (error) {
            console.error('Add funds error:', error);
            message.error('Có lỗi xảy ra khi nạp tiền. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
            setAmount('');
        }
    };

    // Table columns for transactions
    const transactionColumns = [
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => <div className="font-medium text-gray-800">{text}</div>
        },
        {
            title: 'Số tiền',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => (
                <div className={`font-medium ${amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(amount)}
                </div>
            ),
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            render: (date: string) => (
                <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} /> {date}
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                const statusConfig = {
                    COMPLETED: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
                    PENDING: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
                    FAILED: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
                };
                const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
                return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}>
                        {status === 'COMPLETED' && '✓ '}
                        {status === 'FAILED' && '✕ '}
                        {status === 'PENDING' && '⋯ '}
                        {status}
                    </span>
                );
            },
        },
    ];

    // Table columns for purchased courses
    const courseColumns = [
        {
            title: 'Tên khóa học',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <div className="font-medium text-gray-800">{text}</div>
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => <div className="font-medium text-gray-800">{formatCurrency(price)}</div>
        },
    ];

    return (
        <Layout className="landing-page">
            <Header />
        <div className='body-content'>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-20xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Wallet Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                        <div className="p-6 sm:p-8">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-50 p-3 rounded-xl">
                                        <Wallet className="text-blue-600 h-6 w-6" />
                                    </div>
                                    <h1 className="text-2xl font-semibold leading-6 text-gray-900">Ví của tôi</h1>
                                </div>
                                <Button type="primary" className="flex items-center gap-2" onClick={() => setShowAddFunds(true)}>
                                    <CreditCard className="h-5 w-5" />
                                    Nạp tiền
                                </Button>
                            </div>
                            <div className="mb-8 flex gap-2 items-center text-gray-600">
                                <TrendingUp size={16} /> Số dư khả dụng: <strong className="text-lg font-semibold text-gray-900">{formatCurrency(walletData.balance)}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <History className="h-6 w-6 text-gray-500" />
                                <h2 className="text-lg font-semibold leading-6 text-gray-900">Lịch sử giao dịch</h2>
                            </div>
                            <Table columns={transactionColumns} dataSource={walletData.transactions} rowKey="id" pagination={{ pageSize: 5 }} />
                        </div>
                    </div>

                    {/* Purchased Courses Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 sm:p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <GraduationCap className="h-6 w-6 text-gray-500" />
                                <h2 className="text-lg font-semibold leading-6 text-gray-900">Khóa học đã mua</h2>
                            </div>
                            <Table columns={courseColumns} dataSource={walletData.purchasedCourses} rowKey="id" pagination={{ pageSize: 5 }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Funds Modal */}
            <Modal
                title="Nạp tiền vào ví"
                visible={showAddFunds}
                onCancel={() => setShowAddFunds(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowAddFunds(false)}>Hủy</Button>,
                    <Button key="submit" type="primary" onClick={handleAddFunds} loading={loading}>Xác nhận</Button>
                ]}
            >
                <Input
                    placeholder="Nhập số tiền"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </Modal>
        </div>
        </Layout>
    );
};

export default IntegratedWallet;
