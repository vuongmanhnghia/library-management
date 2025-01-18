import { Card, Button, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeBook } from '../../redux/bookSlice';
import { useCallback } from 'react';
import React from 'react';

const BookTikets = ({ id, img, title, create_date, edit_date }) => {
    const dispatch = useDispatch();

    const removeBook = useCallback(async (id) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete book');
            }

            dispatch(removeBook(id));
            console.log(`Book with ID ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting book:', error.message);
        }
    }, [dispatch]);

    return (
        <Card style={{ width: '80%', margin: '8px', padding: '8px' }}>
            <Row gutter={16} align="middle">
                {/* Ảnh bìa */}
                <Col flex="120px">
                    <img
                        draggable={false}
                        src={img}
                        alt="Preview Cover"
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            objectPosition: 'top center',
                        }}
                    />
                </Col>

                {/* Nội dung */}
                <Col flex="auto">
                    <Card.Meta
                        description={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h3 style={{ fontWeight: 'bold', color: 'var(--ant-primary-8)', margin: '0' }}>
                                        {title}
                                    </h3>
                                    <span style={{ fontWeight: 'bold' }}>Published Date:</span> {create_date.split('T')[0]}
                                    <br />
                                    <span style={{ fontWeight: 'bold' }}>Last Edit:</span> {edit_date.split('T')[0]}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginRight: '8px' }}>
                                    <Button>
                                        <DownloadOutlined />
                                    </Button>
                                    <Button>
                                        <EditOutlined />
                                    </Button>
                                    <Button danger onClick={() => removeBook(id)}>
                                        <DeleteOutlined />
                                    </Button>
                                </div>
                            </div>
                        }
                    />
                </Col>
            </Row>
        </Card>
    );
};

export default BookTikets;
