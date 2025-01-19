import React from 'react';
import Header from '../../header';
import Footer from '../../footer';
import Sidebar from '../../sidebar';
import { Layout } from 'antd';
import FloatAI from '../../floatAI';

const { Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
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
                {/* Header */}
                <Layout.Header
                    style={{
                        background: '#fff',
                        padding: '0 16px',
                        marginBottom: 16,
                    }}
                >
                    <Header />
                </Layout.Header>

                {/* Main Content */}
                <Content
                    style={{
                        padding: '16px',
                        background: '#fff',
                    }}
                >
                    {children}
                </Content>

                {/* Footer */}
                <Layout.Footer
                    style={{
                        textAlign: 'center',
                        background: '#fff',
                        paddingTop: 16,
                    }}
                >
                    <Footer />
                </Layout.Footer>
            </Layout>
            <FloatAI/>
        </Layout>
    );
};

export default DefaultLayout;
