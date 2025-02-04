import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from '../../header';
import SiderComponent from '../../../../shared/components/sidebar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { itemsSibar } from '../valueSidbar';
import Footer from '../../../../shared/components/footer';

const { Content } = Layout;

const DefaultLayout = ({ children }) => {
    // Get the sidebar collapse state from localStorage, defaulting to false
    const stateSibar = localStorage.getItem('stateSibar');
    const [collapsed, setCollapsed] = useState(stateSibar ? JSON.parse(stateSibar) : false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get the sidebar items using dispatch and navigate
    const menuItems = itemsSibar(dispatch, navigate);

    useEffect(() => {
        // Save the sidebar state to localStorage whenever it changes
        localStorage.setItem('stateSibar', JSON.stringify(collapsed));
    }, [collapsed]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderComponent collapsed={collapsed} onCollapse={setCollapsed} items={menuItems} />{' '}
            {/* Truyền mảng items vào đây */}
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.3s' }}>
                <Header />
                <Content style={{ margin: '0' }}>
                    <div
                        style={{
                            padding: '0 16px',
                            minHeight: 360,
                            background: 'white',
                            borderRadius: 8,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                < Footer />
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
