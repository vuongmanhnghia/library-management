import {
    RadarChartOutlined,
    CloudServerOutlined,
    UsergroupAddOutlined,
    BookOutlined,
    SearchOutlined,
    SettingOutlined,
    UserOutlined,
    CheckSquareOutlined,
    UploadOutlined,
} from '@ant-design/icons';


const getItem = (label, key, icon, children = [], onClick = () => {}) => ({
    key,
    icon,
    label,
    children: children.length ? children : undefined,
    onClick,
});

export const itemsSibar = (dispatch, navigate) => [
    getItem('Dashboard', '1', <RadarChartOutlined />, [], () => navigate('/admin/dashboard')),
    getItem('All books', '2',<BookOutlined />, [], () => navigate('/admin/book_service/all_books')),
    getItem('Book service', 'sub1', <CloudServerOutlined />, [
        getItem('Upload book', '2', <UploadOutlined />, [], () => navigate('/admin/book_service/upload-book')),
        getItem('Approve book', '3', <CheckSquareOutlined />, [], () => navigate('/admin/book_service/book_checker')),
    ]),
    getItem('User service', 'sub2', <UsergroupAddOutlined />, [
        getItem('Find user', '4', <SearchOutlined />, [], () => navigate('/admin/user_service/find')),
    ]),
    getItem('Setting', '6', <SettingOutlined />, [], () => navigate('/admin/settings')),
    getItem('Profile', '7', <UserOutlined />, [], () => navigate('/admin/profile')),
    
];
