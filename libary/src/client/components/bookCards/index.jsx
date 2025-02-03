import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { HeartOutlined, ShareAltOutlined, HeartFilled } from '@ant-design/icons';
import { truncateText } from '../../../shared/utils';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const CardRender = ({
    img,
    title,
    author,
    date,
    intro,
    widthCard,
    address = '',
    heightCard,
    canHover = true,
    id,
    states = false,
}) => {
    const [heard, setHeard] = useState(false);

    const handleFacebookShare = () => {
        const url = window.location.href;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

        window.open(facebookShareUrl, '_blank', 'width=600,height=400');
    };

    const handleHeartClick = () => {
        setHeard((prevState) => !prevState); 
    };

    return (
        <Card
            key={id}
            hoverable={canHover}
            cover={
                <img
                    
                    loading="lazy"
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
                        <span style={{ fontWeight: 'bold' }}>Author:</span> {truncateText(author, 18)}{' '}
                        <br />
                        <span style={{ fontWeight: 'bold' }}>Published Date:</span> {date === null ? 'N/A' : date}
                        <br />
                        <span style={{ fontWeight: 'bold' }}>Introduction:</span> {truncateText(intro, 45)}{' '}
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
                <Link to={address}>
                    <Button type="primary">View Detail</Button>
                </Link>
                <Button disabled={states} style={{ marginLeft: '8px' }} onClick={handleHeartClick}>
                    {heard ? <HeartFilled style={{ color: 'var(--ant-primary-6)' }} /> : <HeartOutlined />}
                </Button>
                <Button disabled={states} style={{ marginLeft: '8px' }} onClick={handleFacebookShare}>
                    <ShareAltOutlined />
                </Button>
            </div>
        </Card>
    );
};

export default CardRender;
