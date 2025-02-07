import React from 'react';
import { List, Tag } from 'antd';
import { EnterOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const Feedbacks = ({ comments }) => {
    return (
        <List
            dataSource={comments}
            locale={{ emptyText: 'No comments yet.' }}
            renderItem={(comment) => (
                <div key={comment.id} style={{ marginLeft: '20px', marginTop: '20px' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '8px',
                        }}
                    >
                        <span style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ fontWeight: 'bold' }}>{comment.full_name}</span>
                            <span>{comment.role === 'admin' ? <Tag color="red">Admin</Tag> : <Tag color="green">User</Tag>}</span>
                        </span>
                        <span style={{ fontSize: '12px', color: 'gray' }}>{dayjs(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <EnterOutlined style={{ transform: 'scaleX(-1)' }} />
                        <span> {comment.content}</span>
                    </div>
                </div>
            )}
        />

    );
};

export default Feedbacks;