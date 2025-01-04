import React from "react";
import { Input, Divider, Typography } from "antd";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Text } = Typography;

function Header() {
  const onSearch = (value) => {
    
  };

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "16px", background: "#fff" }}>
      <Search
        placeholder="Search for a book or author here"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ flex: 1, marginRight: "16px" }}
      />
      <Divider type="vertical" />
      <Link to="/profile" style={{ whiteSpace: "nowrap", marginLeft: "16px" }}>
        <Text strong style={{ fontSize: "16px" }}>
          Hi, Chivas
        </Text>
      </Link>
    </div>
  );
}

export default Header;
