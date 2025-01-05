import React from 'react';
import { Card, Button, Pagination, Row, Col, Select, Carousel } from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Option } = Select;

const CardItem = ({ title, text, src, author }) => (
    <Card
        hoverable
        cover={
            <img
                draggable={false}
                alt={title}
                src={src}
                style={{
                    height: '250px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                }}
            />
        }
        style={{ width: 250 }}
    >
        <Meta
            title={title}
            description={
                <>
                    Author: {author} <br />
                    Watched: {text}
                </>
            }
        />
        <div
            style={{
                marginTop: '16px',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Button type="primary">Xem chi tiết</Button>
            <Button style={{ marginLeft: '8px' }}>
                <HeartOutlined />
            </Button>
            <Button style={{ marginLeft: '8px' }}>
                <ShareAltOutlined />
            </Button>
        </div>
    </Card>
);

const contentStyle = {
    borderRadius: 6,
    width: '100%',
    margin: 0,
    height: '36vh',
    color: '#fff',
    lineHeight: '36vh',
    textAlign: 'center',
    backgroundImage: 'url(/static/imgs/banner.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const Home = () => {
    const cardData = [
        {
            title: 'Những giấc mở xanh',
            author: 'Chivas',
            text: '21',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Sách 2',
            author: 'Trần Quốc Cường',
            text: '1919',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Những giấc mở xanh',
            author: 'Chivas',
            text: '21',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Sách 2',
            author: 'Trần Quốc Cường',
            text: '1919',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Những giấc mở xanh',
            author: 'Chivas',
            text: '21',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Sách 2',
            author: 'Trần Quốc Cường',
            text: '1919',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Sách 2',
            author: 'Trần Quốc Cường',
            text: '1919',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Những giấc mở xanh',
            author: 'Chivas',
            text: '21',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Sách 2',
            author: 'Trần Quốc Cường',
            text: '1919',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Sách 2',
            author: 'Trần Quốc Cường',
            text: '1919',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Những giấc mở xanh',
            author: 'Chivas',
            text: '21',
            src: '/static/imgs/image.png',
        },
        {
            title: 'Sách 2',
            author: 'Trần Quốc Cường',
            text: '1919',
            src: '/static/imgs/image.png',
        },
    ];

    return (
        <div style={{ padding: '16px' }}>
            <Row justify="center">
                {/* Them thong tin cua thu vien o day */}
                <Carousel autoplay  style={{ width: '80vw', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
            </Row>
            {/* Sort */}
            <Row  justify="center" style={{ marginBottom: '16px', gap: '16px' }}>
                <Col>
                    <Select size='large' defaultValue="name" style={{ width: 150 }}>
                        <Option value="name">Name</Option>
                        <Option value="date">Date</Option>
                    </Select>
                </Col>
                <Col>
                    <Select size='large' defaultValue="asc" style={{ width: 150 }}>
                        <Option value="asc">A to Z</Option>
                        <Option value="desc">Z to A</Option>
                    </Select>
                </Col>
                <Col>
                    <Button size='large' type="primary">Apply</Button>
                </Col>
            </Row>
            {/* Row for cards */}
            <Row gutter={[16, 16]} justify="center">
                {cardData.map((data, index) => (
                    <Col
                        key={index}
                        xs={24}
                        sm={12}
                        md={8}
                        lg={6}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <CardItem title={data.title} text={data.text} src={data.src} author={data.author} />
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <Row justify="center" style={{ marginTop: '24px' }}>
                <Pagination defaultCurrent={1} total={200} showSizeChanger={false} style={{ textAlign: 'center' }} />
            </Row>
        </div>
    );
};

export default Home;
