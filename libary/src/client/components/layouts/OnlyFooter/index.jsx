import React from 'react';
import Footer from '../../../../shared/components/footer';
import { Layout, Row, Col, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Title } = Typography;

const OnlyFooter = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <Row
                gutter={[0, 24]}
                style={{ flex: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
                {/* Cột hình ảnh và tiêu đề */}
                <Col
                    xs={24} sm={24} md={12} lg={15}
                    style={{
                        position: 'relative',
                        borderRadius: '0 16px 16px 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '20px'
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            fontWeight: 'bold',
                            color: 'var(--ant-primary-color)',
                            textAlign: 'center',
                            marginBottom: '20px'
                        }}
                    >
                        Library Forum
                    </Title>
                    <img
                        src={`${window.location.origin}/static/imgs/login.svg`}
                        alt="Login"
                        style={{
                            width: '60%',
                            objectFit: 'contain'
                        }}
                        draggable="false"
                    />
                </Col>

                {/* Cột nội dung */}
                <Col
                    xs={24} sm={24} md={12} lg={9}
                    style={{
                        backgroundColor: 'var(--ant-primary-1)',
                        backdropFilter: 'blur(10px)',
                        opacity: 0.8,
                        borderRadius: '16px 0 0 16px',
                        boxShadow: '0px 0px 20px 20px var(--ant-primary-1), 0 4px 6px var(--ant-primary-1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                    {children}
                </Col>
            </Row>

            {/* Footer dạng Watermark */}
            <AntFooter
                style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    textAlign: 'center',
                    zIndex: 0,
                    opacity: 0.7,
                    fontSize: '70%',
                    backgroundColor: 'transparent',
                    pointerEvents: 'none',
                }}
            >
                <Footer />
            </AntFooter>
        </div>
    );
};

export default OnlyFooter;
