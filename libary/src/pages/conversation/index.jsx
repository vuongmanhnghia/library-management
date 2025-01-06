import React, { useState } from 'react';
import { Card, List, Input, Button, Avatar, Typography, Upload, Select } from 'antd';
import { PlusOutlined, ArrowUpOutlined, HeartFilled, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const Conversation = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [favoriteBooks, setFavoriteBooks] = useState(['Book 1', 'Book 2', 'Book 3']);
    const [selectedBook, setSelectedBook] = useState(null);
    const [anonymousMode, setAnonymousMode] = useState(true); // Chế độ ẩn danh

    const handleAddPost = () => {
        if (newPost.trim() || attachments.length > 0 || selectedBook) {
            setPosts([
                {
                    id: uuidv4(),
                    author: anonymousMode ? 'Người dùng ẩn danh' : 'Bản thân',
                    avatar: anonymousMode
                        ? 'https://joeschmoe.io/api/v1/random'
                        : 'https://i.pravatar.cc/150?u=current_user',
                    content: newPost,
                    attachments,
                    book: selectedBook,
                    comments: [],
                },
                ...posts,
            ]);
            setNewPost('');
            setAttachments([]);
            setSelectedBook(null);
        }
    };

    const handleAddComment = (postId, comment) => {
        const timestamp = new Date().toLocaleString(); // Lấy thời gian hiện tại
        setPosts(
            posts.map((post) =>
                post.id === postId
                    ? {
                          ...post,
                          comments: [
                              ...post.comments,
                              { id: uuidv4(), content: comment, author: 'Người dùng ẩn danh', timestamp },
                          ],
                      }
                    : post,
            ),
        );
    };

    const handleAttachmentChange = ({ fileList }) => {
        setAttachments(
            fileList.map((file) => ({
                name: file.name,
                url: file.url || URL.createObjectURL(file.originFileObj),
            })),
        );
    };

    const toggleLike = (postId) => {
        setPosts(posts.map((post) => (post.id === postId ? { ...post, liked: !post.liked } : post)));
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <Title level={2}>Conversation</Title>

            <Card>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <TextArea
                        rows={4}
                        placeholder="Chia sẻ suy nghĩ về sách của bạn..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        style={{ flex: 1, marginRight: '10px' }}
                    />
                    <Button type="primary" icon={<ArrowUpOutlined />} onClick={handleAddPost} />
                </div>
                <div>
                    <Upload
                        action="/api/upload"
                        listType="picture-card"
                        fileList={attachments.map((att, index) => ({
                            uid: index,
                            name: att.name,
                            url: att.url,
                        }))}
                        onChange={handleAttachmentChange}
                    >
                        {attachments.length < 6 && (
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                        )}
                    </Upload>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Select
                        value={anonymousMode ? 'Ẩn danh' : 'Hiển thị tên'}
                        onChange={(value) => setAnonymousMode(value === 'Ẩn danh')}
                        style={{ width: 120 }}
                    >
                        <Option value="Ẩn danh">Ẩn danh</Option>
                        <Option value="Hiển thị tên">Hiển thị tên</Option>
                    </Select>
                </div>
            </Card>

            <List
                itemLayout="vertical"
                dataSource={posts}
                renderItem={(post) => (
                    <Card
                        key={post.id}
                        style={{ marginTop: '20px' }}
                        title={
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar src={post.avatar} />
                                <span style={{ marginLeft: '10px' }}>{post.author}</span>
                            </div>
                        }
                    >
                        <p>{post.content}</p>
                        {post.attachments && post.attachments.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                                {post.attachments.slice(0, 6).map((att, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            width: 'calc(33.33% - 10px)',
                                            paddingBottom: '33.33%',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            borderRadius: '8px',
                                            backgroundColor: '#f0f0f0',
                                        }}
                                    >
                                        <img
                                            src={att.url}
                                            alt={att.name}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        {post.book && (
                            <p>
                                <strong>Sách yêu thích:</strong> {post.book}
                            </p>
                        )}
                        <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #ccc' }}></hr>
                        <List
                            dataSource={post.comments}
                            renderItem={(comment) => (
                                <div key={comment.id} style={{ marginLeft: '20px', marginTop: '10px' }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <span style={{ fontWeight: 'bold' }}>{comment.author}</span>
                                        <span style={{ fontSize: '12px', color: 'gray' }}>{comment.timestamp}</span>
                                    </div>
                                    <p>{comment.content}</p>
                                </div>
                            )}
                        />
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                            <Input
                                rows={2}
                                placeholder="Viết bình luận..."
                                onPressEnter={(e) => {
                                    if (e.target.value.trim()) {
                                        handleAddComment(post.id, e.target.value.trim());
                                        e.target.value = ''; // Xóa nội dung input
                                    }
                                }}
                            />
                            <Button
                                type="text"
                                icon={<ArrowUpOutlined />}
                                onClick={(e) => {
                                    const commentText = e.target.previousElementSibling.value.trim(); // Get the comment text from the Input field
                                    if (commentText) {
                                        handleAddComment(post.id, commentText); // Call handleAddComment with post.id and commentText
                                        e.target.previousElementSibling.value = ''; // Clear the input field after submitting
                                    }
                                }}
                            ></Button>
                            <Button
                                type="text"
                                icon={post.liked ? <HeartFilled style={{ color: 'black' }} /> : <HeartOutlined />}
                                onClick={() => toggleLike(post.id)}
                            />
                            <Button type="text" icon={<ShareAltOutlined />}></Button>
                        </div>
                    </Card>
                )}
            />
        </div>
    );
};

export default Conversation;
