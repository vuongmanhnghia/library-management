/* 
    Chức năng chính page: Cho phép chỉnh sửa sách (người chủ sở hữu cuốn sách đó và admin mới được sửa)
    Công nghệ sử dụng: dayjs (fomat ngày tháng), mã hóa base64 (giúp upload tài liệu lên server- tạm thời)
*/

import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Input, Upload, DatePicker, Typography, message } from 'antd';
import { useParams } from 'react-router-dom';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import CardRender from '../../components/bookCards';
import { getBase64, truncateText } from '../../../shared/utils';
import BookService from '../../../shared/services/bookService';
import dayjs from 'dayjs';

const { Title } = Typography;
const defaultImage = 'https://via.placeholder.com/280x280.png?text=No+Cover';
const EditBook = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [book, setBook] = useState({});
    const [form] = Form.useForm();
    const [previewCover, setPreviewCover] = useState(defaultImage);
    const [previewTitle, setPreviewTitle] = useState('Title of book');
    const [previewAuthor, setPreviewAuthor] = useState('author');
    const [previewDate, setPreviewDate] = useState(null);
    const [previewIntroduction, setPreviewIntroduction] = useState('This is a brief introduction of the book.');

    useEffect(() => {
        const fetchBook = async () => {
            setLoading(true);
            try {
                await BookService.getBooksById(id).then((response) => {
                    const result = response.data;
                    setBook(result);
                    setPreviewCover(result.cover || defaultImage);
                    setPreviewTitle(result.title || 'Title of book');
                    setPreviewAuthor(result.author || 'author');
                    setPreviewDate(result.published_date || null);
                    setPreviewIntroduction(result.introduction || 'This is a brief introduction of the book.');

                    
                    const coverFileList = result.cover
                        ? [{ uid: '-1', name: `${result.title}.jpg`, status: 'done', url: result.cover }]
                        : [];
                    const fileFileList = result.file
                        ? [{ uid: '-2', name: `${result.title}.pdf`, status: 'done', url: result.file }]
                        : [];

                    
                    form.setFieldsValue({
                        title: result.title,
                        author: result.author,
                        date: result.published_date ? dayjs(result.published_date) : null,
                        introduction: result.introduction,
                        coverUpload: coverFileList,
                        fileUpload: fileFileList,
                    });
                });
            } catch (error) {
                message.error('Failed to fetch book details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id, form]);

    const handleFinish = async (values) => {
        setLoading(true);
        const coverFile = values.coverUpload?.[0]?.originFileObj;
        const bookFile = values.fileUpload?.[0]?.originFileObj;

        const encodedCover = coverFile ? await getBase64(coverFile) : null;
        const encodedFile = bookFile ? await getBase64(bookFile) : null;

        const payload = {
            ...book, 
            title: values.title,
            author: values.author,
            published_date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : book.published_date,
            introduction: values.introduction,
            cover: encodedCover || book.cover,
            file: encodedFile || book.file,
        };
        try {
            const response = await BookService.update(id, payload);
            if (response.success) {
                message.success(response.message);
            } else {
                message.error(response.message);
            }
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
