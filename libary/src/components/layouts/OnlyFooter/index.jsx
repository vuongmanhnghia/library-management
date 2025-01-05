import React from "react";
import Footer from "../footer";
import { Layout } from "antd";

const {Footer: AntFooter } = Layout;

const OnlyFooter = ({ children }) => {
return (       
    <div>
        {children}
        <AntFooter style={{ textAlign: "center", background: "#fff", marginTop: "-100px", paddingTop: "-100px" }}>
            <Footer />
        </AntFooter>
    </div>
);
};
export default OnlyFooter;
