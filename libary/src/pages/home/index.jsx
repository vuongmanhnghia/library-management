import React from "react";
import { Card, Button, Pagination, Row, Col } from "antd";
import { HeartOutlined, ShareAltOutlined } from "@ant-design/icons";

const { Meta } = Card;

const CardItem = ({ title, text, src, author }) => (
<Card
hoverable
cover={
    <img
    alt={title}
    src={src}
    style={{
        height: "250px",
        objectFit: "cover",
        objectPosition: "top center",
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
    marginTop: "16px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    }}
>
    <Button type="primary">Xem chi tiết</Button>
    <Button style={{ marginLeft: "8px" }}>
    <HeartOutlined />
    </Button>
    <Button style={{ marginLeft: "8px" }}>
    <ShareAltOutlined />
    </Button>
</div>
</Card>
);

const Home = () => {
const cardData = [
{
    title: "Những giấc mở xanh",
    author: "Chivas",
    text: "21",
    src: "/static/imgs/image.png",
},
{
    title: "Sách 2",
    author: "Trần Quốc Cường",
    text: "1919",
    src: "/static/imgs/image.png",
},
{
    title: "Những giấc mở xanh",
    author: "Chivas",
    text: "21",
    src: "/static/imgs/image.png",
},
{
    title: "Sách 2",
    author: "Trần Quốc Cường",
    text: "1919",
    src: "/static/imgs/image.png",
},
{
    title: "Những giấc mở xanh",
    author: "Chivas",
    text: "21",
    src: "/static/imgs/image.png",
},
{
    title: "Sách 2",
    author: "Trần Quốc Cường",
    text: "1919",
    src: "/static/imgs/image.png",
},
{
    title: "Sách 2",
    author: "Trần Quốc Cường",
    text: "1919",
    src: "/static/imgs/image.png",
},
{
    title: "Những giấc mở xanh",
    author: "Chivas",
    text: "21",
    src: "/static/imgs/image.png",
},
{
    title: "Sách 2",
    author: "Trần Quốc Cường",
    text: "1919",
    src: "/static/imgs/image.png",
},
{
    title: "Sách 2",
    author: "Trần Quốc Cường",
    text: "1919",
    src: "/static/imgs/image.png",
},
{
    title: "Những giấc mở xanh",
    author: "Chivas",
    text: "21",
    src: "/static/imgs/image.png",
},
{
    title: "Sách 2",
    author: "Trần Quốc Cường",
    text: "1919",
    src: "/static/imgs/image.png",
},
];

return (
<div style={{ padding: "16px" }}>
    {/* Row for cards */}
    <Row gutter={[16, 16]} justify="center">
    {cardData.map((data, index) => (
        <Col
        key={index}
        xs={24}
        sm={12}
        md={8}
        lg={6}
        style={{ display: "flex", justifyContent: "center" }}
        >
        <CardItem title={data.title} text={data.text} src={data.src} author={data.author} />
        </Col>
    ))}
    </Row>

    {/* Pagination */}
    <Row justify="center" style={{ marginTop: "24px" }}>
    <Pagination
        defaultCurrent={1}
        total={200}
        showSizeChanger={false}
        style={{ textAlign: "center" }}
    />
    </Row>
</div>
);
};

export default Home;
