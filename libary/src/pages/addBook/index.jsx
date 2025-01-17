import React, { useState } from 'react';
import { Button, Form, Row, Col, Input, Upload, DatePicker, Typography, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CardRender from '../../components/cardRender';
import { getBase64 } from '../../utils';

const { Title } = Typography;

const defaultImage = 'https://via.placeholder.com/150';

const AddBook = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(false);
    const [previewCover, setPreviewCover] = useState(defaultImage);
    const [previewTitle, setPreviewTitle] = useState('Title of book');
    const [previewAuthor, setPreviewAuthor] = useState('author');
    const [previewDate, setPreviewDate] = useState('0000-00-00');
    const [previewIntroduction, setPreviewIntroduction] = useState('This is a brief introduction of the book.');

    const handleFinish = async (values) => {
        setLoading(true);

        try {
            const coverFile = values.coverUpload?.[0]?.originFileObj;
            const bookFile = values.fileUpload?.[0]?.originFileObj;

            const encodedCover = coverFile ? await getBase64(coverFile) : null;
            const encodedFile = bookFile ? await getBase64(bookFile) : null;

            const payload = {
                title: values.title,
                author: values.author,
                published_date: values.date ? values.date.format('YYYY-MM-DD') : '0000-00-00', // Nếu không có date, trả về null
                introduction: values.introduction,
                cover: encodedCover,
                file: encodedFile,
            };

            // Lấy token từ localStorage
            const token = localStorage.getItem('access_token');

            // API call
            const response = await fetch(`${apiUrl}/books/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setLoading(false);
            message.success('Book added successfully!');
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            message.error('Failed to add the book. Please try again.');
        }
    };

    const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

    const handlePreviewCover = async (file) => {
        if (file) {
            const preview = await getBase64(file);
            setPreviewCover(preview);
        } else {
            setPreviewCover(null);
        }
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setPreviewTitle(title);
    };

    const handelAuthorChange = (e) => {
        const author = e.target.value;
        setPreviewAuthor(author);
    };

    const handleDateChange = (date) => {
        date = date ? date.format('YYYY-MM-DD') : '0000-00-00';
        setPreviewDate(date);
    };

    const handelIntroductionChange = (e) => {
        const introduction = e.target.value;
        setPreviewIntroduction(introduction);
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
                Upload New Book
            </Title>

            <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'space-around', marginTop: '16px' }}>
                <Col xs={24} sm={16} md={12} lg={12}>
                    <Form
                        name="addBookForm"
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
                            <Input placeholder="Title of book" onChange={handleTitleChange} />
                        </Form.Item>
                        <Form.Item
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Please enter the author.' }]}
                        >
                            <Input placeholder="Author" onChange={handelAuthorChange} />
                        </Form.Item>
                        <Form.Item label="Publish Date" name="date">
                            <DatePicker style={{ width: '100%' }} onChange={handleDateChange} />
                        </Form.Item>
                        <Form.Item
                            label="Introduction"
                            name="introduction"
                            rules={[{ required: true, message: 'Please provide an introduction.' }]}
                        >
                            <Input.TextArea
                                placeholder="Brief introduction of the book"
                                onChange={handelIntroductionChange}
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
                            <Upload maxCount={1} beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                            <Button type="primary" loading={loading} htmlType="submit">
                                {loading ? 'Uploading...' : 'Upload'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col
                    xs={24}
                    sm={8}
                    md={6}
                    lg={8}
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                >
                    <Title level={5}>Preview Book</Title>
                    <CardRender
                        img={previewCover}
                        title={previewTitle}
                        author={previewAuthor}
                        date={previewDate}
                        intro={previewIntroduction}
                        canHover={false}
                        widthCard={280}
                        heightCard={280}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default AddBook;
