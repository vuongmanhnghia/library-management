import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { notification } from 'antd';
import { privateRoutes, publicRoutes, adminRoutes } from './routes';
import DefaultLayout from './client/components/layouts/DefaultLayout';
import './shared/styles/GlobalStyle';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './redux/userSlice';
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isAdmin = user?.role === 'admin';
    const isAuthenticated = Boolean(user);

    return (
        <Router>
            <TokenChecker dispatch={dispatch} />
            <div className="App">
                <Routes>
                    {/* Public routes */}
                    {renderRoutes(publicRoutes, isAuthenticated, isAdmin)}
                    {/* Private routes */}
                    {renderRoutes(privateRoutes, isAuthenticated, isAdmin, true)}
                    {/* Admin routes */}
                    {renderRoutes(adminRoutes, isAuthenticated, isAdmin, true, true)}
                </Routes>
            </div>
        </Router>
    );
}


const TokenChecker = ({ dispatch }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (checkTokenExpiration()) {
            dispatch(logout());
            notification.error({
                message: 'Token expired, please login again.',
            });
            navigate('/login'); 
        }
    }, [location, dispatch, navigate]);

    return null;
};


const checkTokenExpiration = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        try {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000;
            return expirationTime < Date.now(); 
        } catch (error) {
            return true; 
        }
    }
    return false;
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
