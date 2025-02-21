/* 
    Chức năng chính page: Thể hiện thông tin cá nhân của người dùng , và cho phép thay đổi cập nhật thông tintin
    Công nghệ sử dụng: base64 (giúp upload ảnh lên server- tạm thời), dayjs (fomat ngày tháng)
*/

import React, { useState } from 'react';
import { Layout, Form, Input, Button, Upload, message, Row, Col, Avatar, Select, DatePicker, Typography, Grid } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { getBase64, truncateText } from '../../../shared/utils';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../../../redux/userSlice';
import UserService from '../../../shared/services/userService'; 
import dayjs from 'dayjs';

const { Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ProfilePage = () => {
    const [form] = Form.useForm();
    const [avatar, setAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const screen = useBreakpoint();

    const userValue = useSelector((state) => state.user.user);

    const handleInputChange = (changedValues, allValues) => {
        setFormData((prev) => ({ ...prev, ...changedValues }));
    };

    const handleUpdate = async (values) => {
        const updatedUser = {
            full_name: values.full_name || userValue.full_name,
            email: values.email || userValue.email,
            phone_number: values.phone || userValue.phone_number,
            avatar: previewAvatar || avatar || userValue.avatar,
            gender: values.gender || userValue.gender,
            date_of_birth: values.date_of_birth ? values.date_of_birth.toDate() : userValue.date_of_birth.toDate(),
            address: values.address || userValue.address,
        };
        try {
            const response = await UserService.update(updatedUser);
            if (response.success) {
                message.success(response.message);
                dispatch(update(response.data));
            } else {
                message.error(response.message);
            }
        }
        catch (error) {
            message.error('Failed to update user. Please try again.');
        }
    };

    const handleAvatarUpload = (info) => {
        if (info.file.status === 'done') {
            setAvatar(URL.createObjectURL(info.file.originFileObj));
            message.success(`${info.file.name} uploaded successfully!`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} upload failed.`);
        }
    };

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

    return (
        <Layout>
            <Content
                style={{
                    background: '#fff',
                    padding: '8px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Row justify="center" style={{ marginBottom: '24px' }}>
                    <Title level={2}>User Profile</Title>
                </Row>

                <Row gutter={[32, 32]} justify="center">
                    <Col xs={24} md={14}>
                        <Form
                            form={form}
                            layout="vertical"
                            size="large"
                            initialValues={{
                                full_name: userValue.full_name,
                                email: userValue.email,
                                phone: userValue.phone_number,
                                gender: userValue.gender,
                                date_of_birth: userValue.date_of_birth ? dayjs(userValue.date_of_birth) : null,
                                address: userValue.address,
                            }}
                            onValuesChange={handleInputChange}
                            onFinish={handleUpdate}
                        >
                            <Form.Item
                                label="Full name"
                                name="full_name"
                                rules={[{ required: true, message: 'Please enter your full name!' }]}
                            >
                                <Input placeholder="Enter your full name" />
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

                            <Form.Item label="Date of Birth" name="date_of_birth">
                                <DatePicker
                                    style={{ width: '100%' }}
                                    placeholder="Select your birth date"
                                    format="DD/MM/YYYY"
                                />
                            </Form.Item>

                            <Form.Item label="Address" name="address">
                                <Input placeholder="Enter your address" />
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'center' }}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
                                    Save Changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>

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
                            size={screen.xs ? 150 : 256}
                            icon={!previewAvatar ? <UserOutlined /> : null}
                            src={previewAvatar || userValue.avatar}
                            style={{ marginBottom: '16px', backgroundColor: '#f0f0f0' }}
                        />
                        <Upload
                            maxCount={1}
                            beforeUpload={(file) => {
                                const isImage = file.type.startsWith('image/');
                                const isSmallEnough = file.size / 1024 / 1024 < 1.5;
                                if (!isImage) {
                                    message.error(`${truncateText(file.name, 10)} is not an image file`);
                                    return Upload.LIST_IGNORE;
                                }
                                if (!isSmallEnough) {
                                    message.error(`${truncateText(file.name, 10)} is larger than 1,5MB`);
                                    return Upload.LIST_IGNORE;
                                }
                                return false;
                            }}
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
