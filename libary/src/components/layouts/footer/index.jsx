import React from 'react'
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/esm/Container';

const Footer = () => {
  return (
    <NavBar className="bg-body-tertiary">
        <Container fluid className='text-center'>
          <div className="text-center p-3">
            Copyright © 2024 : Team Chivas Probation GDGOC PTIT 
          </div>
        </Container>
    </NavBar>
  )
}

export default Footer