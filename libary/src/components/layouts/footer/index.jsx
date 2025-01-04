import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: "center", padding: "16px" }}>
      Copyright © 2024 : Team Chivas Probation GDGOC PTIT
    </AntFooter>
  );
};

export default Footer;
