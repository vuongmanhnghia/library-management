import React, { useState } from "react";
import {
    Button,
    Form,
    Row,
    Col,
    Input,
    Upload,
    DatePicker,
    Typography,
    message,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

const uploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
        authorization: "authorization-text",
    },
    onChange(info) {
        if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    progress: {
        strokeColor: {
            "0%": "#108ee9",
            "100%": "#87d068",
        },
        strokeWidth: 3,
        format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
};

const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

const AddBook = () => {
    const [loading, setLoading] = useState(false);

    const handleFinish = (values) => {
        setLoading(true);
        console.log("Form Values:", values);
        setTimeout(() => {
            setLoading(false);
            message.success("Book added successfully!");
        }, 2000);
    };

    return (
        <div
            style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Title level={2} style={{ marginBottom: "24px" }}>
                Upload New Book
            </Title>

            <Row gutter={[16, 16]} style={{ width: "100%", justifyContent: "center", marginTop: "16px" }}>
                <Col xs={24} sm={16} md={12} lg={12}>
                    <Form
                        name="addBookForm"
                        labelCol={{ flex: "120px" }}
                        wrapperCol={{ flex: 1 }}
                        labelAlign="left"
                        size="large"
                        colon={false}
                        style={{ maxWidth: 800 }}
                        onFinish={handleFinish}
                    >
                        <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the book title." }]}>
                            <Input placeholder="Title of book" />
                        </Form.Item>
                        <Form.Item label="Author" name="author" rules={[{ required: true, message: "Please enter the author." }]}>
                            <Input placeholder="Author" />
                        </Form.Item>
                        <Form.Item label="Publish Date" name="date" rules={[{ required: true, message: "Please select a publish date." }]}>
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item label="Introduction" name="introduction" rules={[{ required: true, message: "Please provide an introduction." }]}>
                            <Input.TextArea placeholder="Brief introduction of the book" />
                        </Form.Item>
                        <Form.Item
                            label="Cover Upload"
                            name="coverUpload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: "Please upload a book cover." }]}
                        >
                            <Upload action="/api/upload" listType="picture-card" maxCount={1}>
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="File Upload" name="fileUpload" rules={[{ required: true, message: "Please upload the book file." }]}>
                            <Upload {...uploadProps} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Button type="primary" style={{ marginTop: "16px" }} loading={loading} htmlType="submit">
                    {loading ? "Uploading..." : "Upload"}
                </Button>

            </Row>
        </div>
    );
};

export default AddBook;
