import Home from "../pages/home";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Register from "../pages/register";
import AddBook from "../pages/addBook";
import Convarsation from "../pages/conversation";
import Dashboard from "../pages/dashboard";
import Setting from "../pages/setting";

import OnlyHeaderAndFooter from "../components/layouts/OnlyHeaderAndFooter";
import OnlyFooter from "../components/layouts/OnlyFooter";
// allow view, user can't login
const publicRoutes = [
    {path : '/', component: Home },
    {path : '/home', component: Home},
    // {path : '*', component: Home},
    {path : '/profile', component: Profile, layout: OnlyHeaderAndFooter},
    {path : '/login', component: Login, layout: OnlyFooter},
    {path : '/register', component: Register, layout: OnlyFooter},
    {path : '/add-new-book', component: AddBook},
    {path : '/conversation', component: Convarsation},
    {path : '/dashboard', component: Dashboard},
    {path : '/setting', component: Setting, layout: OnlyHeaderAndFooter},
]

// allow view , user can login
const privateRoutes = [
    // {path : '/upload-file', component: UploadFile},
]

export { publicRoutes, privateRoutes }