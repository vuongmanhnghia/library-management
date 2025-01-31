import React from 'react';
import { Divider, Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userSlice';
import { logoutBook } from '../../../redux/bookSlice';
import { LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const PUBLIC_URL = process.env.PUBLIC_URL;

const SiderComponent = ({ collapsed, onCollapse, items }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(logoutBook());
        setTimeout(() => {
            navigate('/login');
        }, 500);
    };

    const logoutItem = (
        <Menu.Item  key="logout"  style={{ color: 'red' }} icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
        </Menu.Item>
    );
    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                overflow: 'auto',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '4px',
                    marginTop: '16px',
                }}
            >
                <img
                    src={`${PUBLIC_URL}/static/imgs/logo-LM.png`}
                    alt="logo"
                    style={{ width: collapsed ? '50%' : '70%', transition: 'width 0.3s' }}
                    draggable={false}
                />
            </div>
            <div>
                <Menu defaultSelectedKeys={['1']} mode="inline" items={items} style={{ border: 'none' }} />
                <Divider />
                <Menu mode="inline" >{logoutItem}</Menu>
            </div>
        </Sider>
    );
};

export default SiderComponent;
