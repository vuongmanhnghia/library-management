import React, { useState } from 'react';
import { Form, Input, Button, Modal, Row, Col, Card, Radio } from 'antd';

const Setting = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [darkMode, setDarkMode] = useState('system'); // Default to "system"

    // Handle password change submission
    const onFinishPasswordChange = (values) => {
        console.log('Password Change:', values);
        alert('Password has been updated successfully!');
    };

    // Show delete account confirmation modal
    const showDeleteAccountModal = () => {
        setIsModalVisible(true);
    };

    const handleDeleteAccount = () => {
        setIsModalVisible(false);
        alert('Your account has been deleted!');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handle Dark Mode selection
    const onDarkModeChange = (e) => {
        setDarkMode(e.target.value);
        console.log('Dark Mode:', e.target.value);
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
                <Col span={12}>
                    <Card title="Other Features (In Progress)" bordered>
                        <p>- Update profile picture</p>
                        <p>- Enable/Disable Two-Factor Authentication</p>
                        <p>- Auto logout after 30 minutes of inactivity</p>
                        <Button type="default" disabled>
                            Coming Soon...
                        </Button>
                    </Card>
                </Col>
                {/* Delete Account */}
                <Col span={12}>
                    <Card title="Delete Account" bordered>
                        <p style={{ color: 'red' }}>
                            <b>Warning:</b> This action is irreversible!
                        </p>
                        <Button danger onClick={showDeleteAccountModal}>
                            Delete Account
                        </Button>
                    </Card>
                </Col>

                {/* Dark Mode Settings */}
                <Col span={12}>
                    <Card title="Dark Mode Settings" bordered>
                        <Radio.Group onChange={onDarkModeChange} value={darkMode}>
                            <Radio value="system">Theo máy</Radio>
                            <Radio value="light">Sáng</Radio>
                            <Radio value="dark">Tối</Radio>
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
                visible={isModalVisible}
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
