import React from 'react';
import { Form, Input, Button, Row, message, Typography } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUser } from '../../utils/services/auth';

const { Text } = Typography;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khởi tạo useNavigate hook
    const apiUrl = process.env.REACT_APP_API_URL;

    const onFinish = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
        };

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, payload);
            if (response.data.status === 200) {
                const { access_token } = response.data.data;

                localStorage.setItem('access_token', access_token); // Lưu token vào localStorage
                getUser(access_token).then((user) => {
                    dispatch(update(user));
                });
                message.success('Login successfully!');

                setTimeout(() => {
                    navigate('/'); // Chuyển hướng sau 1 giây
                }, 1000); // 1000ms = 1 giây // Sử dụng navigate thay vì return Navigate
            } else {
                throw new Error('Login failed. Please try again.');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            message.error(errorMessage);
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
                <Text style={{ color: 'var(--ant-primary-8)', fontWeight: 'bold', fontSize: '32px', marginBottom: '16px' }}>Login Account</Text>
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
                    Welcome to Libary Management, enter your email and password to try it now.
                </Text>
            </Row>

            <Form name="login" layout="vertical" onFinish={onFinish} size="large" style={{ marginTop: '16px', width: '100%', padding: '16px' }}>
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
                <Form.Item className="custom-form-item" >
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
                        gap: '4px', // Khoảng cách giữa các phần tử
                    }}
                >
                    <span>Don't have an account? </span>
                    <Button
                        type="link"
                        style={{
                            fontSize: '14px',
                            padding: '0', // Loại bỏ padding mặc định
                            lineHeight: 'normal', // Giữ chữ không bị lệch
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
