import { Layout, Input, Divider, Empty, Row, Col, Descriptions, Typography, Tag, Avatar, Button, Modal, Form, message } from 'antd';
import { useState } from 'react';
import AdminService from '../../../shared/services/adminService';
import React from 'react';

const { Search } = Input;
const { Title } = Typography;
const publicUrl = process.env.PUBLIC_URL;

const FindUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userFind, setUserFind] = useState(null);
    const [form] = Form.useForm();

    const handleChangePassword = () => {
        setIsModalVisible(true); // Show modal when "Change Password" is clicked
    };

    const handleOk = () => {
        form
            .validateFields()
            .then(async (values) => {
                try {
                    const response = await AdminService.updatePasswordUser(values.new_password, userFind.id);
                    if (response.success) {
                        setIsModalVisible(false);
                        Modal.success({
                            title: 'Password changed successfully',
                        });
                    } else {
                        Modal.error({
                            title: 'Failed to change password',
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onSearch = async (value) => {
        try {
            const response = await AdminService.getUserByEmail(value);
            if (!response.success) {
                setUserFind(null);
                message.error(response.message);
                return;
            }
            setUserFind(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <Title level={3}>Find User</Title>
            <Search
                placeholder="Enter email for find user"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                style={{ flex: 1, marginRight: "16px", width: "60%" }}
            />
            <Divider />
            <Row>
                {userFind === null ? (
                    <Row justify="center" style={{ width: '100%' }}>

                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </Row>
                ) : (
                    <Row gutter={[16, 16]} align="middle" style={{ gap: 16, width: '100%' }}>
                        <Col span={12} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Descriptions bordered size="middle" column={1} style={{ width: '100%' }}>
                                <Descriptions.Item label="User ID">{userFind.id || '-'}</Descriptions.Item>
                                <Descriptions.Item label="Full Name">{userFind.full_name || '-'}</Descriptions.Item>
                                <Descriptions.Item label="Date of Birth">
                                { Intl.DateTimeFormat('vi-VN').format(new Date(userFind.date_of_birth)) || '-'}
                                </Descriptions.Item>
                                <Descriptions.Item label='Address'>{userFind.address || '-'}</Descriptions.Item>
                                <Descriptions.Item label="Email">{userFind.email || '-'}</Descriptions.Item>
                                <Descriptions.Item label="Phone Number">{userFind.phone_number || '-'}</Descriptions.Item>
                                <Descriptions.Item label="Gender">{userFind.gender || '-'}</Descriptions.Item>
                                <Descriptions.Item label="Role">
                                    {userFind.role === "user" ? (
                                        <Tag color="green">User</Tag>
                                    ) : (
                                        <Tag color="red">Admin</Tag>
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Created At">
                                    {new Date(userFind.created_at).toLocaleString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Updated At">
                                    {new Date(userFind.updated_at).toLocaleString()}
                                </Descriptions.Item>
                            </Descriptions>
                            <Row style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 16 }}>
                                <Button type="primary" style={{ marginTop: '16px' }}>Update</Button>
                                <Button type="default" style={{ marginTop: '16px' }} onClick={handleChangePassword}>Change Password</Button>
                            </Row>
                        </Col>
                        <Col span={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ textAlign: 'center' }}>
                                <img src={userFind.avatar === "" ? (`${publicUrl}/static/imgs/avatar.jpg`) : (userFind.avatar)} alt="User Avatar" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                            </div>
                        </Col>
                    </Row>
                )}
            </Row>

            {/* Modal for password change */}
            <Modal
                title="Change Password"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    name="change-password"
                    initialValues={{ remember: true }}
                    onFinish={handleOk}
                >
                    <Form.Item
                        name="new_password"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default FindUser;
