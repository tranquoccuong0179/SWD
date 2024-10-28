import React, { useState, useEffect } from 'react';
import './WalletDetails.css';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
}

interface WalletData {
    balance: number;
    transactions: Transaction[];
}

const WalletDetails: React.FC = () => {
    const [walletData, setWalletData] = useState<WalletData | null>(null);
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
            setWalletData(response.data);
        } catch (err: any) {
            setError('Failed to load wallet details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="wallet-container">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="wallet-card">
                        <Card.Header className="wallet-header">
                            <h3>Wallet Details</h3>
                            <Button variant="outline-primary" onClick={fetchWalletDetails}>
                                Refresh
                            </Button>
                        </Card.Header>
                        {isLoading ? (
                            <div className="loading-text">Loading...</div>
                        ) : error ? (
                            <div className="error-text">{error}</div>
                        ) : walletData ? (
                            <Card.Body>
                                <h4 className="balance-text">Balance: ${walletData.balance.toFixed(2)}</h4>
                                <ListGroup variant="flush" className="transaction-list">
                                    {walletData.transactions.map((transaction) => (
                                        <ListGroup.Item key={transaction.id} className="transaction-item">
                                            <div className="transaction-date">{transaction.date}</div>
                                            <div className="transaction-desc">{transaction.description}</div>
                                            <div className={`transaction-amount ${transaction.amount < 0 ? 'negative' : 'positive'}`}>
                                                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        ) : (
                            <div className="no-data-text">No wallet details available.</div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WalletDetails;
