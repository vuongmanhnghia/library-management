import React from "react";
import { Input, Divider, Typography, Select, Grid } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const { Search } = Input;
const { Text } = Typography;
const { useBreakpoint } = Grid;

function Header() {
  const userValue = useSelector((state) => state.user.user);
  const breakpoint = useBreakpoint();

  const onSearch = (value) => {
    console.log("Search:", value);
  };

  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const searchOrder = breakpoint.md ? 2 : 3;
  const userOrder = breakpoint.md ? 3 : 2;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "12px 16px",
        background: "#fff",
        borderBottom: "1px solid #ddd",
        gap: "8px", // Giảm khoảng cách giữa các phần tử
      }}
    >
      {/* Chọn loại tìm kiếm */}
      <Select
        size="large"
        defaultValue="name"
        style={{ width: 140, flexShrink: 0, order: 1 }}
        onChange={handleChange}
        options={[
          { value: "author", label: "Author" },
          { value: "name", label: "Name book" },
          { value: "genre", label: "Genre" },
        ]}
      />

      {/* Ô tìm kiếm */}
      <Search
        placeholder="Search for a book or author here"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{
          flex: "1 1 auto",
          maxWidth: "400px", // Giới hạn độ rộng max
          minWidth: "200px", // Đảm bảo không bị nhỏ quá trên mobile
          order: searchOrder,
        }}
      />

      <Divider type="vertical" style={{ display: "none" }} />

      {/* Hiển thị thông tin user */}
      <Link to="/profile" style={{ order: userOrder }}>
        <Text strong style={{ fontSize: "16px", whiteSpace: "nowrap" }}>
          Hi, {userValue?.full_name || "Guest"}
        </Text>
      </Link>
    </div>
  );
}

export default Header;
