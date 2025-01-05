import React from 'react'
import Sidebar from "../sidebar";
import Footer from "../footer";
import { Layout } from "antd";

const { Sider, Content } = Layout;

const OnlySideBarAndFooter = ({children}) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sider
            width={200}
            style={{
            background: "#fff",
            position: "sticky",
            top: 0,
            height: "100vh",
            }}
        >
            <Sidebar />
        </Sider>

        {/* Content */}
        <Layout>
            {/* Main Content */}
            <Content
            style={{
                padding: "16px",
                background: "#fff",
            }}
            >
            {children}
            </Content>

            {/* Footer */}
            <Layout.Footer
            style={{
                textAlign: "center",
                background: "#fff",
                paddingTop: 16, 
            }}
            >
            <Footer />
            </Layout.Footer>
        </Layout>
        </Layout>
    )
}

export default OnlySideBarAndFooter