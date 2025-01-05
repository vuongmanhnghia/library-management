import React from "react";
import { Button, Form, Row, Col } from "antd";
import { Input, Upload, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const normFile = (e) => {
if (Array.isArray(e)) {
return e;
}
return e?.fileList;
};
const AddBook = () => {
return (
<div style={{ padding: "16px", display: "flex",flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
    <Title level={2} style={{ marginTop: "0", marginBottom: "24px"}}>Upload New Book</Title>
    <Row gutter={[16, 16]} style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={24} sm={16} md={12} lg={10}>
        <Form
            name="wrap"
            labelCol={{ flex: "100px" }}
            labelAlign="left"
            labelWrap
            size="large"
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 800 }}
        >
            <Form.Item label="Title" rules={[{ required: true }]}>
            <Input placeholder="Title of book" />
            </Form.Item>
            <Form.Item label="Author" rules={[{ required: true }]}>
            <Input placeholder="Author" />
            </Form.Item>
            <Form.Item label="DatePicker">
            <DatePicker />
            </Form.Item>
            <Form.Item label="Introduction" rules={[{ required: true }]}>
            <Input.TextArea size="large" />
            </Form.Item>
        </Form>
        </Col>
        <Col xs={24} sm={16} md={12} lg={5}>
        <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
        >
            <Upload action="/upload.do" listType="picture-card" maxCount={1}>
            <button style={{ border: 0, background: "none" , cursor: "pointer", width: "100%", height: "100%" }} type="button">
                <PlusOutlined  />
                <div style={{ marginTop: 8 }}>Upload</div>
            </button>
            </Upload>
        </Form.Item>
        </Col>
    </Row>
    <Row>
        <Button type="primary">Pushlish</Button>
    </Row>
</div>
);
};

export default AddBook;
