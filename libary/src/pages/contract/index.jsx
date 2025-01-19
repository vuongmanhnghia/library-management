import React from 'react';
import { Form, Input, Button, notification, Select, Row, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;


const Contract = () => {
    const onFinish = (values) => {
        // Xử lý khi form được submit thành công
        console.log('Inquiry Submitted:', values);
        notification.success({
            message: 'Inquiry Submitted Successfully',
            description: 'Thank you for reaching out. We will get back to you soon.',
        });
    };

    const onFinishFailed = (errorInfo) => {
        // Xử lý khi form không hợp lệ
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Row justify="center" style={{marginTop: '24px'}}>
            <Title level={2}>Contract with us</Title>
            </Row>
            <Form name="Contract" onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" size="large">
                {/* Tên người dùng */}
                <Form.Item
                    label="Your Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not a valid email!' },
                    ]}
                >
                    <Input prefix={<MailOutlined style={{ marginRight: '8px'}} />} placeholder="Enter your email" />
                </Form.Item>

                {/* Chủ đề thắc mắc */}
                <Form.Item
                    label="Inquiry Topic"
                    name="topic"
                    rules={[{ required: true, message: 'Please select a topic for your inquiry!' }]}
                >
                    <Select placeholder="Select a topic">
                        <Option value="book">Books</Option>
                        <Option value="product">Website Issues</Option>
                        <Option value="support">Support Account</Option>
                        <Option value="unknown">Other</Option>
                    </Select>
                </Form.Item>

                {/* Nội dung thắc mắc */}
                <Form.Item
                    label="Your Inquiry"
                    name="inquiry"
                    rules={[{ required: true, message: 'Please input your inquiry!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter the details of your inquiry" />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit Inquiry
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Contract;
