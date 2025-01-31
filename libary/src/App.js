import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes, adminRoutes } from './routes';
import DefaultLayout from './client/components/layouts/DefaultLayout';
import './shared/styles/GlobalStyle';
import { useSelector } from 'react-redux';

function App() {
    const user = useSelector((state) => state.user.user);
    const isAdmin = user?.role === "admin";
    const isAuthenticated = Boolean(user);

    const renderRoutes = (routes, isPrivate = false, isAdminRoute = false) => {
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
                                <Layout><Page /></Layout>
                            ) : (
                                <Navigate to="/" replace />
                            )
                        ) : isPrivate ? (
                            isAuthenticated ? (
                                <Layout><Page /></Layout>
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        ) : (
                            <Layout><Page /></Layout>
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
                    {/* Public routes */}
                    {renderRoutes(publicRoutes)}
                    {/* Private routes (requires authentication) */}
                    {renderRoutes(privateRoutes, true)}
                    {/* Admin routes (requires admin role) */}
                    {renderRoutes(adminRoutes, true, true)}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
