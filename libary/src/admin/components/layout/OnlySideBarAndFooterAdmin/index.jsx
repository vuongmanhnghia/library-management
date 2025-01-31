import React from 'react';
import Sidebar from '../../../../shared/components/sidebar';
import { Layout } from 'antd';
const { Sider, Content } = Layout;

const OnlySideBarAndFooterAdmin = ({ children }) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Sidebar */}
            <Sider
                width={200}
                style={{
                    background: '#fff',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                }}
            >
                <Sidebar />
            </Sider>

            {/* Content */}
            <Layout>
                {/* Main Content */}
                <Content
                    style={{
                        padding: '16px',
                        background: '#fff',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default OnlySideBarAndFooterAdmin;
