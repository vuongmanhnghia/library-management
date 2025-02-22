import React, { useEffect, useState } from 'react';
import { Table, Button, Layout, Typography, message, Row, Skeleton, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import AdminServices from '../../../shared/services/adminService';
import { truncateText } from '../../../shared/utils';
import dayjs from 'dayjs';

const { Title } = Typography;

const AllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalusers, setTotalUsers] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await AdminServices.getAllUsers(currentPage, perPage);
                if (response.success) {
                    setUsers(response.data.users || []);
                    setTotalUsers(response.data.total_users || 0);
                }
            } catch (error) {
                message.error('Error fetching users');
            }
            setLoading(false);
        };

        fetchUsers();
    }, [currentPage]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (text) => truncateText(text, 20),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => truncateText(text, 20),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (text) => text === 'admin' ? <Tag color="red">Admin</Tag> : <Tag color="green">User</Tag>,
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (text) => text === null ? "N/A" : text,
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
            render: (text) => text === null ? "N/A" : text,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            render: (text) => text === null ? "N/A" : text,
        },
        {
            title: 'Date of Birth',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            render: (text) => text !== null ? dayjs(text).format('DD/MM/YYYY') : "N/A"
        },
        {
            title: 'Action',
            key: 'action',
            render: (user) => (
                <Button type="primary">
                    <DeleteOutlined />
                </Button>
            ),
        },
    ];

    return (
        <Layout>
            <Title level={3}>All users</Title>
            {loading ? (
                <Row justify="center">
                    <Skeleton active />
                </Row>
            ) : (
                <Table
                    scroll={{
                        x: 'max-content',
                    }}
                    columns={columns}
                    dataSource={users}
                    loading={loading}
                    rowKey="_id"
                    pagination={{
                        current: currentPage,
                        pageSize: perPage,
                        total: totalusers,
                        onChange: (page) => setCurrentPage(page),
                    }}

                />
            )}
        </Layout>
    );
};

export default AllUsers;
