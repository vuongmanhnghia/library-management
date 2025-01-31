import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
    return (
        <AntFooter
            style={{
                textAlign: 'center',
                padding: '0',
                fontWeight: 'bold',
                lineHeight: '24px',
                fontSize: '90%',
                color: 'rgba(0, 0, 0, 0.1)',
                backgroundColor: 'transparent',
                marginBottom: '24px',
            }}
        >
            Libary Management ©{new Date().getFullYear()} Created by Team Chivas Probation
            <br />
            Google Developer Group - GDG on Campus: PTIT
        </AntFooter>
    );
};

export default Footer;
