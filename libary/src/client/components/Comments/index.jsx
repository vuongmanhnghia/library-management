import React from 'react';
import { List, Button } from 'antd';

const CommentSection = ({ post, handleAddComment }) => {
    return (
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
                    <p>{comment.content}</p>
                </div>
            )}
        />
    );
};

export default CommentSection;