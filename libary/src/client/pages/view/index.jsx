/* 
    Chức năng chính page: Trang xem chi tiết sách trên hệ thống thư viện
    Công nghệ sử dụng: null ( không có công nghệ gì đặc biệt)
    Công nghệ đang phát triển: Chức năng feedback sách, đánh giá sao
*/

import React, { useState, useEffect } from 'react';
import { Typography, Button, Space, Row, Layout, Col, Descriptions, Rate, Input, Empty, Card, message, Tag, Divider } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons'; // Feedback logic, update later
import { useParams } from 'react-router-dom';
import Loading from '../../../shared/components/loadingUI';
import BookService from '../../../shared/services/bookService';
import Feedbacks from '../../components/Feedbacks';
import CommentService from '../../../shared/services/commentService';

const { Title, Text } = Typography;
const { Content } = Layout;

const ViewBook = () => {
    const { id } = useParams();

    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const response = await BookService.getBooksById(id);
                setBook(response.data);
            } catch (error) {
                message.error('An unexpected error occurred while fetching book.');
            }
        };
        fetchBook();
    }, [id]);

    const [feedback, setFeedback] = useState('');
    const [feedbackList, setFeedbackList] = useState([]);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await CommentService.getCommentsByPostId(id);
                setFeedbackList(response.data.data);
            } catch (error) {
                message.error('An unexpected error occurred while fetching feedback.');
            } finally {
                setLoading(false);
            }
        };
        fetchFeedback();
    }, [id]);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const handleSubmitFeedback = () => {
        if (feedback.trim()) {
            const newFeedback = { content: feedback };
            try {
                CommentService.createComment(id, newFeedback);
            } catch (error) {
                message.error('An unexpected error occurred while creating feedback.');
            }
            setFeedbackList([...feedbackList, newFeedback]);
            setFeedback('');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
            {loading ? (
                <Row justify="center">
                    <Loading />
                </Row>
            ) : (
                <Layout>
                    <Content
                        style={{
                            background: '#fff',
                            padding: '32px',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Row justify="center">
                            <Title level={2}>Book Details</Title>
                        </Row>
                        <Row
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-around',
                                padding: 20,
                                gap: 20,
                            }}
                        >
                            <Col span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <img
                                    draggable={false}
                                    src={book.cover || 'https://via.placeholder.com/150'}
                                    alt={book.title}
                                    style={{
                                        width: '300px',
                                        height: '360px',
                                        objectFit: 'cover',
                                        borderRadius: '10px',
                                        marginBottom: 20,
                                        padding: 20,
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    }}
                                />
                                <Title level={4} style={{ margin: '8px 0' }}>
                                    {book.title}
                                </Title>
                                <Space style={{ marginTop: 20 }}>
                                    <Button type="primary">Add to Favorites</Button>
                                    <Button type="default" download={`${book.title}.pdf`} href={book.file}>
                                        Download
                                    </Button>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Descriptions bordered size="small" column={1} style={{ width: '100%', marginTop: 40 }}>
                                    <Descriptions.Item label="Title">{book.title}</Descriptions.Item>
                                    <Descriptions.Item label="Status">{book.status === 'false' ? <Tag color="red">Unavailable</Tag> : <Tag color="green">Available</Tag>}</Descriptions.Item>
                                    <Descriptions.Item label="Author">{book.author}</Descriptions.Item>
                                    <Descriptions.Item label="Genre">{book.genre || 'Undefined'}</Descriptions.Item>
                                    <Descriptions.Item label="Published Date">{book.published_date}</Descriptions.Item>
                                    <Descriptions.Item label="Price">${book.price || '000'}</Descriptions.Item>
                                    <Descriptions.Item label="Introduction">{book.introduction}</Descriptions.Item>
                                </Descriptions>
                                <Row style={{ marginTop: 30 }}>
                                    <Text strong style={{ marginRight: 8 }}>
                                        Rate:
                                    </Text>
                                    <Rate allowHalf defaultValue={4.5} />
                                </Row>
                            </Col>
                        </Row>
                        {/* Feedback Input Section, UPDATE LATER */}
                        <Card
                            style={{
                                display: 'inline-block',
                                width: '80%',
                                textAlign: 'center',
                                marginTop: '24px',
                            }}
                        >
                            <Title level={4} style={{ marginTop: '0' }}>
                                Share your feedback
                            </Title>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px',padding: '20px'}}>
                                <Input
                                    size="large"
                                    placeholder="Share your thoughts about the book..."
                                    value={feedback}
                                    onChange={handleFeedbackChange}
                                    style={{ flex: 1, marginRight: '10px' }}
                                    onPressEnter={handleSubmitFeedback}
                                />
                                <Button type="primary" icon={<ArrowUpOutlined />} onClick={handleSubmitFeedback} />
                            </div>
                            <Divider />
                            <div style={{ display: 'inline-block', textAlign: 'start', width: '90%'}}>
                                {feedbackList.length === 0 ? (
                                    <Empty />
                                ) : (
                                    <Feedbacks comments={feedbackList} />
                                )}
                            </div>
                        </Card>
                    </Content>
                </Layout>
            )}
        </div>
    );
};

export default ViewBook;
