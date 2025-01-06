import Home from '../pages/home';
import Profile from '../pages/profile';
import Login from '../pages/login';
import Register from '../pages/register';
import AddBook from '../pages/addBook';
import Convarsation from '../pages/conversation';
import Dashboard from '../pages/dashboard';
import Setting from '../pages/setting';

import OnlyFooter from '../components/layouts/OnlyFooter';
import OnlySideBarAndFooter from '../components/layouts/OnlySideBarAndFooter';
// allow view, user can't login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    // {path : '*', component: Home},
    { path: '/profile', component: Profile, layout: OnlySideBarAndFooter },
    { path: '/login', component: Login, layout: OnlyFooter },
    { path: '/register', component: Register, layout: OnlyFooter },
    { path: '/add-new-book', component: AddBook, layout: OnlySideBarAndFooter },
    { path: '/conversation', component: Convarsation, layout: OnlySideBarAndFooter },
    { path: '/dashboard', component: Dashboard },
    { path: '/setting', component: Setting, layout: OnlySideBarAndFooter },
];

// allow view , user can login
const privateRoutes = [
    // {path : '/upload-file', component: UploadFile},
];

export { publicRoutes, privateRoutes };
