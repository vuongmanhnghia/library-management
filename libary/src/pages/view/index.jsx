import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewBook = () => {
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('access_token');
    const [book, setBook] = useState({});

    const fetchBook = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/books/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching book:', error);
            throw error;
        }
    };

    useEffect(() => {
        const getBook = async () => {
            const fetchedBook = await fetchBook(id);
            setBook(fetchedBook.data);
        };
        getBook();
    }, [id]);


    return (
        <div>
            <h1>View Book</h1>
            <p>Book ID: {id}</p>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            {/* Add other book details here */}
        </div>
    );
};

export default ViewBook;
