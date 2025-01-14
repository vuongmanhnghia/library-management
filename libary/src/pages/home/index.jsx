import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Pagination, Row, Col, Select, Carousel } from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import Loading from '../../components/loadingUI';

const { Meta } = Card;
const { Option } = Select;

const CardItem = ({ title, text, src, author, date, _id }) => {
    // Hàm cắt text dài
    function truncateText(text, length) {
        if (text.length > length) {
            return text.slice(0, length) + '...';
        } else if (text.length < length) {
            text += ' ';
            return text.padEnd(length, '\u00A0');
        }
        return text;
    }
    return (
        // Card Component
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
            {/* Meta of Card */}
            <Meta
                title={title}
                description={
                    <>
                        Author: {truncateText(author, 45)} {/* Adjust max length as needed */} <br />
                        Published Date: {date}
                        <br />
                        Introduction: {truncateText(text, 45)} {/* Adjust max length as needed */}
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
                <Link to={`/book-reader/${_id}`}>
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

// Style for Carousel
const contentStyle = {
    borderRadius: 6,
    width: '100%',
    margin: 0,
    height: '50vh',
    color: '#fff',
    lineHeight: '50vh',
    textAlign: 'center',
    backgroundImage: 'url(/static/imgs/banner_book.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const Home = () => {
    // Khai báo state
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    // Hàm fetch dữ liệu sách từ server
    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/books/`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const data = result.data;
            setCardData(data.books || []); // Cập nhật `cardData` với dữ liệu nhận được
            setTotalBooks(data.books.length || 0); // Cập nhật số lượng sách
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
        console.log(cardData);
    };

    useEffect(() => {
        fetchBooks();
    }, [currentPage, sortField, sortOrder]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSortChange = (value) => {
        setSortField(value);
    };

    const handleOrderChange = (value) => {
        setSortOrder(value);
    };

    return (
        <div style={{ padding: '16px' }} className="custom-scrollbar">
            {/* Carousel */}
            <Row justify="center">
                <Carousel
                    autoplay
                    style={{ width: '80vw', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}
                >
                    <div>
                        <h1 style={contentStyle}>Welcome to Our Library</h1>
                    </div>
                    <div>
                        <h1 style={contentStyle}>Explore Our Collections</h1>
                    </div>
                    <div>
                        <h1 style={contentStyle}>Join Our Community</h1>
                    </div>
                    <div>
                        <h1 style={contentStyle}>Discover New Stories</h1>
                    </div>
                </Carousel>
            </Row>
            {/* Button Sort */}
            <Row justify="center" style={{ marginBottom: '16px', gap: '16px' }}>
                <Col>
                    <Select size="large" value={sortField} style={{ width: 150 }} onChange={handleSortChange}>
                        <Option value="name">Name</Option>
                        <Option value="date">Date</Option>
                    </Select>
                </Col>
                <Col>
                    <Select size="large" value={sortOrder} style={{ width: 150 }} onChange={handleOrderChange}>
                        <Option value="asc">A to Z</Option>
                        <Option value="desc">Z to A</Option>
                    </Select>
                </Col>
                <Col>
                    <Button size="large" type="primary" onClick={() => fetchBooks()}>
                        Apply
                    </Button>
                </Col>
            </Row>
            {/* Render Card */}
            <Row gutter={[16, 16]} justify="center">
                {loading ? (
                    <Loading />
                ) : (
                    cardData.map((data) => (
                        <Col
                            key={data._id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <CardItem
                                title={data.title}
                                text={data.introduction}
                                src={data.cover}
                                author={data.author}
                                date={data.published_date}
                                _id={data._id}
                            />
                        </Col>
                    ))
                )}
            </Row>
            {/* Pagination */}
            <Row justify="center" style={{ marginTop: '24px' }}>
                <Pagination
                    current={currentPage}
                    total={totalBooks}
                    pageSize={10}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    style={{ textAlign: 'center' }}
                />
            </Row>
        </div>
    );
};

export default Home;
