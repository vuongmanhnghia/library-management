import React, { useEffect, useState } from 'react';
import { Table, Button, Layout, Typography, message, Row, Modal } from 'antd';
import BookService from '../../../shared/services/bookService';
import Loading from '../../../shared/components/loadingUI';
import { truncateText } from '../../../shared/utils';

const { Title } = Typography;

const AllBooks = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await BookService.getAll(currentPage, perPage);
                console.log(response);
                if (response.success) {
                    setBooks(response.data.books || []);
                    setTotalBooks(response.data.total_books || 0);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                message.error('Error fetching books');
            }
            setLoading(false);
        };

        fetchBooks();
    }, [currentPage]);

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
        },
        {
            title: 'View',
            key: 'view',
            render: (book) => (
                <Button type="default" onClick={() => handleView(book.id)}>
                    View
                </Button>
            )
        },
        {
            title: 'Approve',
            key: 'approve',
            render: (book) => (
                <Button type="default" onClick={() => handleCheckStatus(book.id)}>
                    Unapprove
                </Button>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (book) => (
                <Button type="primary" onClick={() => handleDelete(book.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    const handleCheckStatus = async (id) => {
        try {
            const response = await BookService.updateStatus(id);
            if (response.success) {
                message.success('Book unapproved successfully');
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            }
        } catch (error) {
            message.error('Error approving book');
        }
    };

    const handleView = (id) => {
        console.log(id);
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this book?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    const response = await BookService.deleteBook(id);
                    if (response.success) {
                        message.success('Book deleted successfully');
                        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
                    }
                } catch (error) {
                    message.error('Error deleting book');
                }
            },
            onCancel: () => {
                message.info('Delete action canceled');
            },
        });
    };

    return (
        <Layout>
            <Title level={3}>All Books</Title>
            {loading ? (
                <Row justify="center">
                    <Loading />
                </Row>
            ) : (
                <Table
                    columns={columns}
                    dataSource={books}
                    loading={loading}
                    rowKey="_id"
                    pagination={{
                        current: currentPage,
                        pageSize: perPage,
                        total: totalBooks,
                        onChange: (page) => setCurrentPage(page),
                    }}
                />
            )}
        </Layout>
    );
};

export default AllBooks;
