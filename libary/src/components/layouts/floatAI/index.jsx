import React, { useState } from 'react';
import { FloatButton, Tooltip, Popover, List, Input, Button } from 'antd';
import { OpenAIOutlined } from '@ant-design/icons';

const FloatAI = () => {
    const [isPopoverVisible, setPopoverVisible] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'AI', text: 'Hello! How can I help you today?' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { sender: 'User', text: newMessage }]);
            // Simulate AI response
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    { sender: 'AI', text: `You said: ${newMessage}` },
                ]);
            }, 1000);
            setNewMessage('');
        }
    };

    const content = (
        <div
            style={{
                maxHeight: '400px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
            }}
        >
            <List
                style={{ flex: 1, padding: '10px 0' }}
                dataSource={messages}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            border: 'none',
                            justifyContent: item.sender === 'User' ? 'flex-end' : 'flex-start',
                            display: 'flex',
                            padding: '0 10px',
                        }}
                    >
                        <div
                            style={{
                                background: item.sender === 'User' ? '#4f76ff' : '#f0f0f0',
                                color: item.sender === 'User' ? 'white' : 'black',
                                padding: '8px 12px',
                                borderRadius: '15px',
                                maxWidth: '80%',
                                wordWrap: 'break-word',
                            }}
                        >
                            {item.text}
                        </div>
                    </List.Item>
                )}
            />
            <div style={{ display: 'flex', gap: '10px', padding: '10px 0' }}>
                <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onPressEnter={handleSendMessage}
                />
                <Button type="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <Popover
                content={content}
                title="Chat with AI"
                trigger="click"
                visible={isPopoverVisible}
                onVisibleChange={(visible) => setPopoverVisible(visible)}
                placement="topRight"
            >
                <Tooltip title="Ask AI" placement="left">
                    <FloatButton
                        shape="circle"
                        type="primary"
                        style={{
                            insetInlineEnd: 30,
                            bottom: 30,
                            border: 'none',
                        }}
                        icon={<OpenAIOutlined />}
                    />
                </Tooltip>
            </Popover>
        </div>
    );
};

export default FloatAI;
