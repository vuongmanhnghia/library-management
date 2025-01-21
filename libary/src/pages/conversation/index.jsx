/* 
    ĐANG PHÁT TRIỂN
    Chức năng chính page: Diễn đàn sách cho các bạn đọc thảo luận bài đăng như 1 mạng xã hội
    Công nghệ sử dụng: uuid( dùng để tao id )
*/


import React, { useState } from 'react';
import { Card, List, Input, Button, Avatar, Typography, Upload, Select } from 'antd';
import { UploadOutlined, ArrowUpOutlined, HeartFilled, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;
const { Option } = Select;

const Conversation = () => {
    const userValue = useSelector((state) => state.user.user);

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [anonymousMode, setAnonymousMode] = useState(true);
    const [replyingTo, setReplyingTo] = useState(null); 

    const handleAddPost = () => {
        if (newPost.trim() || attachments.length > 0) {
            setPosts([
                {
                    id: uuidv4(),
                    author: anonymousMode ? 'Anonymous User' : userValue.full_name,
                    avatar: anonymousMode
                        ? 'https://joeschmoe.io/api/v1/random'
                        : userValue.avatar || 'https://joeschmoe.io/api/v1/random',
                    content: newPost,
                    attachments,
                    comments: [],
                },
                ...posts,
            ]);
            setNewPost('');
            setAttachments([]);
        }
    };

    const handleAddComment = (postId, comment, parentCommentId = null) => {
        const timestamp = new Date().toLocaleString(); 
        setPosts(
            posts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        comments: parentCommentId
                            ? post.comments.map((c) =>
                                    c.id === parentCommentId
                                        ? {
                                            ...c,
                                            replies: [
                                                ...c.replies,
                                                {
                                                    id: uuidv4(),
                                                    content: comment,
                                                    author: 'Anonymous User',
                                                    timestamp,
                                                },
                                            ],
                                        }
                                        : c,
                                )
                            : [
                                    ...post.comments,
                                    {
                                        id: uuidv4(),
                                        content: comment,
                                        author: 'Anonymous User',
                                        timestamp,
                                        replies: [],
                                    },
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
            <Title level={2} style={{ display: 'flex', justifyContent: 'center' }}>
                Conversation
            </Title>

            <Card>
                <Title level={4} style={{ marginTop: '0' }}>
                    Share your post
                </Title>
                <div style={{ marginBottom: '10px' }}>
                    <Select
                        value={anonymousMode ? 'Anonymous' : 'Public'}
                        onChange={(value) => setAnonymousMode(value === 'Anonymous')}
                        style={{ width: 120 }}
                    >
                        <Option value="Anonymous">Anonymous</Option>
                        <Option value="Public">Public</Option>
                    </Select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Input
                        size="large"
                        placeholder="Share your thoughts about the book..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        style={{ flex: 1, marginRight: '10px' }}
                        onPressEnter={handleAddPost}
                    />
                    <Button type="primary" icon={<ArrowUpOutlined />} onClick={handleAddPost} />
                </div>
                <div>
                    <Upload
                        action="/api/upload"
                        listType="picture"
                        fileList={attachments.map((att, index) => ({
                            uid: index,
                            name: att.name,
                            url: att.url,
                        }))}
                        onChange={handleAttachmentChange}
                    >
                        <Button
                            type="primary"
                            icon={<UploadOutlined />}
                            disabled={attachments.length >= 6} // Vô hiệu hóa nút nếu số lượng tệp >= 6
                        >
                            Upload
                        </Button>
                    </Upload>
                </div>
            </Card>
            <Title level={4}>Posts</Title>

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

                        <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #ccc' }}></hr>
                        <List
                            dataSource={post.comments}
                            locale={{ emptyText: 'No comments yet.' }}
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
                                    <p style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        {comment.content}{' '}
                                        <div>
                                            <Button
                                                type="link"
                                                onClick={() =>
                                                    setReplyingTo(replyingTo === comment.id ? null : comment.id)
                                                }
                                            >
                                                Reply
                                            </Button>
                                            <Button
                                                type="text"
                                                icon={
                                                    post.liked ? (
                                                        <HeartFilled style={{ color: 'black' }} />
                                                    ) : (
                                                        <HeartOutlined />
                                                    )
                                                }
                                                onClick={() => toggleLike(post.liked)}
                                            />
                                        </div>
                                    </p>

                                    {replyingTo === comment.id && (
                                        <Input
                                            style={{ marginBottom: '10px' }}
                                            rows={2}
                                            placeholder="Reply to the comment..."
                                            onPressEnter={(e) => {
                                                if (e.target.value.trim()) {
                                                    handleAddComment(post.id, e.target.value.trim(), comment.id);
                                                    e.target.value = '';
                                                    setReplyingTo(null);
                                                }
                                            }}
                                        />
                                    )}
                                    {comment.replies.length > 0 && (
                                        <List
                                            dataSource={comment.replies}
                                            renderItem={(reply) => (
                                                <div
                                                    key={reply.id}
                                                    style={{
                                                        marginLeft: '20px',
                                                        borderLeft: '2px solid #ccc',
                                                        paddingLeft: '10px',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <span style={{ fontWeight: 'bold' }}>{reply.author}</span>
                                                        <span style={{ fontSize: '12px', color: 'gray' }}>
                                                            {reply.timestamp}
                                                        </span>
                                                    </div>
                                                    <p>{reply.content}</p>
                                                </div>
                                            )}
                                        />
                                    )}
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
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <Button type="text" icon={<ArrowUpOutlined />}></Button>
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
