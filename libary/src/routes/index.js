import Home from "../pages/home";
import Profile from "../pages/profile";
// allow view, user can't login
const publicRoutes = [
    {path : '/', component: Home },
    {path : '/home', component: Home},
    {path : '/profile', component: Profile, layout : null},
]

// allow view , user can login
const privateRoutes = [
    // {path : '/upload-file', component: UploadFile},
]

export { publicRoutes, privateRoutes }