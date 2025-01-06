import React from 'react';
import { Layout, Menu, Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
    HomeOutlined,
    BookOutlined,
    WechatOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
    return (
        <Sider
            width={200}
            style={{
                height: '100vh',
                position: 'fixed',
                left: 0,
                background: '#fff',
                overflow: 'auto',
            }}
        >
            {/* Menu chính */}
            <Menu
                style={{
                    height: '100%',
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Menu defaultSelectedKeys={['1']} style={{ borderRight: 'none' }}>
                    <img
                        src="static/imgs/logo-LM.png"
                        alt="logo"
                        style={{ width: '70%', display: 'flex', justifySelf: 'center' }}
                        draggable={false}
                    />
                    <Menu.Item key="1">
                        <HomeOutlined style={{ marginRight: '8px' }} />
                        <Link to="/">Library</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <BookOutlined style={{ marginRight: '8px' }} />
                        <Link to="/add-new-book">Add new book</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <WechatOutlined style={{ marginRight: '8px' }} />
                        <Link to="/conversation">Conversation</Link>
                    </Menu.Item>
                </Menu>

                <Menu
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        width: '100%',
                    }}
                >
                    {/* Divider */}
                    <Divider style={{ margin: '12px 0' }} />
                    <Menu.Item key="6">
                        <SettingOutlined style={{ marginRight: '8px' }} />
                        <Link to="/setting">Setting</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <UserOutlined style={{ marginRight: '8px' }} />
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item key="8" style={{ color: 'red' }}>
                        <LogoutOutlined style={{ marginRight: '8px' }} />
                        <Link to="/logout">Logout</Link>
                    </Menu.Item>
                </Menu>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
