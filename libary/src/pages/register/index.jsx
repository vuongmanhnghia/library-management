/* 
    Chức năng chính page: Cho phép người dùng đăng ký tài khoản để truy cập thư viện hệ thống 
    Công nghệ sử dụng: null ( không có công nghệ gì đặc biệt)
*/

import React from 'react';
import { Form, Input, Button, Row, message, Typography } from 'antd';
import AuthService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const Register = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            // Connect với API để register
            const onAuthFinish = await AuthService.register(values);

            if (onAuthFinish.success) {
                message.success(onAuthFinish.message);
                setTimeout(() => {
                    navigate('/login');
                }, 500);
            } else {
                message.error(onAuthFinish.message);
            }
        } catch (error) {
            message.error('Something went wrong. Please try again.');
        }
    };
    return (
        <Row
            className="shadow"
            style={{
                borderRadius: '16px',
                padding: '0 24px',
                backgroundColor: 'transparent',
                border: 'none',
                width: '65%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Row>
                <Text
                    style={{
                        color: 'var(--ant-primary-8)',
                        fontWeight: 'bold',
                        fontSize: '32px',
                        marginBottom: '16px',
                    }}
                >
                    Create an Account
                </Text>
            </Row>
            <Form
                name="register"
                layout="vertical"
                onFinish={onFinish}
                size="large"
                style={{ width: '100%', padding: '16px' }}
            >
                {/* Name Field */}
                <Form.Item
                    className="custom-form-item"
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
                    className="custom-form-item"
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
                    className="custom-form-item"
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
                    className="custom-form-item"
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
                <Form.Item className="custom-form-item">
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>

                {/* Login Button */}
                <Form.Item
                    style={{
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '8px',
                        gap: '4px', 
                    }}
                >
                    <span>Already have an account?</span>
                    <Button
                        type="link"
                        style={{
                            fontSize: '14px',
                            padding: '0',
                            lineHeight: 'normal',
                            color: '#cc0d00',
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    );
};

export default Register;
