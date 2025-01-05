// Import các thư viện cần thiết
import React, { useState } from 'react';
import { Layout, Form, Input, Button, Upload, message, Row, Col, Modal, Avatar, Select, DatePicker, Typography } from 'antd';
import { UserOutlined, UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const ProfilePage = () => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);

    const handleUpdate = (values) => {
        message.success('Profile updated successfully!');
        console.log('Updated Profile:', values);
    };

    const handleDelete = () => {
        Modal.confirm({
            title: 'Are you sure you want to delete your profile?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                message.success('Profile deleted successfully!');
                console.log('Profile deleted');
            },
        });
    };

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            setAvatar(URL.createObjectURL(info.file.originFileObj));
            message.success(`${info.file.name} uploaded successfully!`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed.`);
        }
    };

    return (
        <Layout style={{ padding: '24px' }}>
            <Content style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
                <Row style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Title style={{ margin: '0', marginBottom: '16px'}} level={3}>Profile</Title>

                </Row>
                <Row gutter={[16, 16]} justify="center">
                    {/* Cột Thông tin cá nhân */}
                    <Col xs={24} md={14}>
                        <Form
                        size='large'
                            form={form}
                            layout="vertical"
                            initialValues={{
                                username: 'Admin',
                                email: 'example@email.com',
                                phone: '0123456789',
                                gender: 'male',
                                birth: null,
                                country: 'Vietnam',
                            }}
                            onFinish={handleUpdate}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input placeholder="Enter your username" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>
                            
                            <Form.Item
                                label="Gender"
                                name="gender"
                            >
                                <Select placeholder="Select your gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Date of Birth"
                                name="birth"
                            >
                                <DatePicker style={{ width: '100%' }} placeholder="Select your birth date" />
                            </Form.Item>

                            <Form.Item
                                label="Country"
                                name="country"
                                rules={[{ required: true, message: 'Please select your country!' }]}
                            >
                                <Select placeholder="Select your country">
                                    <Option value="Vietnam">Vietnam</Option>
                                    <Option value="USA">USA</Option>
                                    <Option value="Canada">Canada</Option>
                                    <Option value="UK">UK</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                    Update Profile
                                </Button>
                                <Button type="danger" icon={<DeleteOutlined />} onClick={handleDelete}>
                                    Delete Profile
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    {/* Cột Avatar */}
                    <Col xs={24} md={8} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar
                            size={256}
                            icon={!avatar ? <UserOutlined /> : null}
                            src={avatar || undefined}
                            style={{ margin: '24px' }}
                        />
                        <Upload
                            name="avatar"
                            accept="image/*"
                            showUploadList={false}
                            customRequest={({ file, onSuccess }) => {
                                setTimeout(() => {
                                    onSuccess('ok');
                                    handleAvatarUpload({ file, status: 'done' });
                                }, 1000);
                            }}
                        >
                            <Button icon={<UploadOutlined />}>Change Avatar</Button>
                        </Upload>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ProfilePage;
