import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const PostService = {
    getPosts : async (page = 1, perPage = 10) => {
        try {
            const response = await axios.get(`${apiUrl}/posts/?page=${page}&per_page=${perPage}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                success: true,
                data: response.data,
                message: response.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to get posts. Please try again.',
            };
        }
    },
    createPost : async (post) => {
        try {
            const response = await axios.post(`${apiUrl}/posts/`, post, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                success: true,
                data: response.data,
                message: response.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to create post. Please try again.',
            };
        }
    },
};

export default PostService;
