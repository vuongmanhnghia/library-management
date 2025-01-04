import React from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';

const CardItem = ({ title, text, src }) => (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={src} style={{ height: '300px' , objectFit: 'cover' , objectPosition: 'top center'}}/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
            <Button variant="primary">Xem chi tiết</Button>
        </Card.Body>
    </Card>
);

const Home = () => {
    const cardData = [
        { title: 'Sách 1', text: 'Tác giả: ... Lượt xem ...', src: '/static/imgs/image.png' },
        { title: 'Sách 2', text: 'Tác giả: ... Lượt xem ...', src: '/static/imgs/image.png' },
        { title: 'Sách 3', text: 'Tác giả: ... Lượt xem ...', src: '/static/imgs/image.png' },
        { title: 'Sách 4', text: 'Tác giả: ... Lượt xem ...', src: '/static/imgs/image.png' },
        { title: 'Sách 5', text: 'Tác giả: ... Lượt xem ...', src: '/static/imgs/image.png' },
        { title: 'Sách 6', text: 'Tác giả: ... Lượt xem ...', src: '/static/imgs/image.png' },
    ];

    return (
        <Container>
            <Row>
            </Row>
            <Row className="d-flex justify-content-start align-items-stretch p-5 pb-0">
                {cardData.map((data, index) => (
                    <Col key={index} md={3} className="d-flex justify-content-start mb-4">
                        <CardItem title={data.title} text={data.text} src={data.src} />
                    </Col>
                ))}
            </Row>
            <Row>
                <Pagination className="d-flex justify-content-center mb-">
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                </Pagination>
            </Row>
        </Container>
    );
};

export default Home;
