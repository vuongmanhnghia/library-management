import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
    return (
        <Container fluid>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col className='col-md-3 p-5 rounded-5 shadow'>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className='w-100'>
                            Submit
                        </Button>
                        <hr />
                        <Button variant="success" className='w-100' href="/register">
                            Register
                        </Button>
                        <p className='text-center text-muted mt-4'>
                            <a href="/forgot-password">Forgot Password?</a>
                        </p>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login