import React, { useEffect, useState } from 'react';
import { Button, Pagination, Row, Col, Select, Carousel } from 'antd';
import Loading from '../../components/loadingUI';
import CardRender from '../../components/bookCards';
import CarouselSlide from '../../components/carouselRender';
import BookService from '../../services/bookService';

const { Option } = Select;
const publicUrl = process.env.PUBLIC_URL;

const CardItem = ({ title, text, src, author, date, id }) => {
    return (
        // Card Component
        <CardRender
            key={id}
            img={src}
            title={title}
            author={author}
            date={date}
            intro={text}
            address={`/view-book/${id}`}
            widthCard={270}
            heightCard={250}
        />
    );
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
        const response = await BookService.getAll(currentPage, 8);
        if (response.success) {
            setCardData(response.data || []);
            setTotalBooks(response.data.length || 0); 
        }
        setLoading(false);
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
                    <CarouselSlide
                        text="Posts and Telecommunications Institute of Technology"
                        image={`${publicUrl}/static/carousel/1.jpg`}
                        position="top"
                    />
                    <CarouselSlide text="Libary Center" image={`${publicUrl}/static/carousel/2.jpg`} />
                    <CarouselSlide text="Logo PTIT" image={`${publicUrl}/static/carousel/4.jpg`} />
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
                    cardData.map((book) => (
                        <Col
                            key={book._id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <CardItem
                                key={book.id}
                                title={book.title}
                                text={book.introduction}
                                src={book.cover}
                                author={book.author}
                                date={book.published_date}
                                id={book.id}
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
