import React from 'react';
import { Alert, Flex, Spin } from 'antd';
const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
};
const content = <div style={contentStyle} />;
const Loading = () => (
    <Flex gap="middle" vertical>
        <Flex gap="middle">
            <Spin tip="Loading" size="large">
                {content}
            </Spin>
        </Flex>
        <Spin tip="Loading...">
            <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
            />
        </Spin>
    </Flex>
);
export default Loading;
