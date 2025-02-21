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

import OnlyFooter from '../client/components/layouts/OnlyFooter';
import OnlySideBarAndFooter from '../client/components/layouts/OnlySideBarAndFooter';

import AdminDashboard from '../admin/pages/dashboard';
import BookChecker from '../admin/pages/bookCheck';
import AllBooks from '../admin/pages/allBooks';
import FindUser from '../admin/pages/findUser';
// import AdminSettings from '../admin/pages/setting';
import AllUsers from '../admin/pages/allUsers';

import DefaultLayoutAdmin from '../admin/components/layout/DeafultLayoutAdmin';
const publicRoutes = [
    { path: '/login', component: Login, layout: OnlyFooter },
    { path: '/register', component: Register, layout: OnlyFooter },
];

const privateRoutes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/profile', component: Profile, layout: OnlySideBarAndFooter },
    { path: '/upload-book', component: UploadBook, layout: OnlySideBarAndFooter },
    { path: '/conversation', component: Convarsation, layout: OnlySideBarAndFooter },
    { path: '/settings', component: Setting, layout: OnlySideBarAndFooter },
    { path: '/my-books', component: MyBooks, layout: OnlySideBarAndFooter},
    { path: '/contract', component: Contract, layout: OnlySideBarAndFooter },
    { path: '/view-book/:id', component:  ViewBook, layout: OnlySideBarAndFooter },
    { path: '/edit-book/:id', component: EditBook, layout: OnlySideBarAndFooter },
];

// allow view, admin can login
const adminRoutes = [
    { path: '/admin/', component: AdminDashboard, layout: DefaultLayoutAdmin },
    { path: '/admin/dashboard', component: AdminDashboard, layout: DefaultLayoutAdmin },
    { path: '/admin/book_service/book_checker', component: BookChecker, layout: DefaultLayoutAdmin },
    { path: '/admin/book_service/upload-book', component: UploadBook, layout: DefaultLayoutAdmin },
    { path: '/admin/book_service/all_books', component: AllBooks, layout: DefaultLayoutAdmin },
    { path: '/admin/view_book/:id', component: ViewBook, layout: DefaultLayoutAdmin },
    { path: '/admin/view_user/:id', component: Profile, layout: DefaultLayoutAdmin },
    { path: '/admin/user_service/all_users', component: AllUsers, layout: DefaultLayoutAdmin },
    { path: '/admin/user_service/find', component: FindUser, layout: DefaultLayoutAdmin },
    { path: '/admin/conversation', component: Convarsation, layout: DefaultLayoutAdmin },
    { path: '/admin/settings', component: Setting, layout: DefaultLayoutAdmin },
    { path: '/admin/profile', component: Profile, layout: DefaultLayoutAdmin },
];

export { publicRoutes, privateRoutes, adminRoutes };
