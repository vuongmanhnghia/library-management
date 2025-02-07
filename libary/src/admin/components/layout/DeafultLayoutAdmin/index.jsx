import React, { useState, useEffect } from 'react';
import { Layout, Grid } from 'antd';
import SiderComponent from '../../../../shared/components/sidebar';
import HeaderMB from '../../../../shared/components/headerMB';
import Footer from '../../../../shared/components/footer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { itemsSibar } from '../valueSliderAdmin';

const { Content } = Layout;
const { useBreakpoint } = Grid;

const DefaultLayoutAdmin = ({ children }) => {
    const stateSibar = localStorage.getItem('stateSibar');
    const [collapsed, setCollapsed] = useState(stateSibar ? JSON.parse(stateSibar) : false);
    const breakpoint = useBreakpoint();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const menuItems = itemsSibar(dispatch, navigate);

    useEffect(() => {
        localStorage.setItem('stateSibar', JSON.stringify(collapsed));
    }, [collapsed]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {!breakpoint.md ? <HeaderMB items={menuItems} /> :
                <SiderComponent collapsed={collapsed} onCollapse={setCollapsed} items={menuItems} />}
            <Layout style={{ marginLeft: breakpoint.md ? (collapsed ? 80 : 200) : 0, marginTop: breakpoint.md ? 0 : 32, transition: 'margin-left 0.3s' }}>
                <Content style={{ margin: '16px', padding: 24, minHeight: 360, background: 'white', borderRadius: 8 }}>
                    {children}
                </Content>
                <Footer />
            </Layout>
        </Layout>
    );
};

export default DefaultLayoutAdmin;
