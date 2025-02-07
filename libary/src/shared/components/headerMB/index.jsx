import React, { useState } from 'react';
import { Layout, Button, Drawer, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/userSlice';
import { logoutBook } from '../../../redux/bookSlice';
import { LogoutOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderMB = ({ items }) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(logoutBook());
        setTimeout(() => {
            navigate('/login');
        }, 500);
    };

    const logoutItem = {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined style={{ color: 'red' }} />,
        onClick: handleLogout
    };

    return (
        <Header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Button
                type="primary"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setOpen(true)}

            />
            <span style={{ color: 'white', fontWeight: 'bold' }}>HI, {user?.full_name}</span>
            <Drawer
                title="Library Forum"
                placement="left"
                width={250}
                onClose={() => setOpen(false)}
                open={open}
            >
                <img
                    src={`${window.location.origin}/static/logoPage/logo.png`}
                    alt="logo"
                    style={{ width: '70%' }}
                    draggable={false}
                />
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={[...items, logoutItem]}
                    style={{ border: 'none' }}
                />
            </Drawer>
        </Header>
    );
};

export default HeaderMB;
