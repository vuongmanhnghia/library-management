/*
    Chức năng: thiết lập đường dẫn cho các pages
*/

import UploadBook from '../client/pages/upload';
import Contract from '../client/pages/contract';
import Convarsation from '../client/pages/conversation';
import Home from '../client/pages/home';
import Profile from '../client/pages/profile';
import Login from '../shared/pages/login';
import Register from '../shared/pages/register';
import Setting from '../client/pages/setting';
import MyBooks from '../client/pages/myBooks';
import ViewBook from '../client/pages/view';
import EditBook from '../client/pages/edit';

import AdminDashboard from '../admin/pages/dashboard';


import OnlyFooter from '../client/components/layouts/OnlyFooter';
import OnlySideBarAndFooter from '../client/components/layouts/OnlySideBarAndFooter';
// allow view, user can't login
const publicRoutes = [
    { path: '/login', component: Login, layout: OnlyFooter },
    { path: '/register', component: Register, layout: OnlyFooter },
];

// allow view , user can login
const privateRoutes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/profile', component: Profile, layout: OnlySideBarAndFooter },
    { path: '/upload-book', component: UploadBook, layout: OnlySideBarAndFooter },
    { path: '/conversation', component: Convarsation, layout: OnlySideBarAndFooter },
    { path: '/setting', component: Setting, layout: OnlySideBarAndFooter },
    { path: '/my-books', component: MyBooks, layout: OnlySideBarAndFooter},
    { path: '/contract', component: Contract, layout: OnlySideBarAndFooter },
    { path: '/view-book/:id', component:  ViewBook, layout: OnlySideBarAndFooter },
    { path: '/edit-book/:id', component: EditBook, layout: OnlySideBarAndFooter },
];

// allow view, admin can login
const adminRoutes = [
    { path: '/admin/dashboard', component: AdminDashboard, layout: OnlySideBarAndFooter },
    { path: '/admin/service/book_checker', component: Profile },
];

export { publicRoutes, privateRoutes, adminRoutes };
