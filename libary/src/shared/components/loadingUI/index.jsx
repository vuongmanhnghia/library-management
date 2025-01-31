import React from 'react';
import { Flex, Spin } from 'antd';
const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;
const Loading = () => (
    <Flex gap="middle" vertical style={{marginTop: 25}}>
        <Flex gap="middle">
            <Spin tip="Loading" size="large">
                {content}
            </Spin>
        </Flex>
    </Flex>
);
export default Loading;
