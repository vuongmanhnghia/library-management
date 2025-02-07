import React from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userSlice';
import { logoutBook } from '../../../redux/bookSlice';
import { LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

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
        <Menu.Item key="logout" style={{ color: 'red' }} icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
        </Menu.Item>
    );

    return (
        <>
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
                        src={`${window.location.origin}/static/logoPage/logo.png`}
                        alt="logo"
                        style={{ width: collapsed ? '50%' : '70%', transition: 'width 0.3s' }}
                        draggable={false}
                    />
                </div>
                <Menu defaultSelectedKeys={['1']} mode="inline" items={items} style={{ border: 'none' }} />
                <Menu mode="inline">{logoutItem}</Menu>
            </Sider>
        </>
    );
};

export default SiderComponent;
