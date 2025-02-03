import React from 'react';
import { Card, List, Avatar, Button, Input, Tag, Divider } from 'antd';
import { ArrowUpOutlined, HeartFilled, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import CommentSection from '../Comments';

const Post = ({ posts, toggleLike, handleAddComment }) => {
    return (
        <List
            itemLayout="vertical"
            dataSource={posts}
            renderItem={(post) => (
                <Card
                    key={post.id}
                    style={{ marginTop: '20px' }}
                    title={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ marginLeft: '10px' }}>{post.full_name}</span> 
                            <span style={{ marginLeft: '10px' }}>{post.role === 'admin' ? <Tag color="red">Admin</Tag> : <Tag color="green">User</Tag>}</span>
                        </div>
                    }
                    extra={
                        <span>{new Date(post.created_at).toLocaleString()}</span>
                    }
                >
                    <p>{post.content}</p>
                    <Divider />
                    <CommentSection post={post} handleAddComment={handleAddComment} />
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                        <Input
                            placeholder="Viết bình luận..."
                            onPressEnter={(e) => {
                                if (e.target.value.trim()) {
                                    handleAddComment(post.id, e.target.value.trim());
                                    e.target.value = '';
                                }
                            }}
                        />
                        <Button type="text" icon={<ArrowUpOutlined />} />
                        <Button
                            type="text"
                            icon={post.liked ? <HeartFilled style={{ color: 'black' }} /> : <HeartOutlined />}
                            onClick={() => toggleLike(post.id)}
                        />
                        <Button type="text" icon={<ShareAltOutlined />} />
                    </div>
                </Card>
            )}
        />
    );
};

export default Post;
