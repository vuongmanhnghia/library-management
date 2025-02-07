/* 
    Chức năng chính page: Trang chính của website thể hiện toàn bộ sách của người dũng đã đăng 
    Công nghệ sử dụng: null ( không có công nghệ gì đặc biệt)
*/

import { Layout, Row, Button, Result, Pagination, message, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BookTikets from '../../components/bookTikets';
import Loading from '../../../shared/components/loadingUI';
import { setBooks } from '../../../redux/bookSlice';
import React from 'react';
import Title from 'antd/es/typography/Title';
import BookService from '../../../shared/services/bookService';

const MyBooks = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await BookService.getUserBooks(1, 7);
            if (response.success) {
                dispatch(setBooks(response.data));
            } else {
                console.log(response.message);
            }
        } catch (error) {
            message.error('An unexpected error occurred while fetching books.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [dispatch, setLoading]);

    const isBooksEmpty = !Array.isArray(books) || books.length === 0;

    return (
        <Layout style={{ padding: '24px' }}>
            <Row justify="center">
                <Title level={2}>List of my books</Title>
            </Row>
            <Row justify="center" gutter={[16, 16]}>
                {loading ? (
                    <Loading />
                ) : isBooksEmpty ? (
                    <Result
                        style={{ marginTop: '48px' }}
                        title="No your upload books found. Upload your first book now!"
                    />
                ) : (
                    books.map((book) => (
                        <Col xs={24} sm={24} md={12} lg={12}>
                            <BookTikets
                                key={book.id}
                                id={book.id}
                                img={book.cover}
                                title={book.title}
                                create_date={book.created_at}
                                edit_date={book.updated_at}
                                file={book.file}
                                status={book.status}
                            />
                        </Col>
                    ))
                )}
            </Row>
            <Row justify="center">
                <Button type='dashed' onClick={() => navigate('/upload-book')} style={{ marginTop: '24px' }}>
                    Upload new book
                </Button>
            </Row>
            {/* Pagination */}
            <Row justify="center" style={{ marginTop: '24px' }}>
                <Pagination
                    current={1}
                    total={12}
                    pageSize={24}
                    showSizeChanger={false}
                    style={{ textAlign: 'center' }}
                />
            </Row>
        </Layout>
    );
};

export default MyBooks;
