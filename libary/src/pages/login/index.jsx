/* 
    Chức năng chính page: Trang đăng nhập tài khoản người dùng
    Công nghệ sử dụng: null ( không có công nghệ gì đặc biệt)
*/

import React from 'react';
import { Form, Input, Button, Row, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/authService';
import { getUser } from '../../utils/services/auth';
const { Text } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        // Connect với API để login
        const onAuthFinish = await AuthService.login(values);

        if (onAuthFinish.success) {
            getUser(onAuthFinish.token).then((user) => {
                dispatch(update(user));
            });
            message.success(onAuthFinish.message);
            setTimeout(() => {
                navigate('/');
            }, 500);
        } else {
            message.error(onAuthFinish.message);
        }
    };
    return (
        <Row
            style={{
                borderRadius: '16px',
                padding: '0 16px',
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
                    Login Account
                </Text>
            </Row>
            <Row justify={'center'}>
                <Text
                    style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: 'var(--ant-primary-6)',
                        width: '80%',
                        textAlign: 'center',
                    }}
                >
                    Welcome to Libary Forum, enter your email and password to try it now.
                </Text>
            </Row>

            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                size="large"
                style={{ marginTop: '16px', width: '100%', padding: '16px' }}
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
                    <Input placeholder="Enter email" style={{ backgroundColor: 'transparent' }} />
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
                    <Input.Password placeholder="Password" style={{ backgroundColor: 'transparent' }} />
                </Form.Item>
                <Form.Item className="custom-form-item">
                    <Button type="primary" htmlType="submit" block style={{ marginTop: '16px' }}>
                        Login
                    </Button>
                </Form.Item>
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
        </Row>
    );
};

export default Login;
