import Header from "../header";
import Footer from "../footer";
import Sidebar from "../sidebar";
import {Container, Row, Col} from "react-bootstrap";

const DefaultLayout = ({ children }) => {
    return (
        <Row style={{ "--bs-gutter-x": "0" }}>
            <Col md={2} className="p-0">
                <div
                className="flex-shrink-0 ps-3 pe-3 bg-body-tertiary"
                style={{minHeight: `100vh` }}
                >
                <Sidebar />
                </div>
            </Col>
            <Col>
                <Header />
                <Container fluid className="d-flex" style={{ "--bs-gutter-x": "0" }}>
                    <div className="content">{children}</div>
                </Container>
                <Footer />
            </Col>
        </Row>
    );
};

export default DefaultLayout;
