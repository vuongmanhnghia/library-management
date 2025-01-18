import React, { useEffect, useState } from 'react';
import { Button, Pagination, Row, Col, Select, Carousel } from 'antd';
import Loading from '../../components/loadingUI';
import CardRender from '../../components/bookCards';

const { Option } = Select;

const CardItem = ({ title, text, src, author, date, _id }) => {
    return (
        // Card Component
        <CardRender
            img={src}
            title={title}
            author={author}
            date={date}
            intro={text}
            adress={`/book-reader/${_id}`}
            widthCard={250}
            heightCard={'250px'}
        />
    );
};

// Style for Carousel
const contentStyle = {
    borderRadius: 6,
    width: '100%',
    margin: 0,
    height: '34rem',
    color: '#fff',
    lineHeight: '50vh',
    textAlign: 'center',
    backgroundImage: 'url(/static/imgs/banner_book.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const Home = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
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
            // Lấy token từ localStorage
            const token = localStorage.getItem('access_token');
            const response = await fetch(
                `${apiUrl}/books/?page=${currentPage}&perpage=24`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const data = result.data.books[0];
            setCardData(data || []); // Cập nhật `cardData` với dữ liệu nhận được
            setTotalBooks(data.length || 0); // Cập nhật số lượng sách
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
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
                    pageSize={24}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    style={{ textAlign: 'center' }}
                />
            </Row>
        </div>
    );
};

export default Home;
