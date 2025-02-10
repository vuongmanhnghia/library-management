import React from 'react';

const Footer = () => {
    return (
        <div
            style={{
                textAlign: 'center',
                padding: '0',
                fontWeight: 'bold',
                lineHeight: '24px',
                color: 'rgba(0, 0, 0, 0.1)',
                backgroundColor: 'transparent',
                fontSize: '90%'
            }}
        >
            Library Forum ©{new Date().getFullYear()} Created by Team Chivas
            <br />
            Google Developer Group - GDG on Campus: PTIT
        </div>
    );
};

export default Footer;
