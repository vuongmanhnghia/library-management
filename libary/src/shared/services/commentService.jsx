import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const CommentService = {
    createComment: async (post_id, comment) => {
        try {
            const response = await axios.post(`${apiUrl}/comments/${post_id}`, comment, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("Created comment:", response.data);
            return {
                success: true,
                data: response.data,
                message: response.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to create comment. Please try again.',
            };
        }
    },

    getCommentsByPostId: async (postId) => {
        try {
            const response = await axios.get(`${apiUrl}/comments/${postId}`, {
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
                message: error.response?.data?.detail || 'Failed to get comments. Please try again.',
            };
        }
    },
}

export default CommentService;