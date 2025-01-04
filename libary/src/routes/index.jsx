import Home from "../pages/home";
import Profile from "../pages/profile";
import Login from "../pages/login";
import Register from "../pages/register";
import AddBook from "../pages/addBook";
import Convarsation from "../pages/conversation";
import Dashboard from "../pages/dashboard";

import OnlyHeaderAndFooter from "../components/layouts/OnlyHeaderAndFooter";
// allow view, user can't login
const publicRoutes = [
    {path : '/', component: Home },
    {path : '/home', component: Home},
    // {path : '*', component: Home},
    {path : '/profile', component: Profile, layout: OnlyHeaderAndFooter},
    {path : '/login', component: Login, layout: null},
    {path : '/register', component: Register, layout: null},
    {path : '/add-new-book', component: AddBook},
    {path : '/conversation', component: Convarsation},
    {path : '/dashboard', component: Dashboard},
]

// allow view , user can login
const privateRoutes = [
    // {path : '/upload-file', component: UploadFile},
]

export { publicRoutes, privateRoutes }