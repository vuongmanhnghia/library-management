import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Skeleton, Pagination, Row } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Post from '../../components/Post';
import PostService from '../../../shared/services/postService';

const { Title } = Typography;

const Conversation = () => {
    const userValue = useSelector((state) => state.user.user);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const perPage = 5;

    const fetchPosts = async () => {
        try {
            const response = await PostService.getPosts(currentPage, perPage);
            if (response.success) {
                setPosts(response.data.posts);
                setTotalPosts(response.data.total_posts);
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchPosts();
    }, [currentPage]);

    const handleAddPost = async () => {
        if (newPost.trim()) {
            const newPostData = {
                title: userValue.full_name,
                content: newPost,
                image: ',',
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

    const handleAddComment = (postId, comment) => {
        // const timestamp = new Date().toLocaleString();
        // setPosts(
        //     posts.map((post) =>
        //         post.id === postId
        //             ? {
        //                 ...post,
        //                 comments: [
        //                     ...post.comments,
        //                     { id: uuidv4(), content: comment, author: userValue.full_name, timestamp },
        //                 ],
        //             }
        //             : post
        //     )
        // );
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Conversation</Title>

            <Card>
                <Title level={4}>Share your post</Title>
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
            </Card>
            <Title level={4}>Posts</Title>
            {loading ? <Skeleton active /> : (<Post posts={posts} toggleLike={() => { }} handleAddComment={handleAddComment} />)}
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
