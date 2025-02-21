import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, message, Layout, Typography, Row, Skeleton } from 'antd';
import { EyeOutlined, CheckOutlined } from '@ant-design/icons';
import BookService from '../../../shared/services/bookService';
import { truncateText } from '../../../shared/utils';
const { Title } = Typography;

const BookChecker = () => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await BookService.getPendingBooks();
                setBooks(response.data);
            } catch (error) {
                message.error('Error fetching data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text) => truncateText(text, 30),
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (text) => truncateText(text, 20),
        },
        {
            title: 'Introduction',
            dataIndex: 'introduction',
            key: 'introduction',
            render: (text) => truncateText(text, 50),
        },
        {
            title: 'Published Date',
            dataIndex: 'published_date',
            key: 'published_date',
            render: (text) => text === null ? 'N/A' : text
        },
        {
            title: 'View',
            key: 'view',
            render: (book) => (
                <Button type="default" onClick={() => handleView(book.id)}>
                    <EyeOutlined />
                </Button>
            )
        },
        {
            title: 'Checker',
            key: 'checker',
            render: (book) => (
                <Button type="primary" onClick={() => handleCheckStatus(book.id)}>
                    <CheckOutlined />
                </Button>
            ),
        },

    ];

    const handleCheckStatus = async (id) => {
        try {
            const response = await BookService.updateStatus(id);
            if (response.success) {
                message.success('Book approved successfully');
                setBooks((prevBooks) =>
                    prevBooks.filter((book) => book.id !== id)
                );
            }
        } catch (error) {
            message.error('Error approving book');
        }
    };

    const handleView = (id) => {
        navigate(`/admin/view_book/${id}`);
    };

    return (
        <Layout >
            <Title level={3}>Book Checker</Title>
            {loading ? (
                <Row justify="center">
                    <Skeleton active />
                </Row>
            ) : (
                <Table
                    columns={columns}
                    dataSource={books}
                    loading={loading}
                    rowKey="_id"
                    scroll={{
                        x: 'max-content',
                    }}
                />)}
        </Layout>
    );
};

export default BookChecker;
