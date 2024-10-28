import React, { useState, useEffect } from 'react';
import './WalletDetails.css';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';
import axios from 'axios';

interface Course {
    id: string;
    name: string;
    price: number;
}

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    courseId?: string;
    courseName?: string;
    transactionType: 'PURCHASE' | 'DEPOSIT' | 'REFUND';
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

interface WalletData {
    userId: string;
    balance: number;
    transactions: Transaction[];
    purchasedCourses: Course[];
}

const defaultWalletData: WalletData = {
    userId: '',
    balance: 0,
    transactions: [],
    purchasedCourses: []
};

const WalletDetails: React.FC = () => {
    const [walletData, setWalletData] = useState<WalletData>(defaultWalletData);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchWalletDetails();
    }, []);

    const fetchWalletDetails = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get<WalletData>('/api/wallet/details');
            // Validate and sanitize the response data
            const sanitizedData: WalletData = {
                userId: response.data.userId || '',
                balance: typeof response.data.balance === 'number' ? response.data.balance : 0,
                transactions: Array.isArray(response.data.transactions) ? response.data.transactions : [],
                purchasedCourses: Array.isArray(response.data.purchasedCourses) ? response.data.purchasedCourses : []
            };
            setWalletData(sanitizedData);
        } catch (err: any) {
            console.error('Wallet details fetch error:', err);
            setError('Failed to load wallet details. Please try again.');
            setWalletData(defaultWalletData);
        } finally {
            setIsLoading(false);
        }
    };

    const getTransactionStatusBadge = (status: string) => {
        const variants = {
            COMPLETED: 'success',
            PENDING: 'warning',
            FAILED: 'danger'
        };
        return <Badge bg={variants[status as keyof typeof variants]}>{status}</Badge>;
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'PURCHASE':
                return '🛒';
            case 'DEPOSIT':
                return '💰';
            case 'REFUND':
                return '↩️';
            default:
                return '•';
        }
    };

    // Helper function to safely format currency
    const formatCurrency = (amount: number | undefined): string => {
        if (typeof amount !== 'number') return '$0.00';
        return `$${amount.toFixed(2)}`;
    };

    return (
        <Container className="wallet-container">
            <Row className="justify-content-center">
                <Col md={18}>
                    <Card className="wallet-card">
                        <Card.Header className="wallet-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>Physics Course Wallet</h3>
                                <Button variant="outline-primary" onClick={fetchWalletDetails}>
                                    Refresh
                                </Button>
                            </div>
                        </Card.Header>
                        {isLoading ? (
                            <div className="loading-text p-4 text-center">Loading wallet details...</div>
                        ) : error ? (
                            <div className="error-text p-4 text-center">{error}</div>
                        ) : (
                            <Card.Body>
                                <div className="balance-section mb-4">
                                    <h4 className="balance-text">Current Balance</h4>
                                    <h2 className="balance-amount">{formatCurrency(walletData.balance)}</h2>
                                </div>

                                <div className="courses-section mb-4">
                                    <h5>Purchased Physics Courses</h5>
                                    {walletData.purchasedCourses.length > 0 ? (
                                        <ListGroup>
                                            {walletData.purchasedCourses.map((course) => (
                                                <ListGroup.Item key={course.id} className="d-flex justify-content-between align-items-center">
                                                    <span>{course.name}</span>
                                                    <Badge bg="info">{formatCurrency(course.price)}</Badge>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <p className="text-muted text-center">No courses purchased yet</p>
                                    )}
                                </div>

                                <div className="transactions-section">
                                    <h5>Transaction History</h5>
                                    {walletData.transactions.length > 0 ? (
                                        <ListGroup variant="flush" className="transaction-list">
                                            {walletData.transactions.map((transaction) => (
                                                <ListGroup.Item key={transaction.id} className="transaction-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="transaction-info">
                                                            <div className="transaction-header">
                                                                <span className="transaction-icon me-2">
                                                                    {getTransactionIcon(transaction.transactionType)}
                                                                </span>
                                                                <span className="transaction-desc">{transaction.description}</span>
                                                            </div>
                                                            <div className="transaction-details text-muted">
                                                                <small>{transaction.date}</small>
                                                                {transaction.courseName && (
                                                                    <small className="ms-2">Course: {transaction.courseName}</small>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="transaction-right">
                                                            <div className={`transaction-amount ${transaction.amount < 0 ? 'text-danger' : 'text-success'}`}>
                                                                {transaction.amount < 0 ? '-' : '+'}
                                                                {formatCurrency(Math.abs(transaction.amount))}
                                                            </div>
                                                            <div className="transaction-status">
                                                                {getTransactionStatusBadge(transaction.status)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    ) : (
                                        <p className="text-muted text-center">No transactions available</p>
                                    )}
                                </div>
                            </Card.Body>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WalletDetails;