import React from 'react';
import { Card, List, Button, Input, Tag, Divider, Col, Row, Typography } from 'antd';
import { ArrowUpOutlined, HeartFilled, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import CommentSection from '../Comments';

const { Text } = Typography;


const Post = ({ posts, toggleLike, handleAddComment }) => {
    console.log(posts);
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
                    <div>
                        {post.image !== null ? (
                            <Text >{post.content}</Text>
                        ) : (
                            <Row gutter={[16, 16]} style={{ gap: '16px' }}>
                                <Col span={12}><Text >{post.content}</Text></Col>
                                <Col span={10}><img src={post.image} alt="Image" style={{ width: '100px', height: 'auto' }} /></Col>
                            </Row>
                        )}

                    </div>
                    <Divider />
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
                    <CommentSection post={post} handleAddComment={handleAddComment} />
                </Card>
            )}
        />
    );
};

export default Post;
