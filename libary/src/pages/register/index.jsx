import React from 'react';
import { Form, Input, Button, Row, Col, Card, message } from 'antd';
import axios from 'axios';

const Register = () => {
    const apiUrl = process.env.REACT_APP_API_URL; 
    const [messageApi] = message.useMessage();
    const onFinish = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
            phone_number: values.phoneNumber, // Map đúng key "phone_number"
            full_name: values.name, // Map đúng key "full_name"
            role: '0',
            avatar: '',
        };

        console.log('Payload:', payload);

        try {
            const response = await axios.post(`${apiUrl}/auth/register`, payload);
            if (response.status === 201) {
                messageApi.open({
                    type: 'success',
                    content: 'Registration successful!',
                });
                // Redirect or clear form if needed
            } else {
                message.error(response.data.message || 'Something went wrong!');
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Registration failed!');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row
            style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Col xs={24} sm={16} md={12} lg={7}>
                <Card
                    className="shadow"
                    style={{ borderRadius: '16px', padding: '0 24px', backgroundColor: '#fafafa' }}
                >
                    <Form
                        name="register"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                    >
                        {/* Name Field */}
                        <Form.Item
                            label="Full Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Please input your full name!' },
                                { min: 2, message: 'Full name must be at least 2 characters long!' },
                            ]}
                        >
                            <Input placeholder="Enter full name" />
                        </Form.Item>

                        {/* Email Field */}
                        <Form.Item
                            label="Email address"
                            name="email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input placeholder="Enter email" />
                        </Form.Item>

                        {/* Phone Number Field */}
                        <Form.Item
                            label="Phone Number"
                            name="phoneNumber"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                {
                                    pattern: /^\d{10,15}$/,
                                    message: 'Phone number must be 10-15 digits!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter phone number" />
                        </Form.Item>

                        {/* Password Field */}
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                { min: 6, message: 'Password must be at least 6 characters!' },
                            ]}
                        >
                            <Input.Password placeholder="Password" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>

                        {/* Login Button */}
                        <Form.Item>
                            <Button type="default" block href="/login">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Register;
