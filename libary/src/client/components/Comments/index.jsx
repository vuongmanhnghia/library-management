import React from 'react';
import { List, Button } from 'antd';

const CommentSection = ({ post, handleAddComment }) => {
    return (
        <List
            dataSource={post.comments}
            locale={{ emptyText: 'Chưa có bình luận.' }}
            renderItem={(comment) => (
                <div key={comment.id} style={{ marginLeft: '20px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: 'bold' }}>{comment.full_name}</span>
                        <span style={{ fontSize: '12px', color: 'gray' }}>{new Date(comment.created_at).toLocaleString()}</span>
                    </div>
                    <p>{comment.content}</p>
                </div>
            )}
        />
    );
};


export default CommentSection;