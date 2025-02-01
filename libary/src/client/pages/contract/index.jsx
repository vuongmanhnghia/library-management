/* 
    Chức năng chính page: Gửi phản hồi về sản phẩm với nhà phát triển 
    Công nghệ sử dụng: EmailJS
*/

import React from 'react';
import { Form, Input, Button, Row, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import MailService from '../../../shared/services/mailService';

const { Title } = Typography;
const Contract = () => {
    const userValue = useSelector((state) => state.user.user);
    const userStreamToken = localStorage.getItem('access_token').split('.')[1];
    const onFinish = (values) => {
        const templateParams = {
            userIDstring: userStreamToken,
            name: values.name,
            userName: userValue.full_name,
            email: values.email,
            topic: values.topic,
            inquiry: values.inquiry,
        };

        MailService.send(templateParams);
    };
    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Row justify="center" style={{ marginTop: '24px' }}>
                <Title level={2}>Contract with us</Title>
            </Row>
            <Form name="Contract" onFinish={onFinish} layout="vertical" size="large">
                <Form.Item
                    label="Your Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not a valid email!' },
                    ]}
                >
                    <Input prefix={<MailOutlined style={{ marginRight: '8px' }} />} placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Inquiry Topic"
                    name="topic"
                    rules={[{ required: true, message: 'Please input your inquiry topic!' }]}
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Your Inquiry"
                    name="inquiry"
                    rules={[{ required: true, message: 'Please input your inquiry!' }]}
                >
                    <Input.TextArea rows={4} placeholder="Enter the details of your inquiry" />
                </Form.Item>

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
