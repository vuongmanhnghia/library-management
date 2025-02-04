import React, { useEffect, useState } from 'react'
import { EyeInvisibleOutlined, EyeOutlined, HomeFilled, UserOutlined, WalletOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Layout, Flex, Progress, Typography, Table, Button, Skeleton } from 'antd';
import AdminService from '../../../shared/services/adminService';
import { truncateText } from '../../../shared/utils';
import Title from 'antd/es/typography/Title';

const { Text } = Typography

const datas =
{
  total_users: 27,
  total_books: 100,
  total_posts: 234,
  pending_books: 34
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState({});
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    try{
      AdminService.getDashboard().then((res) => {
        setLoading(false);
        setDatas(res.data);
        setBooks(res.data.books);
        setUsers(res.data.users);
      });
    }catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);
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
      render: (user) => (
        <Button type="default">
          <EyeOutlined />
        </Button>
      ),
    }
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
    loading ? <Skeleton active />  : (
      <Layout>
        <Title level={3}><HomeFilled /> Dashboard</Title>
        <Row gutter={16} style={{ gap: '16px' }}>
          <Col span={12}>
            <Row style={{ width: '100%', gap: '16px' }}>
              <Col span={11}>
                <Card bordered={false} hoverable >
                  <Statistic
                    title="Active Users"
                    value={datas.total_users}
                    prefix={<UserOutlined />}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                  />
                </Card>
              </Col>
              <Col span={11}>
                <Card bordered={false} hoverable>
                  <Statistic
                    title="Active Books"
                    value={datas.total_books}
                    prefix={<WalletOutlined />}
                    valueStyle={{
                      color: '#1a9ce7',
                    }}
                  />
                </Card>
              </Col>
            </Row>
            <Row style={{ width: '100%', marginTop: '16px' }}>
              <Col span={24}>
                <Title level={4}>New users</Title>
                <Table
                  columns={userColumns}
                  pagination={false}
                  dataSource={users}
                  rowKey="_id"
                />
              </Col>
            </Row>
          </Col>
          <Col span={10} style={{ display: 'flex', flexDirection: 'column' }}>
            <Row>

              <Card bordered={false} style={{ width: '100%' }} hoverable>
                <Flex gap="middle" wrap>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Progress type="dashboard" size={250} percent={(datas.total_books - datas.pending_books) / datas.total_books * 100} />
                    <Text>Approved Books</Text>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Progress type="dashboard" percent={datas.pending_books / datas.total_books * 100} size={150} />
                    <Text>Pending Books</Text>
                  </div>
                </Flex>
              </Card>
            </Row>
            <Row style={{ width: '100%', marginTop: '16px' }}>
              <Col span={24}>
                <Title level={4}>New books</Title>
                <Table
                  columns={bookColumns}
                  pagination={false}
                  dataSource={books}
                  rowKey="_id"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Layout>
    )
  )
}

export default AdminDashboard