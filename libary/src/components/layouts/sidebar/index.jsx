import React from "react";
import { Container, Col, Row, NavLink } from "react-bootstrap";

const Sidebar = () => {
  return (
    <Container className="d-flex flex-column vh-100 p-3">
      {/* Phần đầu sidebar */}
      <Row className="flex-shrink-0">
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/">Library</NavLink>
        </Col>
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/add-new-book">Add new book</NavLink>
        </Col>
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/conversation">Conversation</NavLink>
        </Col>
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/dashboards">Dashboards</NavLink>
        </Col>
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/support">Support</NavLink>
        </Col>
      </Row>

      {/* Khoảng trống giữa */}
      <div className="flex-grow-1"></div>

      {/* Phần cuối sidebar */}
      <Row className="flex-shrink-0">
        <hr className="w-100 my-2" />
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/settings">Settings</NavLink>
        </Col>
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/profile">Profile</NavLink>
        </Col>
        <Col md={12} className="fw-bold py-2">
          <NavLink href="/logout">Logout</NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
