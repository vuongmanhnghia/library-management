import React, { useEffect, useState } from 'react';
import { Button, Pagination, Row, Col, Select, Carousel, Result, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../shared/components/loadingUI';
import CardRender from '../../components/bookCards';
import CarouselSlide from '../../components/carouselRender';
import BookService from '../../../shared/services/bookService';

const { Option } = Select;

const CardItem = ({ title, text, src, author, date, id }) => (
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

const Home = () => {
    const navigate = useNavigate();
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBooks, setTotalBooks] = useState(0);
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const perPage = 5;

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await BookService.getAll(currentPage, perPage);
            if (response.success) {
                setCardData(response.data.books);
                setTotalBooks(response.data.total_books);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchBooks();
    }, [currentPage, sortField, sortOrder]);

    return (
        <div style={{ padding: '16px' }} className="custom-scrollbar">
            <Row justify="center">
                <Carousel autoplay style={{ width: '100%', maxWidth: '1200px', marginBottom: '16px' }}>
                    <CarouselSlide text="Posts and Telecommunications Institute of Technology" image={`${window.location.origin}/static/carousel/1.jpg`} position="top" />
                    <CarouselSlide text="Library Center" image={`${window.location.origin}/static/carousel/2.jpg`} />
                    <CarouselSlide text="Logo PTIT" image={`${window.location.origin}/static/carousel/4.jpg`} />
                </Carousel>
            </Row>

            {/* Bộ lọc sắp xếp */}
            <Row justify="center" style={{ marginBottom: '16px' }}>
                <Space wrap>
                    <Select size="large" value={sortField} style={{ maxWidth: 120 }} onChange={setSortField}>
                        <Option value="name">Name</Option>
                        <Option value="date">Date</Option>
                    </Select>
                    <Select size="large" value={sortOrder} style={{ maxWidth: 120 }} onChange={setSortOrder}>
                        <Option value="asc">A to Z</Option>
                        <Option value="desc">Z to A</Option>
                    </Select>
                    <Button size="large" type="primary" onClick={fetchBooks}>Apply</Button>
                </Space>
            </Row>

            {/* Danh sách sách */}
            <Row gutter={[16, 16]} justify="center">
                {loading ? (
                    <Loading />
                ) : cardData.length === 0 ? (
                    <Result
                        title="No books found"
                        extra={
                            <Button type="default" size="large" onClick={() => navigate('/upload-book')}>
                                Go Upload First Book
                            </Button>
                        }
                    />
                ) : (
                    cardData.map((book) => (
                        <Col
                            key={book._id}
                            xs={24} sm={12} md={8} lg={6}
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

            <Row justify="center" style={{ marginTop: '24px', textAlign: 'center' }}>
                <Pagination
                    current={currentPage}
                    total={totalBooks}
                    pageSize={perPage}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                />
            </Row>
        </div>
    );
};

export default Home;
