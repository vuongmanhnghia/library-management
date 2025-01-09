import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Card, Space, Typography, Modal } from 'antd';
import 'antd/dist/reset.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Đường dẫn worker của react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const { Title, Text } = Typography;

const BookReader = ({ book, onAddFavorite }) => {
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error) => {
        console.error('Lỗi khi tải file PDF:', error.message);
    };


    const handleDownload = () => {
        if (!book.fileUrl) {
            Modal.error({
                title: 'Lỗi',
                content: 'Không thể tải xuống sách. Đường dẫn không hợp lệ.',
            });
            return;
        }
        const link = document.createElement('a');
        link.href = book.fileUrl;
        link.download = `${book.title}.pdf`;
        link.click();
    };

    const handleMoreInfo = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <Card
            style={{ width: '80%', margin: '20px auto', textAlign: 'center' }}
            cover={
                <div>
                    <Document
                        file={book.fileUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={onDocumentLoadError}
                    >
                        <Page pageNumber={currentPage} />
                    </Document>
                    <div style={{ marginTop: 10 }}>
                        {numPages ? (
                            <>
                                <Button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
                                    Trang trước
                                </Button>
                                <Text style={{ margin: '0 10px' }}>
                                    Trang {currentPage} / {numPages}
                                </Text>
                                <Button
                                    disabled={currentPage >= numPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >
                                    Trang sau
                                </Button>
                            </>
                        ) : (
                            <Text>Đang tải tài liệu...</Text>
                        )}
                    </div>
                </div>
            }
        >
            <Title level={4}>{book.title}</Title>
            <Text type="secondary">Tác giả: {book.author}</Text>
            <p style={{ marginTop: 10 }}>{book.description}</p>
            <Space>
                <Button type="primary" >
                    Thêm vào yêu thích
                </Button>
                <Button type="default" onClick={handleDownload}>
                    Tải về sách
                </Button>
                <Button type="dashed" onClick={handleMoreInfo}>
                    Xem thêm
                </Button>
            </Space>

            <Modal
                title="Thông tin chi tiết"
                open={isModalOpen}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Đóng
                    </Button>,
                ]}
            >
                <p>
                    <b>Tiêu đề:</b> {book.title}
                </p>
                <p>
                    <b>Tác giả:</b> {book.author}
                </p>
                <p>
                    <b>Miêu tả:</b> {book.description}
                </p>
            </Modal>
        </Card>
    );
};


const App = () => {

    const exampleBook = {
        id: 1,
        title: 'Sách Mẫu PDF',
        author: 'Tác giả A',
        description: 'Đây là một cuốn sách mẫu hiển thị file PDF.',
        fileUrl: 'https://example.com/sample.pdf',
    };

    return (
        <div style={{ padding: '5px' }}>
            <BookReader book={exampleBook}/>
        </div>
    );
};

export default App;
