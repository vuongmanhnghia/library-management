import React, { useState } from 'react';
import {
    Layout,
    Form,
    Input,
    Button,
    Upload,
    message,
    Row,
    Col,
    Avatar,
    Select,
    DatePicker,
    Typography,
} from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';
import { useSelector } from 'react-redux';

const { Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const ProfilePage = () => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);

    // Handle profile update
    const handleUpdate = (values) => {
        message.success('Your profile has been updated successfully!');
        console.log('Updated Profile:', values);
    };

    // Handle avatar upload
    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            setAvatar(URL.createObjectURL(info.file.originFileObj));
            message.success(`${info.file.name} uploaded successfully!`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed.`);
        }
    };

    // Custom avatar upload handler
    const customUpload = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
            handleAvatarUpload({ file, status: 'done' });
        }, 1000);
    };

    const handlePreviewAvatar = async (file) => {
        if (file) {
            const preview = await getBase64(file);
            setPreviewAvatar(preview);
        } else {
            setPreviewAvatar(null);
        }
    };

    const userValue = useSelector((state) => state.user);

    return (
        <Layout style={{ padding: '24px' }}>
            <Content
                style={{
                    background: '#fff',
                    padding: '32px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Row justify="center" style={{ marginBottom: '24px' }}>
                    <Title level={2}>User Profile</Title>
                </Row>

                <Row gutter={[32, 32]} justify="center">
                    {/* User Information Section */}
                    <Col xs={24} md={14}>
                        <Form
                            form={form}
                            layout="vertical"
                            size="large"
                            initialValues={{
                                username: userValue.name,
                                email: userValue.email,
                                phone: userValue.phone,
                                gender: userValue.gender,
                                birth: null,
                                country: 'Vietnam',
                            }}
                            onFinish={handleUpdate}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please enter your username!' }]}
                            >
                                <Input placeholder="Enter your username" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                            >
                                <Input placeholder="Enter your email" />
                            </Form.Item>

                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[{ required: true, message: 'Please enter your phone number!' }]}
                            >
                                <Input placeholder="Enter your phone number" />
                            </Form.Item>

                            <Form.Item label="Gender" name="gender">
                                <Select placeholder="Select your gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Date of Birth" name="birth">
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

                            <Form.Item style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                    Save Changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>

                    {/* Avatar Section */}
                    <Col
                        xs={24}
                        md={8}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            size={256}
                            icon={!previewAvatar ? <UserOutlined /> : null}
                            src={previewAvatar || userValue.avatar}
                            style={{ marginBottom: '16px', backgroundColor: '#f0f0f0' }}
                        />
                        <Upload
                            maxCount={1}
                            beforeUpload={() => false}
                            onChange={(info) => {
                                const file = info.fileList[0]?.originFileObj || null;
                                handlePreviewAvatar(file);
                            }}
                            name="avatar"
                            accept="image/*"
                            showUploadList={false}
                            customRequest={customUpload}
                        >
                            <Button icon={<UploadOutlined />}>Change Avatar</Button>
                        </Upload>
                        <Text type="secondary" style={{ marginTop: '8px' }}>
                            Upload a new profile picture
                        </Text>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default ProfilePage;
