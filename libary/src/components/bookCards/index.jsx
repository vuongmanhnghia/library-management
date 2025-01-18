import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { truncateText } from '../../utils';
const { Meta } = Card;

const CardRender = ({ img, title, author, date, intro, adress = '', widthCard, heightCard, canHover = true }) => {
    return (
        <Card
            hoverable={canHover}
            cover={
                <img
                    draggable={false}
                    src={img}
                    alt="Preview Cover"
                    style={{
                        minHeight: heightCard,
                        height: heightCard,
                        objectFit: 'cover',
                        objectPosition: 'top center',
                    }}
                />
            }
            style={{ width: widthCard }}
        >
            {/* Meta of Card */}
            <Meta
                title={title}
                
                description={
                    <>
                        <span style={{ fontWeight: 'bold' }}>Author:</span> {truncateText(author, 18)} {/* Adjust max length as needed */} <br />
                        <span style={{ fontWeight: 'bold' }}>Published Date:</span> {date}
                        <br />
                        <span style={{ fontWeight: 'bold' }}>Introduction:</span> {truncateText(intro, 45)} {/* Adjust max length as needed */}
                    </>
                }
            />
            {/* Button of Card */}
            <div
                style={{
                    marginTop: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Link to={adress}>
                    <Button type="primary">View Detail</Button>
                </Link>
                <Button style={{ marginLeft: '8px' }}>
                    <HeartOutlined />
                </Button>
                <Button style={{ marginLeft: '8px' }}>
                    <ShareAltOutlined />
                </Button>
            </div>
        </Card>
    );
};

export default CardRender;
