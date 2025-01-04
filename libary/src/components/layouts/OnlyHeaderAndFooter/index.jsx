import React from "react";
import Header from "../header";
import Footer from "../footer";
import { Layout } from "antd";

const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

const OnlyHeaderAndFooter = ({ children }) => {
return (
    <Layout style={{ minHeight: "100vh" }}>
    {/* Header */}
    <AntHeader style={{ background: "#fff", padding: "0 16px" }}>
        <Header />
    </AntHeader>

    {/* Main Content */}
    <Content
        style={{
        margin: "16px",
        padding: "16px",
        background: "#fff",
        }}
    >
        {children}
    </Content>

    {/* Footer */}
    <AntFooter style={{ textAlign: "center", background: "#fff" }}>
        <Footer />
    </AntFooter>
    </Layout>
);
};

export default OnlyHeaderAndFooter;
