import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Input, Upload, DatePicker, Typography, message } from 'antd';
import { useParams } from 'react-router-dom';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CardRender from '../../components/bookCards';
import { getBase64 } from '../../utils';
import dayjs from 'dayjs';
import axios from 'axios';

const { Title } = Typography;

const defaultImage = 'https://via.placeholder.com/150';

const EditBook = () => {
    const { id } = useParams();
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('access_token');

    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState({});

    const [form] = Form.useForm();

    const [previewCover, setPreviewCover] = useState(defaultImage);
    const [previewTitle, setPreviewTitle] = useState('Title of book');
    const [previewAuthor, setPreviewAuthor] = useState('author');
    const [previewDate, setPreviewDate] = useState('0000-00-00');
    const [previewIntroduction, setPreviewIntroduction] = useState('This is a brief introduction of the book.');

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/books/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                const fetchedBook = response.data.data;
                setBook(fetchedBook);
                setPreviewCover(fetchedBook.cover || defaultImage);
                setPreviewTitle(fetchedBook.title || 'Title of book');
                setPreviewAuthor(fetchedBook.author || 'author');
                setPreviewDate(fetchedBook.published_date || '0000-00-00');
                setPreviewIntroduction(fetchedBook.introduction || 'This is a brief introduction of the book.');

                // Chuẩn bị fileList cho upload
                const coverFileList = fetchedBook.cover
                    ? [{ uid: '-1', name: `${fetchedBook.title}.jpg`, status: 'done', url: fetchedBook.cover }]
                    : [];
                const fileFileList = fetchedBook.file
                    ? [{ uid: '-2', name: `${fetchedBook.title}.pdf`, status: 'done', url: fetchedBook.file }]
                    : [];

                // Update form fields với dữ liệu hiện tại
                form.setFieldsValue({
                    title: fetchedBook.title,
                    author: fetchedBook.author,
                    date: fetchedBook.published_date ? dayjs(fetchedBook.published_date) : null,
                    introduction: fetchedBook.introduction,
                    coverUpload: coverFileList,
                    fileUpload: fileFileList,
                });
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id, form]);

    const handleFinish = async (values) => {
        setLoading(true);
        try {
            const coverFile = values.coverUpload?.[0]?.originFileObj;
            const bookFile = values.fileUpload?.[0]?.originFileObj;

            const encodedCover = coverFile ? await getBase64(coverFile) : null;
            const encodedFile = bookFile ? await getBase64(bookFile) : null;

            const payload = {
                ...book, // Giữ lại các trường cũ
                title: values.title,
                author: values.author,
                published_date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : book.published_date,
                introduction: values.introduction,
                cover: encodedCover || book.cover,
                file: encodedFile || book.file,
            };

            await fetch(
                `${apiUrl}/books/${id}`,
                {
                    data: payload,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'PUT',
                },
            );
            message.success('Book edited successfully.');
        } catch (error) {
            message.error('Failed to edit the book. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

    const handlePreviewCover = async (file) => {
        if (file) {
            const preview = await getBase64(file);
            setPreviewCover(preview);
        } else {
            setPreviewCover(defaultImage);
        }
    };

    return (
        <div
            style={{
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Title level={2} style={{ marginBottom: '24px' }}>
                Edit Book
            </Title>

            <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'space-around', marginTop: '16px' }}>
                <Col
                    xs={24}
                    sm={8}
                    md={6}
                    lg={8}
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                >
                    <CardRender
                        img={previewCover}
                        title={previewTitle}
                        author={previewAuthor}
                        date={previewDate}
                        intro={previewIntroduction}
                        canHover={false}
                        widthCard={280}
                        heightCard={280}
                        states={true}
                    />
                </Col>
                <Col xs={24} sm={16} md={12} lg={12}>
                    <Form
                        form={form}
                        name="EditBookForm"
                        labelCol={{ flex: '120px' }}
                        wrapperCol={{ flex: 1 }}
                        labelAlign="left"
                        size="large"
                        colon={false}
                        style={{ maxWidth: 800 }}
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please enter the book title.' }]}
                        >
                            <Input placeholder="Title of book" onChange={(e) => setPreviewTitle(e.target.value)} />
                        </Form.Item>
                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Please enter the author.' }]}
                        >
                            <Input placeholder="Author" onChange={(e) => setPreviewAuthor(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Publish Date" name="date">
                            <DatePicker
                                style={{ width: '100%' }}
                                onChange={(date) =>
                                    setPreviewDate(date ? dayjs(date).format('YYYY-MM-DD') : '0000-00-00')
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            label="Introduction"
                            name="introduction"
                            rules={[{ required: true, message: 'Please provide an introduction.' }]}
                        >
                            <Input.TextArea
                                placeholder="Brief introduction of the book"
                                onChange={(e) => setPreviewIntroduction(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Cover Upload"
                            name="coverUpload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: 'Please upload a book cover.' }]}
                        >
                            <Upload
                                listType="picture-card"
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={(info) => {
                                    const file = info.fileList[0]?.originFileObj || null;
                                    handlePreviewCover(file);
                                }}
                                defaultFileList={
                                    book.cover
                                        ? [{ uid: '-1', name: 'cover.jpg', status: 'done', url: book.cover }]
                                        : []
                                }
                            >
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="File Upload"
                            name="fileUpload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: 'Please upload the book file.' }]}
                        >
                            <Upload
                                maxCount={1}
                                beforeUpload={() => false}
                                defaultFileList={
                                    book.file ? [{ uid: '-2', name: 'book.pdf', status: 'done', url: book.file }] : []
                                }
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button type="primary" loading={loading} htmlType="submit">
                                {loading ? 'Editing...' : 'Edit Book'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default EditBook;
