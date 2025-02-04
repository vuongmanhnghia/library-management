import React, { useEffect, useState } from 'react';
import { Card, List, Button, Input, Tag, Divider, Col, Row, Typography, message, Image } from 'antd';
import { ArrowUpOutlined, HeartFilled, HeartOutlined, ShareAltOutlined, EnterOutlined } from '@ant-design/icons';
import CommentService from '../../../shared/services/commentService';

const { Text } = Typography;

const Post = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [commentSuccess, setCommentSuccess] = useState(false);
    useEffect(() => {
        async function fetchComments() {
            try {
                const commentsResponse = await CommentService.getCommentsByPostId(post.id);
                const commentsData = commentsResponse.data?.data || [];
                setComments(commentsData);
            } catch (error) {
                console.log(error);
            }
        }

        fetchComments();
    }, [commentSuccess, post.id]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            try {
                setCommentSuccess(false);
                const result = CommentService.createComment(post.id, { "content": newComment });
                console.log("Comment created:", result);
                if (result.content !== null) {
                    setNewComment("");
                    setCommentSuccess(true);
                    message.success("Comment created successfully!");
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Card
            key={post.id}
            style={{ marginTop: '20px' }}
            title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginLeft: '10px' }}>{post.full_name}</span>
                    <span style={{ marginLeft: '10px' }}>
                        {post.role === 'admin' ? <Tag color="red">Admin</Tag> : <Tag color="green">User</Tag>}
                    </span>
                </div>
            }
            extra={<span>{new Date(post.created_at).toLocaleString()}</span>}
        >
            <div style={{ marginLeft: '16px' }}>
                {post.image === null ? (
                    <Text>{post.content}</Text>
                ) : (
                    <Row gutter={[16, 16]} style={{ gap: '16px', display: 'flex', justifyContent: 'space-between' }}>
                        <Col span={12}><Text>{post.content}</Text></Col>
                        <hr style={{ border: '0.25px solid #ccc' }} />
                        <Col span={8}>
                            <Image
                                width={200}
                                src={post.image}
                                alt="Image"
                            />
                        </Col>
                    </Row>
                )}
            </div>
            <Divider />
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '5px' }}>
                <Input
                    value={newComment}
                    onChange={handleCommentChange}
                    onPressEnter={handleCommentSubmit}
                    placeholder="Write a comment..."
                />
                <Button type="text" icon={<ArrowUpOutlined />} onClick={handleCommentSubmit} />
                <Button
                    type="text"
                    icon={post.liked ? <HeartFilled style={{ color: 'black' }} /> : <HeartOutlined />}
                />
                <Button type="text" icon={<ShareAltOutlined />} />
            </div>
            <Divider />
            <List
                dataSource={comments}
                locale={{ emptyText: 'No comments yet.' }}
                renderItem={(comment) => (
                    <div key={comment.id} style={{ marginLeft: '20px', marginTop: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>
                                {comment.full_name} <span>{comment.role === 'admin' ? <Tag color="red">Admin</Tag> : <Tag color="green">User</Tag>}</span>
                            </span>

                            <span style={{ fontSize: '12px', color: 'gray' }}>{new Date(comment.created_at).toLocaleString()}</span>
                        </div>
                        <div style={{ marginLeft: '20px' }}>
                            <EnterOutlined style={{ transform: 'scaleX(-1)' }} />
                            <span> {comment.content}</span>
                        </div>

                    </div>
                )}
            />
        </Card>
    );
};

export default Post;
