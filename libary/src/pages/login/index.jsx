import React from 'react';
import { Form, Input, Button, Row, Col, Card, message } from 'antd';
import axios from 'axios';

const Login = () => {
    const onFinish = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
        };

        try {
            // Gửi yêu cầu POST đến API
            const response = await axios.post('http://localhost:8000/auth/login', payload);

            const {status } = response.data;

            // Kiểm tra mã trạng thái và dữ liệu trả về
            if (status === 200) {
                window.location.href = '/'; // Chuyển hướng về trang chủ
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } catch (error) {
            // Hiển thị thông báo lỗi
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            message.error(errorMessage);
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
            <Col xs={20} sm={14} md={10} lg={6}>
                <Card
                    className="shadow"
                    style={{ borderRadius: '16px', padding: '0 16px', backgroundColor: '#fafafa' }}
                >
                    <Form
                        name="login"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        size="large"
                    >
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
                                Login
                            </Button>
                        </Form.Item>
                        {/* Register Button */}
                        <Form.Item>
                            <Button block href="/register">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default Login;
