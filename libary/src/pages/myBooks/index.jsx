import { Layout, Row, Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch for dispatching actions
import BookTikets from '../../components/bookTikets';
import Loading from '../../components/loadingUI';
import { setBooks } from '../../redux/bookSlice'; // Import setBooks action

import React from 'react';
import Title from 'antd/es/typography/Title';

const MyBooks = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch(); // Initialize dispatch

    // Accessing books from Redux state using useSelector
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
                // Dispatching setBooks action to update Redux state
                dispatch(setBooks(data.data)); // Correct way to dispatch action
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
    }, [dispatch]); // Added dispatch to dependencies

    return (
        <Layout style={{ padding: '24px' }}>
            <Row justify="center">
                <Title level={2}>List of my books</Title>
            </Row>
            <Row justify="center">
                {loading ? (
                    <Loading />
                ) : !books.length ? (
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
                <Button onClick={() => navigate('/upload-book')} style={{ marginTop: '24px' }}>
                    Upload new book
                </Button>
            </Row>
        </Layout>
    );
};

export default MyBooks;
