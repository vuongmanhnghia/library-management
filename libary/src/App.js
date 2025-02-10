import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { notification } from 'antd';
import { privateRoutes, publicRoutes, adminRoutes } from './routes';
import DefaultLayout from './client/components/layouts/DefaultLayout';
import './shared/styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';
import {  useEffect } from 'react';

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAdmin = user?.role === 'admin';
    const isAuthenticated = Boolean(user);

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000;
            const currentTime = Date.now();
            if (expirationTime < currentTime) {
                dispatch(logout());
                navigate('/login'); 
                notification.error({
                    message: 'Token expired, please login again.',
                })
            }
        }
    };

    return (
        <Router>
            <TokenChecker checkTokenExpiration={checkTokenExpiration} />
            <div className="App">
                <Routes>
                    {/* Public routes */}
                    {renderRoutes(publicRoutes, isAuthenticated, isAdmin)}
                    {/* Private routes (requires authentication) */}
                    {renderRoutes(privateRoutes, isAuthenticated, isAdmin, true)}
                    {/* Admin routes (requires admin role) */}
                    {renderRoutes(adminRoutes, isAuthenticated, isAdmin, true, true)}
                </Routes>
            </div>
        </Router>
    );
}

const TokenChecker = ({ checkTokenExpiration }) => {
    const location = useLocation();

    useEffect(() => {
        checkTokenExpiration(); 
    }, [location]);

    return null;
};

const renderRoutes = (routes, isAuthenticated, isAdmin, isPrivate = false, isAdminRoute = false) => {
    return routes.map((route, index) => {
        let Layout = route.layout !== undefined ? route.layout : DefaultLayout;
        const Page = route.component;

        return (
            <Route
                key={index}
                path={route.path}
                element={
                    isAdminRoute ? (
                        isAdmin ? (
                            <Layout>
                                <Page />
                            </Layout>
                        ) : (
                            <Navigate to="/" replace />
                        )
                    ) : isPrivate ? (
                        isAuthenticated ? (
                            <Layout>
                                <Page />
                            </Layout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
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

export default App;
