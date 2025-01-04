import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center", padding: "0", fontWeight: "bold", opacity: "0.3", lineHeight: "24px" }}>
      Copyright © 2024 : Team Chivas Probation <br/>
      Google Developer Group - GDG on Campus: PTIT
    </AntFooter>
  );
};

export default Footer;
