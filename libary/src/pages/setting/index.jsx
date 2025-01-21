import React, { useState } from 'react';
import { Form, Input, Button, Modal, Row, Col, Card, Radio, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserService from '../../services/userService';
import { logout } from '../../redux/userSlice';

const Setting = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // Handle password change submission
    const onFinishPasswordChange = (values) => {
        console.log('Password Change:', values);
        alert('Password has been updated successfully!');
    };

    const showDeleteAccountModal = () => {
        setIsModalOpen(true);
    };

    const handleDeleteAccount = async () => {
        const response = await UserService.delete();
        if (response.success) {
            message.success(response.message);
            setInterval(() => {
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
        <div style={{ padding: 24 }}>
            <h2>Setting</h2>

            <Row gutter={[16, 16]}>
                {/* Change Password */}
                <Col span={12}>
                    <Card title="Change Password" bordered>
                        <Form
                            layout="vertical"
                            onFinish={onFinishPasswordChange}
                            initialValues={{
                                oldPassword: '',
                                newPassword: '',
                                confirmPassword: '',
                            }}
                        >
                            <Form.Item
                                label="Current Password"
                                name="oldPassword"
                                rules={[{ required: true, message: 'Please enter your current password!' }]}
                            >
                                <Input.Password placeholder="Current password" />
                            </Form.Item>
                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                rules={[
                                    { required: true, message: 'Please enter a new password!' },
                                    { min: 6, message: 'Password must be at least 6 characters!' },
                                ]}
                            >
                                <Input.Password placeholder="New password" />
                            </Form.Item>
                            <Form.Item
                                label="Confirm New Password"
                                name="confirmPassword"
                                dependencies={['newPassword']}
                                rules={[
                                    { required: true, message: 'Please confirm your new password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Confirm new password" />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save Changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>

                {/* Other Setting */}
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Row style={{ display: 'inline-block' }}>
                        <Card title="Other Features (In Progress)" bordered>
                            <p>- Conversation page </p>
                            <p>- Enable/Disable Dark Mode</p>
                            <p>- Auto logout after 30 minutes of inactivity</p>
                            <Button type="dashed" disabled>
                                Coming Soon...
                            </Button>
                        </Card>
                    </Row>
                    <Row style={{ display: 'inline-block' }}>
                        <Card title="Delete Account" bordered>
                            <p style={{ color: 'red' }}>
                                <b>Warning:</b> This action is irreversible!
                            </p>
                            <Button danger onClick={showDeleteAccountModal}>
                                Delete Account
                            </Button>
                        </Card>
                    </Row>
                </Col>

                {/* Dark Mode Settings */}
                <Col span={12}>
                    <Card title="Dark Mode Settings" bordered>
                        <Radio.Group defaultValue="system" buttonStyle="solid">
                            <Radio value="system">System mode</Radio>
                            <Radio value="light">Light mode</Radio>
                            <Radio value="dark">Dark mode</Radio>
                        </Radio.Group>
                    </Card>
                </Col>
            </Row>

            {/* Delete Account Confirmation Modal */}
            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#ff4d4f', fontSize: '1.5rem' }}>⚠</span>
                        <span>Confirm Account Deletion</span>
                    </div>
                }
                visible={isModalOpen}
                onOk={handleDeleteAccount}
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ danger: true }}
                cancelText="Cancel"
                centered
            >
                <p style={{ fontSize: '1rem', color: '#333', marginBottom: '1rem' }}>
                    Are you sure you want to delete your account? This action <b>cannot</b> be undone.
                </p>
                <p style={{ color: '#ff4d4f', fontWeight: 'bold' }}>
                    Warning: Deleting your account will permanently remove all your data.
                </p>
            </Modal>
        </div>
    );
};

export default Setting;
