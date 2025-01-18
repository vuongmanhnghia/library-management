import { Card, Button, Row, Col, message } from 'antd';
import { EditOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeBook } from '../../redux/bookSlice';
import { useCallback } from 'react';
import React from 'react';

const BookTikets = ({ id, img, title, create_date, edit_date, file }) => {
    const dispatch = useDispatch();

    const handelDeleteBook = useCallback(
        async (id) => {
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

                message.success('Delete book successfully');
                // Dispatching removeBook action to update Redux state
                dispatch(removeBook(id));
            } catch (error) {
                console.error('Error deleting book:', error.message);
                message.error('Failed to delete the book');
            }
        },
        [dispatch]
    );

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
                                    <span style={{ fontWeight: 'bold' }}>Published Date:</span>{' '}
                                    {create_date.split('T')[0]}
                                    <br />
                                    <span style={{ fontWeight: 'bold' }}>Last Edit:</span> {edit_date.split('T')[0]}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginRight: '8px' }}>
                                    <Button download={file} href={file}>
                                        <DownloadOutlined />
                                    </Button>
                                    <Button>
                                        <EyeOutlined />
                                    </Button>
                                    <Button>
                                        <EditOutlined />
                                    </Button>
                                    <Button danger onClick={() => handelDeleteBook(id)}>
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
