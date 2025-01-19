import UploadBook from '../pages/upload';
import Contract from '../pages/contract';
import Convarsation from '../pages/conversation';
import Home from '../pages/home';
import Profile from '../pages/profile';
import Login from '../pages/login';
import Register from '../pages/register';
import Setting from '../pages/setting';
import MyBooks from '../pages/myBooks';
import ViewBook from '../pages/view';
import EditBook from '../pages/edit';


import OnlyFooter from '../components/layouts/OnlyFooter';
import OnlySideBarAndFooter from '../components/layouts/OnlySideBarAndFooter';
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
    { path: '/view-book/:id', component:  ViewBook, layout: OnlySideBarAndFooter }, // Sửa đường dẫn này
    { path: '/edit-book/:id', component: EditBook, layout: OnlySideBarAndFooter },
];

export { publicRoutes, privateRoutes };
