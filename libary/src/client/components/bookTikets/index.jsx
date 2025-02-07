import { Card, Button, Row, Col, message, Modal, Tag, Image, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { removeBook } from '../../../redux/bookSlice';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import React from 'react';

const { Title } = Typography;

const BookTikets = ({ id, img, title, create_date, edit_date, file, status }) => {
    const navigate = useNavigate();
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
                dispatch(removeBook(id));
            } catch (error) {
                console.error('Error deleting book:', error.message);
                message.error('Failed to delete the book');
            }
        },
        [dispatch],
    );

    const confirmDelete = (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this book?',
            content: 'This action cannot be undone.',
            onOk: () => handelDeleteBook(id),
            onCancel: () => {
                message.info('Delete action canceled');
            },
            okText: 'Yes, Delete',
            cancelText: 'Cancel',
            okButtonProps: {
                danger: true,
            },
        });
    };

    return (
        <Card style={{ width: '100%', margin: '8px 0', padding: '8px' }}>
            <Row gutter={[16, 16]} align="middle">
                {/* Ảnh bìa */}
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Image
                        width="100%"
                        src={img}
                        alt={title}
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                </Col>

                {/* Nội dung */}
                <Col xs={24} sm={24} md={16} lg={18}>
                    <Card.Meta
                        description={
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div>
                                    <Title level={5} style={{ fontWeight: 'bold', color: 'var(--ant-primary-8)', margin: '0' }}>
                                        {title}
                                    </Title>
                                    <span style={{ fontWeight: 'bold' }}>Upload Date:</span>{' '}
                                    {create_date.split('T')[0]}
                                    <br />
                                    <span style={{ fontWeight: 'bold' }}>Last Edit:</span> {edit_date.split('T')[0]}
                                    <br />
                                    <span style={{ fontWeight: 'bold' }}>Status:</span> {status === 'false' ? <Tag color="red">Inactive</Tag> : <Tag color="green">Active</Tag>}
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <Button download={`${title}.pdf`} href={file} icon={<DownloadOutlined />}>
                                        Download
                                    </Button>
                                    <Button onClick={() => navigate(`/view-book/${id}`)} icon={<EyeOutlined />}>
                                        View
                                    </Button>
                                    <Button onClick={() => navigate(`/edit-book/${id}`)} icon={<EditOutlined />}>
                                        Edit
                                    </Button>
                                    <Button danger onClick={() => confirmDelete(id)} icon={<DeleteOutlined />}>
                                        Delete
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