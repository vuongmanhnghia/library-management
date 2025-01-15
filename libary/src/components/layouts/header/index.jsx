import React from "react";
import { Input, Divider, Typography, Space, Select } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Text } = Typography;

function Header() {
  const user = useSelector((state) => state.user);
  const onSearch = (value) => {
    console.log("Search:", value);
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        margin: "16px",
        background: "#fff",
      }}
    >
      <Space wrap>
        <Select
        size="large"
          defaultValue="name"
          style={{ width: 150, marginRight: "16px" }}
          onChange={handleChange}
          options={[
            { value: "author", label: "Author" },
            { value: "name", label: "Name book" },
            { value: "genre", label: "Genre" },
          ]}
        />
      </Space>
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
        <Text strong style={{ fontSize: "18px" }}>
          Hi, {user.name}
        </Text>
      </Link>
    </div>
  );
}

export default Header;
