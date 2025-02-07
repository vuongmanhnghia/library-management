import React, { useState } from 'react';
import { Form, Input, Button, Modal, Row, Col, Card, Radio, message, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserService from '../../../shared/services/userService';
import { logout } from '../../../redux/userSlice';

const { Title, Text } = Typography;
const Setting = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinishPasswordChange = (values) => {
        UserService.updatePassword(values)
            .then((response) => {
                if (response.success) {
                    message.success(response.message);
                } else {
                    message.error(response.message);
                }
            })
            .catch((error) => {
                message.error(error.message);
            });
    };

    const showDeleteAccountModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteAccount = async () => {
        const response = await UserService.delete();
        if (response.success) {
            message.success(response.message);
            setTimeout(() => {
                navigate('/register');
                dispatch(logout());
            }, 500);
        } else {
            message.error(response.message);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Layout>
            <Title level={3}>Settings</Title>
            <Row gutter={[16, 16]} wrap>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Card title="Change Password" bordered>
                        <Form layout="vertical" onFinish={onFinishPasswordChange}>
                            <Form.Item label="Current Password" name="oldPassword" rules={[{ required: true, message: 'Please enter your current password!' }]}>
                                <Input.Password placeholder="Current password" />
                            </Form.Item>
                            <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: 'Please enter a new password!' }, { min: 6, message: 'Password must be at least 6 characters!' }]}>
                                <Input.Password placeholder="New password" />
                            </Form.Item>
                            <Form.Item label="Confirm New Password" name="confirmPassword" dependencies={['newPassword']} rules={[({ getFieldValue }) => ({ validator(_, value) { return !value || getFieldValue('newPassword') === value ? Promise.resolve() : Promise.reject(new Error('The two passwords do not match!')); } })]}>
                                <Input.Password placeholder="Confirm new password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    Save Changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Col span={24}>
                        <Card title="Other Features (In Progress)" bordered>
                            <Text>- Conversation Textage</Text>
                            <br />
                            <Text>- Enable/Disable Dark Mode</Text>
                            <br />
                            <Text>- Auto logout after 30 minutes of inactivity</Text>
                            <Button type="dashed" disabled block style={{ marginTop: 16 }}>
                                Coming Soon...
                            </Button>
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Delete Account" bordered style={{ marginTop: 16 }}>
                            <Text style={{ color: 'red' }}>
                                <b>Warning:</b> This action is irreversible!
                            </Text>
                            <Button danger onClick={showDeleteAccountModal} block style={{ marginTop: 16 }}>
                                Delete Account
                            </Button>
                        </Card>
                    </Col>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                    <Card title="Dark Mode Settings" bordered>
                        <Radio.Group defaultValue="system" buttonStyle="solid">
                            <Radio value="system">System mode</Radio>
                            <Radio value="light">Light mode</Radio>
                            <Radio value="dark">Dark mode</Radio>
                        </Radio.Group>
                    </Card>
                </Col>
            </Row>
            <Modal
                title={<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#ff4d4f', fontSize: '1.5rem' }}>⚠</span>
                    <span>Confirm Account Deletion</span>
                </div>}
                open={isModalOpen}
                onOk={handleDeleteAccount}
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
                centered
            >
                <Text style={{ fontSize: '1rem', color: '#333', marginBottom: '1rem' }}>
                    Are you sure you want to delete your account? This action <b>cannot</b> be undone.
                </Text>
                <br />
                <Text style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                    Warning: Deleting your account will permanently remove all your data.
                </Text>
            </Modal>
        </Layout>
    );
};

export default Setting;
