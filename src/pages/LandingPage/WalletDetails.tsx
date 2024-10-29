import React, { useState } from 'react';
import { Layout, Button, Modal, Form, Input, Table } from 'antd';
import { Wallet, CreditCard } from 'lucide-react';
import Header from '../../components/Header.tsx';
import './LandingPage.css';

const { Content } = Layout;

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

const getAuthToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
};

const IntegratedWallet: React.FC = () => {
    const [walletData, setWalletData] = useState<WalletData>({
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

    const handleAddFunds = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = getAuthToken();
            if (!token) return;

            const headers: HeadersInit = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            };

            const url = `${BASE_API_URL}/create?balance=${amount}`;

            const response = await fetch(url, {
                method: 'POST',
                headers,
            });

            const data = await response.json();

            if (data && data.checkoutUrl) {  // Changed 'paymentUrl' to 'checkoutUrl'
                setCheckoutUrl(data.checkoutUrl); // Updated to use 'checkoutUrl' here
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


    const handleCheckoutUrlClick = () => {
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const transactionColumns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => formatCurrency(amount),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span className={`status ${status.toLowerCase()}`}>{status}</span>
            ),
        },
    ];

    const courseColumns = [
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => formatCurrency(price),
        },
    ];

    return (
        <Layout className="landing-page">
            <Header />
            <Content>
                <div className="py-8 bg-gray-50">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-white rounded-lg shadow-lg">
                            <div className="p-4 border-b">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Wallet className="text-blue-600" size={24} />
                                        <h2 className="text-xl font-semibold m-0">Ví của tôi</h2>
                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={() => setShowAddFunds(true)}
                                        icon={<CreditCard size={18} />}
                                    >
                                        Nạp tiền
                                    </Button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6">
                                    <p className="text-white/80 text-sm uppercase mb-2">Số dư khả dụng</p>
                                    <h3 className="text-white text-3xl font-bold m-0">
                                        {formatCurrency(walletData.balance)}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold">Lịch sử giao dịch</h3>
                                <Table
                                    dataSource={walletData.transactions}
                                    columns={transactionColumns}
                                    rowKey="id"
                                    pagination={{ pageSize: 5 }}
                                />
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-semibold">Khóa học đã mua</h3>
                                <Table
                                    dataSource={walletData.purchasedCourses}
                                    columns={courseColumns}
                                    rowKey="id"
                                    pagination={{ pageSize: 5 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Content>

            <Modal
                title="Nạp tiền vào ví"
                open={showAddFunds}
                onCancel={() => setShowAddFunds(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowAddFunds(false)}>
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleAddFunds}
                        loading={loading}
                    >
                        Xác nhận thanh toán
                    </Button>
                ]}
            >
                <Form onSubmit={handleAddFunds}>
                    <Form.Item label="Số tiền muốn nạp">
                        <Input
                            type="number"
                            min="0"
                            step="1000"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Nhập số tiền"
                            required
                            disabled={loading}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="Thanh toán"
                open={showCheckoutModal}
                onCancel={() => setShowCheckoutModal(false)}
                footer={[
                    <Button key="cancel" onClick={() => setShowCheckoutModal(false)}>
                        Đóng
                    </Button>
                ]}
                width={800} // Increased width for the modal
            >
                <p>Tiến hành thanh toán bên dưới:</p>
                {checkoutUrl && (
                    <iframe
                        src={checkoutUrl}
                        style={{ width: '100%', height: '600px', border: 'none' }} // Increased iframe height
                        title="Checkout"
                    ></iframe>
                )}
            </Modal>


        </Layout>
    );
};

export default IntegratedWallet;