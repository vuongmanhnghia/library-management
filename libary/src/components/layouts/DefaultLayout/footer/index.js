import React from 'react'
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/esm/Container';

const Footer = () => {
  return (
    <NavBar fixed="bottom" className="bg-body-tertiary">
        <Container fluid className='text-center'>
          <div className="text-center p-3">
            Copyright © 2024 : Chivas team
          </div>
        </Container>
    </NavBar>
  )
}

export default Footer