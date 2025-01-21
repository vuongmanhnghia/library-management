/* 
    Chức năng chính page: Trang chính của website thể hiện toàn bộ sách của người dũng đã đăng 
    Công nghệ sử dụng: null ( không có công nghệ gì đặc biệt)
*/

import { Layout, Row, Button, Result, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import BookTikets from '../../components/bookTikets';
import Loading from '../../components/loadingUI';
import { setBooks } from '../../redux/bookSlice'; 
import React from 'react';
import Title from 'antd/es/typography/Title';

const MyBooks = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch(); 
    const books = useSelector((state) => state.books.books);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${apiUrl}/users/my-books`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                dispatch(setBooks(data.data || [])); 
            } else {
                console.error('Error fetching books:', response);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, [dispatch]); 

    const isBooksEmpty = !Array.isArray(books) || books.length === 0;

    return (
        <Layout style={{ padding: '24px' }}>
            <Row justify="center">
                <Title level={2}>List of my books</Title>
            </Row>
            <Row justify="center">
                {loading ? (
                    <Loading />
                ) : isBooksEmpty ? (
                    <Result
                        style={{ marginTop: '48px' }}
                        title="No your upload books found. Upload your first book now!"
                    />
                ) : (
                    books.map((book) => (
                        <BookTikets
                            key={book.id}
                            id={book.id}
                            img={book.cover}
                            title={book.title}
                            create_date={book.created_at}
                            edit_date={book.updated_at}
                            file={book.file}
                        />
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
