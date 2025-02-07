import React, { useState } from 'react';
import { Form, Input, Button, Row, Typography, message, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { update } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { getUser } from '../../utils/services/auth';

const { Text } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isloading, setIsloading] = useState(false);

    const onFinish = async (values) => {
        setIsloading(true);
        const onAuthFinish = await AuthService.login(values);
        if (onAuthFinish.success) {
            const userData = await getUser(onAuthFinish.token);
            if (userData) {
                dispatch(update(userData));
                setIsloading(false);
                message.success(onAuthFinish.message);
                setTimeout(() => {
                    const isAdmin = userData.role === 'admin';
                    isAdmin ? navigate('/admin/dashboard') : navigate('/');
                }, 500);
            }
        } else {
            setIsloading(false);
            message.error(onAuthFinish.message);
        }
    };

    return (
        <Row
            style={{
                borderRadius: '16px',
                padding: '16px',
                backgroundColor: 'transparent',
                border: 'none',
                width: '80%',
                maxWidth: '400px',
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
                Login Account
            </Text>

            <Text
                style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: 'var(--ant-primary-6)',
                    width: '100%',
                }}
            >
                Welcome to Library Forum, enter your email and password to try it now.
            </Text>

            {isloading ? (
                <Spin size="large" style={{ marginTop: '32px' }} />
            ) : (
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={onFinish}
                    size="large"
                    style={{
                        marginTop: '16px',
                        width: '100%',
                    }}
                >
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

                    <Form.Item className="custom-form-item">
                        <Button type="primary" htmlType="submit" block style={{ marginTop: '16px' }} loading={isloading}>
                            Login
                        </Button>
                    </Form.Item>

                    {/* Thêm margin-bottom để tránh bị footer che mất */}
                    <Form.Item
                        style={{
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '8px',
                            gap: '4px',
                            marginBottom: '60px', // Thêm khoảng cách để tránh footer watermark
                        }}
                    >
                        <span>Don't have an account? </span>
                        <Button
                            type="link"
                            style={{
                                fontSize: '14px',
                                padding: '0',
                                lineHeight: 'normal',
                                color: '#cc0d00',
                            }}
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                        <span> now</span>
                    </Form.Item>
                </Form>
            )}
        </Row>
    );
};

export default Login;
