import React, { useEffect, useState } from 'react';
import { EyeOutlined, HomeFilled, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Layout, Typography, Table, Button, Skeleton, Progress, Grid } from 'antd';
import AdminService from '../../../shared/services/adminService';
import { truncateText } from '../../../shared/utils';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState({});
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const screens = useBreakpoint();

  useEffect(() => {
    setLoading(true);
    AdminService.getDashboard()
      .then((res) => {
        setDatas(res.data);
        setBooks(res.data.books);
        setUsers(res.data.users);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handelViewUser = (id) => {
    console.log("Viewing user", id);
  };

  const userColumns = [
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="default" onClick={() => handelViewUser(record._id)}>
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  const bookColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => truncateText(text, 30),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (text) => truncateText(text, 20),
    },
  ];

  return (
    <Layout>
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          <Title level={3}><HomeFilled /> Dashboard</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Card bordered={false} hoverable>
                <Statistic title="Active Users" value={datas.total_users} prefix={<UserOutlined />} valueStyle={{ color: '#3f8600' }} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Card bordered={false} hoverable>
                <Statistic title="Active Books" value={datas.total_books - datas.pending_books} prefix={<WalletOutlined />} valueStyle={{ color: '#1a9ce7' }} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Card bordered={false} hoverable>
                <Statistic title="Posts" value={datas.total_posts} prefix={<WalletOutlined />} valueStyle={{ color: '#3f8600' }} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={8} lg={6}>
              <Card bordered={false} hoverable>
                <Statistic title="Comments" value={datas.total_comments || 'N/A'} prefix={<WalletOutlined />} valueStyle={{ color: '#1a9ce7' }} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col xs={24} lg={14}>
              <Title level={4}>New Users</Title>
              <Table columns={userColumns} pagination={false} dataSource={users} rowKey="_id" size={screens.xs ? 'small' : 'middle'} scroll={{
                x: 'max-content',
              }} />
            </Col>
            <Col xs={24} lg={10}>
              <Title level={4}>Book Status</Title>
              <Card bordered={false} hoverable>
                <Row gutter={[16, 16]} justify="center">
                  <Col xs={24} sm={12} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Progress type="dashboard" percent={((datas.total_books - datas.pending_books) / datas.total_books * 100).toFixed(2)} status='normal' size={screens.xs ? 120 : 200} />
                    <Text>Approved Books</Text>
                  </Col>
                  <Col xs={24} sm={12} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                    <Progress type="dashboard" percent={(datas.pending_books / datas.total_books * 100).toFixed(2)} status="normal" size={screens.xs ? 100 : 150} />
                    <Text>Pending Books</Text>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row style={{ marginTop: '16px' }}>
            <Col span={24}>
              <Title level={4}>New Books</Title>
              <Table columns={bookColumns} pagination={false} dataSource={books} rowKey="_id" size={screens.xs ? 'small' : 'middle'} scroll={{
                x: 'max-content',
              }} />
            </Col>
          </Row>
        </>
      )}
    </Layout>
  );
};

export default AdminDashboard;
