import { Layout, Row, Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookTikets from '../../components/bookTikets';
import React from 'react';

const MyBooks = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const fetchBooks = async () => {
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
                setBooks(data.data);
            } else {
                console.error('Error fetching books:', response);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <Layout style={{ padding: '24px' }}>
            <Row justify="center">
                <h2 style={{ fontWeight: 'bold', marginBottom: '24px' }}>List of my books</h2>
            </Row>
            <Row justify="center">
                {!books.length ? (
                        <Result
                            style={{ marginTop: '48px' }}
                            title="No your upload books found. Upload your first book now!"
                            extra={<Button onClick={() => navigate('/upload-book')}>Go to upload</Button>}
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
                        />
                    ))
                )}
            </Row>
        </Layout>
    );
};

export default MyBooks;
