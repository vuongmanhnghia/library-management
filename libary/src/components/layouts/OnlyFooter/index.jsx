import React from 'react';
import Footer from '../../footer';
import { Layout, Row, Col, Typography } from 'antd';
const { Footer: AntFooter } = Layout;
const { Title } = Typography;
const publicUrl = process.env.PUBLIC_URL;

const OnlyFooter = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <Row>
                <Col xs={24} sm={24} md={12} lg={14} style={{ position: 'relative', borderRadius: '0 16px 16px 0' }}>
                    <Title
                        level={3}
                        style={{
                            position: 'absolute',
                            top: '5%',
                            left: '20%',
                            transform: 'translate(-50%, -50%)',
                            fontWeight: 'bold',
                            color: 'var(--ant-primary-color)',
                        }}
                    >
                        Library Management
                    </Title>
                    <img
                        src={`${publicUrl}/static/imgs/login.svg`}
                        alt="Login"
                        style={{
                            width: '65%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        draggable="false"
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={10} style={{ backgroundColor: 'var(--ant-primary-2)' }}>
                    <Row
                        style={{
                            minHeight: '100vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        {children}
                    </Row>
                </Col>
            </Row>

            {/* Watermark-style Footer */}
            <AntFooter
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    textAlign: 'center',
                    padding: '20px 0',
                    zIndex: 1, 
                    backgroundColor: 'transparent',
                }}
            >
                <Footer />
            </AntFooter>
        </div>
    );
};

export default OnlyFooter;
