import React, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Input, Table, Layout } from 'antd';
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

const BASE_API_URL = 'https://manim-api-ffh6c8ewbehjc0hn.canadacentral-01.azurewebsites.net/api/wallet/';

const getAuthToken = () => localStorage.getItem('accessToken');

const IntegratedWallet: React.FC = () => {
    // State hooks
    const [walletData] = useState<WalletData>({
        userId: '',
        balance: 0,
        transactions: [],
        purchasedCourses: []
    });
    const [showAddFunds, setShowAddFunds] = useState(false);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);


    // Format number as Vietnamese currency (VND)
    const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(amount);

    // Handle adding funds to wallet
    const handleAddFunds = async (values: { amount: string }) => {
        console.log("Add Funds button clicked"); // Debugging log
        setLoading(true);

        try {
            const token = getAuthToken();
            if (!token) {
                console.error("No auth token found");
                return;
            }

            const response = await axios.post(`${BASE_API_URL}/create`, null, {
                params: { balance: values.amount },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("API Response:", response.data); // Debugging log

            if (response.data?.checkoutUrl) {
                setCheckoutUrl(response.data.checkoutUrl);
                setShowAddFunds(false);
                setShowCheckoutModal(true);
            }
        } catch (error) {
            console.error('Add funds error:', error);
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
                const config = statusConfig[status] || statusConfig.PENDING;
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
                                    <h1 className="text-2xl font-bold text-gray-800">Ví của tôi</h1>
                                </div>
                                <Button
                                    type="primary"
                                    onClick={() => setShowAddFunds(true)}
                                    className="flex items-center gap-2 h-10 px-4 bg-blue-600 hover:bg-blue-700"
                                    icon={<CreditCard className="h-4 w-4" />}
                                >
                                    Nạp tiền
                                </Button>
                            </div>

                            {/* Balance Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <TrendingUp className="text-white h-5 w-5" />
                                    </div>
                                    <p className="text-white/90 font-medium">Số dư khả dụng</p>
                                </div>
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    {formatCurrency(walletData.balance)}
                                </h2>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <p className="text-gray-600 text-sm mb-2">Tổng giao dịch</p>
                                    <p className="text-2xl font-bold text-gray-800">{walletData.transactions.length}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <p className="text-gray-600 text-sm mb-2">Khóa học đã mua</p>
                                    <p className="text-2xl font-bold text-gray-800">{walletData.purchasedCourses.length}</p>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                    <p className="text-gray-600 text-sm mb-2">Giao dịch gần nhất</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {walletData.transactions[0]?.date || 'Chưa có'}
                                    </p>
                                </div>
                            </div>

                            {/* Transactions Section */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        <History className="text-gray-600 h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Lịch sử giao dịch</h2>
                                </div>
                                <Table
                                    dataSource={walletData.transactions}
                                    columns={transactionColumns}
                                    rowKey="id"
                                    pagination={{ pageSize: 5 }}
                                    className="custom-table"
                                />
                            </div>

                            {/* Courses Section */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        <GraduationCap className="text-gray-600 h-5 w-5" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800">Khóa học đã mua</h2>
                                </div>
                                <Table
                                    dataSource={walletData.purchasedCourses}
                                    columns={courseColumns}
                                    rowKey="id"
                                    pagination={{ pageSize: 5 }}
                                    className="custom-table"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Funds Modal */}
            <Modal
                title="Nạp tiền vào ví"
                visible={showAddFunds}
                onCancel={() => setShowAddFunds(false)}
                footer={null}
            >
                <Form onFinish={handleAddFunds}>
                    <Form.Item label="Số tiền" name="amount">
                        <Input
                            type="number"
                            placeholder="Nhập số tiền muốn nạp"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="w-full"
                        >
                            Xác nhận thanh toán
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Checkout Modal */}
            <Modal
                title="Thanh toán"
                visible={showCheckoutModal}
                onCancel={() => setShowCheckoutModal(false)}
                footer={null}
                width={1100}
                centered={true}
            >
                {checkoutUrl && (
                    <iframe
                        src={checkoutUrl}
                        title="Checkout"
                        className="w-full"
                        style={{ height: "80vh", minHeight: "650px" }}
                        frameBorder="0"
                    />
                )}
            </Modal>
        </div>
        </Layout>
    );
};

export default IntegratedWallet;
