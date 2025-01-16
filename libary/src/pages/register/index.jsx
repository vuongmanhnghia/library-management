import React from 'react';
import { Form, Input, Button, Row, Col, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { convertImagePathToBase64 } from '../../utils';


const Register = () => {
    const apiUrl = process.env.REACT_APP_API_URL; 
    const imagePath = process.env.PUBLIC_URL + '/static/imgs/image.png';    
    let base64IMG = ''; // Khai báo biến base64IMG
    (async () => {
        base64IMG = await convertImagePathToBase64(imagePath);
        })();
    const navigate = useNavigate(); // Khởi tạo useNavigate hook
    const onFinish = async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
            phone_number: values.phoneNumber, // Map đúng key "phone_number"
            full_name: values.name, // Map đúng key "full_name"
            role: '0',
            avatar: base64IMG || '', // Gán ảnh mặc định
        };
        console.log('Received values of form: ', payload);
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, payload);
            if (response.data.status === 201) {
                message.success('Registration successful!');
                navigate('/login'); // Redirect or clear form if needed
                // Redirect or clear form if needed
            } else {
                throw new Error('Registration failed!');
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
