import {
    FileOutlined,
    UserOutlined,
    HomeOutlined,
    UploadOutlined,
    BookOutlined,
    CommentOutlined,
    SettingOutlined,
    PhoneOutlined
} from '@ant-design/icons';

const getItem = (label, key, icon, children = [], onClick = () => {}) => ({
    key,
    icon,
    label,
    children: children.length ? children : undefined,
    onClick,
});

export const itemsSibar = (dispatch, navigate) => [
    getItem('Library', '1', <HomeOutlined />, [], () => navigate('/')),
    getItem('Book service', 'sub1', <FileOutlined />, [
        getItem('Upload book', '2', <UploadOutlined />, [], () => navigate('/upload-book')),
        getItem('My books', '3', <BookOutlined />, [], () => navigate('/my-books')),
    ]),
    getItem('Conversation', '4', <CommentOutlined />, [], () => navigate('/conversation')),
    getItem('Contract', 'sub5', <PhoneOutlined />, [], () => navigate('/contract')),
    getItem('Setting', '6', <SettingOutlined />, [], () => navigate('/settings')),
    getItem('Profile', '7', <UserOutlined />, [], () => navigate('/profile')),
    
];
