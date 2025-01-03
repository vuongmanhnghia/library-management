import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";

const DefaultLayout = ({children}) => {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DefaultLayout