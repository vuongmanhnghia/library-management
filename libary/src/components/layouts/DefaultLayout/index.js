import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

import Container from "react-bootstrap/esm/Container";

const DefaultLayout = ({ children }) => {
    return (
        <div>
        <Header />
        <Container fluid className="d-flex" style={{ '--bs-gutter-x': '0' }}>
            <div className="flex-shrink-0 p-3 bg-body-tertiary" style={{ width: '250px', minHeight: `100vh` }}>
                <Sidebar />
            </div>
            <div className="content">{children}</div>
        </Container>
        <Footer />
        </div>
    );
};

export default DefaultLayout;
