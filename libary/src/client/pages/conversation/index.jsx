import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Skeleton, Pagination, Row, Upload, Space } from 'antd';
import { ArrowUpOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Post from '../../components/Post';
import PostService from '../../../shared/services/postService';
import { getBase64 } from '../../../shared/utils';

const { Title } = Typography;

const Conversation = () => {
    const userValue = useSelector((state) => state.user.user);
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
                title: userValue.full_name,
                content: newPost,
                image: image,
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
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Conversation</Title>
            <Card>
                <Title level={3}>Share your post</Title>
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
                    <Space
                        direction="vertical"
                        style={{
                            width: '60%',
                        }}
                        size="large"
                    >
                        <Upload
                            action=""
                            listType="picture"
                            maxCount={1}
                            beforeUpload={(file) => {
                                getBase64(file).then((base64) => setImage(base64));
                                return false;
                            }}
                        >
                            <Button type="primary" icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Space>
                </div>
            </Card>
            <Title level={4}>Posts</Title>
            {loading ? <Skeleton active /> : (
                posts.map((post) => (
                    <Post
                        post={post}
                    />
                ))
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
        </div>
    );
};

export default Conversation;
