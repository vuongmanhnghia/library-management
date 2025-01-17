import React from 'react';
import { Form, Input, Button, Row, Col, Card, message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { update } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

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
            console.log('user', response.data);
            if (response.data.status === 200) {
                const user = response.data.data;
                dispatch(
                    update({
                        user: user,
                    }),
                );
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
        <Row style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Col xs={20} sm={14} md={10} lg={6}>
                <Card
                    className="shadow"
                    style={{ borderRadius: '16px', padding: '0 16px', backgroundColor: '#fafafa' }}
                >
                    <Form name="login" layout="vertical" onFinish={onFinish} size="large">
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

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>
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
