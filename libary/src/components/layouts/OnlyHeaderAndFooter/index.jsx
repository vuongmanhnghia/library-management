import Header from "../header";
import Footer from "../footer";
import Container from "react-bootstrap/esm/Container";

const OnlyHeaderAndFooter = ({ children }) => {
    return (
        <div>
        <Header />
        <Container fluid className="d-flex">
            <div className="content">{children}</div>
        </Container>
        <Footer />
        </div>
    );
};

export default OnlyHeaderAndFooter;
