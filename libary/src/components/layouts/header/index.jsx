import React from "react";
import {Button, Form, NavLink, Stack} from "react-bootstrap";

function Header() {
  return (
    <Stack direction="horizontal" gap={3} className="p-4" fixed="top">
      <Form.Control className="me-auto" placeholder="Search for a book or author here" />
      <Button variant="primary">Search</Button>
      <div className="vr" />
      <NavLink href="/profile" ><p className="fw-bold mb-0" style={{whiteSpace: "nowrap"}} variant="primary">Hi, Chivas</p></NavLink>
      
    </Stack>
    
  );
}

export default Header;
