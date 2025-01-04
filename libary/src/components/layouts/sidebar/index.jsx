import React from "react";
import { Layout, Menu, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  BookOutlined,
  WechatOutlined,
  LineChartOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider
      width={200}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        background: "#fff",
        overflow: "auto",
      }}
    >
      {/* Menu chính */}
      <Menu
        style={{
          height: "100%",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
        }}
      >
        
        <Menu defaultSelectedKeys={["1"]} style={{ borderRight: "none"}} >
          <Menu.Item key="1">
            <HomeOutlined style={{ marginRight: "8px" }} />
            <Link to="/">Library</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <BookOutlined style={{ marginRight: "8px" }} />
            <Link to="/add-new-book">Add new book</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <WechatOutlined style={{ marginRight: "8px" }} />
            <Link to="/conversation">Conversation</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <LineChartOutlined style={{ marginRight: "8px" }} />
            <Link to="/dashboards">Dashboards</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <QuestionCircleOutlined style={{ marginRight: "8px" }} />
            <Link to="/support">Support</Link>
          </Menu.Item>
        </Menu>

        <Menu style={{ borderRight: "none", position: "absolute", bottom: "0", width: "100%"}}>
          {/* Divider */}
          <Divider style={{ margin: "12px 0" }} />
          <Menu.Item key="6">
            <Link to="/settings">Settings</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
