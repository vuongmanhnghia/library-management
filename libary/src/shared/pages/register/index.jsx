import React, { useState } from 'react';
import { Form, Input, Button, Row, message, Typography, Spin } from 'antd';
import AuthService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const onAuthFinish = await AuthService.register(values);
            if (onAuthFinish.success) {
                setLoading(false);
                message.success(onAuthFinish.message);
                setTimeout(() => {
                    navigate('/login');
                }, 500);
            }
        } catch (error) {
            setLoading(false);
            message.error('Something went wrong. Please try again.');
        }
    };

    return (
        <Row
            className="shadow"
            style={{
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                width: '100%',
                maxWidth: '400px', // Giới hạn chiều rộng tối đa
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
            }}
        >
            <Text
                style={{
                    color: 'var(--ant-primary-8)',
                    fontWeight: 'bold',
                    fontSize: '28px',
                    marginBottom: '12px',
                }}
            >
                Create an Account
            </Text>

            {loading ? (
                <Spin size="large" style={{ marginTop: '32px' }} />
            ) : (
                <Form
                    name="register"
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
                    style={{
                        width: '100%',
                    }}
                >
                    {/* Full Name */}
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

                    {/* Email */}
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

                    {/* Phone Number */}
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

                    {/* Password */}
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

                    {/* Login Button - THÊM marginBottom để tránh footer watermark che mất */}
                    <Form.Item
                        style={{
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '8px',
                            gap: '4px',
                            marginBottom: '40px',
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
            )}
        </Row>
    );
};

export default Register;
