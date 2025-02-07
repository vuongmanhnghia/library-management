import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Skeleton, Pagination, Row, Col, Upload, Space, Empty, message } from 'antd';
import { ArrowUpOutlined, UploadOutlined } from '@ant-design/icons';
import Post from '../../components/Post';
import PostService from '../../../shared/services/postService';
import { getBase64, truncateText } from '../../../shared/utils';

const { Title } = Typography;

const Conversation = () => {
    const [image, setImage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const perPage = 5;

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const postsResponse = await PostService.getPosts(currentPage, perPage);
            if (postsResponse.success) {
                setPosts(postsResponse.data.posts);
            }
        };
        fetchData().finally(() => setLoading(false));
    }, [currentPage]);

    const handleAddPost = async () => {
        if (newPost.trim()) {
            const newPostData = {
                content: newPost,
                ...(image !== null && { image: image })
            };
            try {
                const response = await PostService.createPost(newPostData);
                if (response.success) {
                    setPosts([newPostData, ...posts]);
                    setNewPost('');
                } else {
                    console.error('Failed to create post');
                }
            } catch (error) {
                console.error('Error creating post:', error);
            }
        }
    };

    return (
        <Row justify="center">
            <Col xs={24} sm={20} md={16} lg={16} xl={16}>
                <Title level={2} style={{ textAlign: 'center' }}>Conversation</Title>
                <Card>
                    <Title level={3}>Share your post</Title>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Input
                            size="large"
                            placeholder="Share your thoughts about the book..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            onPressEnter={handleAddPost}
                        />
                        <Button type="primary" icon={<ArrowUpOutlined />} onClick={handleAddPost} size='large'>
                            Post
                        </Button>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <Upload
                                action=""
                                listType="picture"
                                maxCount={1}
                                beforeUpload={(file) => {
                                    const isImage = file.type.startsWith('image/');
                                    const isSmallEnough = file.size / 1024 / 1024 < 1.5;
                                    if (!isImage) {
                                        message.error(`${truncateText(file.name, 10)} is not an image file`);
                                        return Upload.LIST_IGNORE;
                                    }
                                    if (!isSmallEnough) {
                                        message.error(`${truncateText(file.name, 10)} is larger than 1.5MB`);
                                        return Upload.LIST_IGNORE;
                                    }
                                    getBase64(file).then((base64String) => setImage(base64String));
                                    return false;
                                }}
                            >
                                <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Space>
                    </div>
                </Card>
                <Title level={4}>Posts</Title>
                {loading ? (
                    <Skeleton active />
                ) : (
                    posts.length === 0 ? (
                        <Empty description="No posts found" />
                    ) : (
                        posts.map((post) => (
                            <Post key={post.id} post={post} />
                        ))
                    )
                )}
                <Row justify="center" style={{ marginTop: '24px' }}>
                    <Pagination
                        current={currentPage}
                        total={totalPosts}
                        pageSize={perPage}
                        onChange={(page) => setCurrentPage(page)}
                        showSizeChanger={false}
                    />
                </Row>
            </Col>
        </Row>
    );
};

export default Conversation;
