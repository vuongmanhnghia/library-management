import React, { useState } from 'react';
import { Button, Form, Row, Col, Input, Upload, DatePicker, Typography, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CardRender from '../../components/bookCards';
import BookService from '../../../shared/services/bookService';
import { getBase64, truncateText } from '../../../shared/utils';
import dayjs from 'dayjs';

const { Title } = Typography;
const defaultImage = 'https://via.placeholder.com/150';

const UploadBook = () => {
    const [loading, setLoading] = useState(false);
    const [previewCover, setPreviewCover] = useState(defaultImage);
    const [previewTitle, setPreviewTitle] = useState('Title of book');
    const [previewAuthor, setPreviewAuthor] = useState('author');
    const [previewDate, setPreviewDate] = useState(null);
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
                published_date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : null,
                introduction: values.introduction,
                cover: encodedCover,
                file: encodedFile,
            };
            try {
                const response = await BookService.create(payload);
                if (response.success) {
                    message.success(response.message);
                } else {
                    message.error(response.message);
                }
            } catch (error) {
                message.error("An unexpected error occurred while creating books.");
            }
        } catch (error) {
            message.error('An unexpected error occurred while creating books.');
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
        setPreviewDate(date ? dayjs(date).format('YYYY-MM-DD') : null);
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
            <Title level={3} style={{ marginBottom: '24px' }}>
                Upload New Book
            </Title>

            <Row gutter={[16, 16]} style={{ width: '100%', justifyContent: 'space-around', marginTop: '16px' }}>
                <Col xs={24} sm={16} md={12} lg={12}>
                    <Form
                        name="UploadBookForm"
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
                                beforeUpload={(file) => {
                                    const isImage = file.type.startsWith('image/');
                                    const isSmallEnough = file.size / 1024 / 1024 < 1.5;
                                    if (!isImage) {
                                        message.error(`${truncateText(file.name, 10)} is not an image file`);
                                        return Upload.LIST_IGNORE;
                                    }
                                    if (!isSmallEnough) {
                                        message.error(`${truncateText(file.name, 10)} is larger than 1,5MB`);
                                        return Upload.LIST_IGNORE;
                                    }
                                    handlePreviewCover(file);
                                    return false;
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
                            <Upload
                                maxCount={1}
                                beforeUpload={(file) => {
                                    const isPDF = file.type === 'application/pdf';
                                    const isSmallEnough = file.size / 1024 / 1024 < 4;
                                    if (!isPDF) {
                                        message.error(`${truncateText(file.name, 10)} is not a PDF file`);
                                        return Upload.LIST_IGNORE;
                                    }
                                    if (!isSmallEnough) {
                                        message.error(`${truncateText(file.name, 10)} is larger than 4MB`);
                                        return Upload.LIST_IGNORE;
                                    }
                                    return false;
                                }}
                            >
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
                <Col xs={24} sm={8} md={6} lg={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Title level={5} style={{ marginTop: '0' }}>
                        Preview Book
                    </Title>
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
            </Row>
        </div>
    );
};

export default UploadBook;
