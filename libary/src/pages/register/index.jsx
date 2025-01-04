import React from "react";
import { Form, Input, Button, Row, Col, Card } from "antd";

const Register = () => {
const onFinish = (values) => {
    console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

return (
    <Row
    style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}
    >
    <Col xs={24} sm={16} md={12} lg={7}>
        <Card
        className="shadow"
        style={{ borderRadius: "16px", padding: "0 24px", backgroundColor: "#fafafa" }}
        >
        <Form
            name="register"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* Name Field */}
            <Form.Item
            label="Name"
            name="name"
            rules={[
                { required: true, message: "Please input your name!" },
                { min: 2, message: "Name must be at least 2 characters long!" },
            ]}
            >
            <Input placeholder="Enter name" />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
            label="Email address"
            name="email"
            rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
            ]}
            >
            <Input placeholder="Enter email" />
            </Form.Item>

            {/* Phone Number Field */}
            <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
                { required: true, message: "Please input your phone number!" },
                {
                pattern: /^\d{10,15}$/,
                message: "Phone number must be 10-15 digits!",
                },
            ]}
            >
            <Input placeholder="Enter phone number" />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
            label="Password"
            name="password"
            rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            >
            <Input.Password placeholder="Password" />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
            <Button type="primary" htmlType="submit" block>
                Submit
            </Button>
            </Form.Item>

            <hr />

            {/* Login Button */}
            <Form.Item>
            <Button
                type="default"
                block
                href="/login"
                style={{ backgroundColor: "#52c41a", color: "white" }}
            >
                Login
            </Button>
            </Form.Item>
        </Form>
        </Card>
    </Col>
    </Row>
);
};

export default Register;
