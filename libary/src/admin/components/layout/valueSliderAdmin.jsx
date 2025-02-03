import {
    RadarChartOutlined,
    CloudServerOutlined,
    UsergroupAddOutlined,
    BookOutlined,
    SearchOutlined,
    FileProtectOutlined,
    SettingOutlined,
    UserOutlined,
    CheckSquareOutlined,
    UploadOutlined,
    CommentOutlined
} from '@ant-design/icons';


const getItem = (label, key, icon, children = [], onClick = () => { }) => ({
    key,
    icon,
    label,
    children: children.length ? children : undefined,
    onClick,
});

export const itemsSibar = (dispatch, navigate) => [
    getItem('Dashboard', '1', <RadarChartOutlined />, [], () => navigate('/admin/dashboard')),
    getItem('Book service', 'sub1', <CloudServerOutlined />, [
        getItem('All books', '2', <BookOutlined />, [], () => navigate('/admin/book_service/all_books')),
        getItem('Upload book', '3', <UploadOutlined />, [], () => navigate('/admin/book_service/upload-book')),
        getItem('Approve book', '4', <CheckSquareOutlined />, [], () => navigate('/admin/book_service/book_checker')),
    ]),
    getItem('User service', 'sub2', <UsergroupAddOutlined />, [
        getItem('All users', '5', <FileProtectOutlined />, [], () => navigate('/admin/user_service/all_users')),
        getItem('Find user', '6', <SearchOutlined />, [], () => navigate('/admin/user_service/find')),
    ]),
    getItem('Conversation', '7', <CommentOutlined />, [], () => navigate('/admin/conversation')),
    getItem('Setting', '8', <SettingOutlined />, [], () => navigate('/admin/settings')),
    getItem('Profile', '9', <UserOutlined />, [], () => navigate('/admin/profile')),

];
