import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import DefaultLayout from './components/layouts/DefaultLayout/';
import { Fragment } from 'react';
import './styles/GlobalStyle/global.scss';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.user.user); // Lấy thông tin user từ Redux store

    // Hàm để render các routes
    const renderRoutes = (routes, isPrivate = false) => {
        return routes.map((route, index) => {
            let Layout = DefaultLayout;
            if (route.layout) {
                Layout = route.layout;
            } else if (route.layout === null) {
                Layout = Fragment;
            }

            const Page = route.component;

            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        isPrivate && !user ? ( // Nếu là private và chưa đăng nhập thì điều hướng về login
                            <Navigate to="/login" replace />
                        ) : (
                            <Layout>
                                <Page />
                            </Layout>
                        )
                    }
                />
            );
        });
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Render public routes */}
                    {renderRoutes(publicRoutes)}
                    {/* Render private routes */}
                    {renderRoutes(privateRoutes, true)}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
