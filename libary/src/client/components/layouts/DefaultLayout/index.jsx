import React, { useState, useEffect } from 'react';
import { Layout, Grid } from 'antd';
import Header from '../../header';
import HeaderMB from '../../../../shared/components/headerMB';
import SiderComponent from '../../../../shared/components/sidebar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { itemsSibar } from '../valueSidbar';
import Footer from '../../../../shared/components/footer';
import FloatAI from '../../floatAI';
const { Content } = Layout;
const { useBreakpoint } = Grid;

const DefaultLayout = ({ children }) => {
    const initialState = localStorage.getItem('stateSibar');
    const [collapsed, setCollapsed] = useState(initialState ? JSON.parse(initialState) : false);
    const breakpoint = useBreakpoint();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuItems = itemsSibar(dispatch, navigate);

    useEffect(() => {
        localStorage.setItem('stateSibar', JSON.stringify(collapsed));
    }, [collapsed]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {!breakpoint.md ?
                <HeaderMB items={menuItems} /> :
                <SiderComponent collapsed={collapsed} onCollapse={setCollapsed} items={menuItems} />}

            <Layout
                style={{
                    marginLeft: breakpoint.md ? (collapsed ? 80 : 200) : 0,
                    marginTop: breakpoint.md ? 0 : 64,
                    transition: 'margin-left 0.3s ease-in-out',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <Header />

                <Content
                    style={{
                        flex: 1,
                        padding: '16px',
                        background: 'white',
                        borderRadius: 8,
                        minHeight: 360,
                        overflowY: 'auto',
                    }}
                >
                    {children}
                </Content>


                <Footer
                    style={{
                        textAlign: 'center',
                        position: 'relative',
                        width: '100%',
                        background: 'transparent',
                        padding: '16px 0',
                    }}
                />
            </Layout>
            <FloatAI />
        </Layout>
    );
};

export default DefaultLayout;
