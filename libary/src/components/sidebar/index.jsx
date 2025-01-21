import React from 'react';
import { Layout, Menu, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    HomeOutlined,
    BookOutlined,
    CommentOutlined,
    UploadOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { logout } from '../../redux/userSlice';

const { Sider } = Layout;

const Sidebar = () => {
    const PUBLIC_URL = process.env.PUBLIC_URL;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        setInterval(() => {
            // Gọi action logout để reset Redux
            dispatch(logout());
            navigate('/login');
        }, 500);
    };

    return (
        <Sider
            width={200}
            style={{
                height: '100vh',
                position: 'fixed',
                left: 0,
                overflow: 'auto',
            }}
        >
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
                        src={`${PUBLIC_URL}/static/imgs/logo-LM.png`}
                        alt="logo"
                        style={{ width: '70%', display: 'flex', justifySelf: 'center' }}
                        draggable={false}
                    />
                    <Menu.Item key="1">
                        <HomeOutlined style={{ marginRight: '8px' }} />
                        <Link to="/">Library</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <UploadOutlined style={{ marginRight: '8px' }} />
                        <Link to="/upload-book">Upload book</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <BookOutlined style={{ marginRight: '8px' }} />
                        <Link to="/my-books">My books</Link>
                    </Menu.Item>
                    <Menu.Item key="4" >
                        <CommentOutlined style={{ marginRight: '8px' }}  />
                        <Link to="/conversation" >Conversation</Link> {/* Update sau */}
                    </Menu.Item>
                    <Menu.Item key="5">
                        <QuestionCircleOutlined style={{ marginRight: '8px' }} />
                        <Link to="/contract">Contract</Link>
                    </Menu.Item>
                </Menu>

                <Menu
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        width: '100%',
                    }}
                >
                    <Divider style={{ margin: '12px 0' }} />
                    <Menu.Item key="6">
                        <SettingOutlined style={{ marginRight: '8px' }} />
                        <Link to="/setting">Setting</Link>
                    </Menu.Item>
                    <Menu.Item key="7">
                        <UserOutlined style={{ marginRight: '8px' }} />
                        <Link to="/profile">Profile</Link>
                    </Menu.Item>
                    <Menu.Item style={{ color: 'red' }} onClick={handleLogout}>
                        <LogoutOutlined style={{ marginRight: '8px' }} />
                        Logout
                    </Menu.Item>
                </Menu>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
