import React, { useEffect, useState } from 'react';
import { Table, Button, Layout, Typography, message, Row, Modal } from 'antd';
import BookService from '../../../shared/services/bookService';
import Loading from '../../../shared/components/loadingUI';
import { truncateText } from '../../../shared/utils';

const { Title } = Typography;

const AllBooks = () => {
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]); // Sử dụng useState để lưu trữ dữ liệu sách
    const currentPage = 1; // Bạn có thể lấy số trang từ state hoặc props nếu cần

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            const response = await BookService.getAll(currentPage, 8);

            if (response.success) {
                const fetchedBooks = Array.isArray(response.data.books) ? response.data.books : [];
                setBooks(fetchedBooks); // Lưu sách vào state
            }

            setLoading(false);
        };

        fetchBooks();
    }, [currentPage]); // Dependency array có currentPage

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
            console.log(response);
            if (response.success) {
                message.success('Book unapproved successfully');
                setBooks((prevBooks) =>
                    prevBooks.filter((book) => book.id !== id)
                );
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
                    const response = await BookService.deleteBook(id);  // Thay bằng API xóa sách
                    if (response.success) {
                        message.success('Book deleted successfully');
                        setBooks((prevBooks) =>
                            prevBooks.filter((book) => book.id !== id)
                        );
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
                dataSource={books}  // Dữ liệu lấy từ state books
                loading={loading}
                rowKey="_id"
            />)}
        </Layout>
    );
};

export default AllBooks;
