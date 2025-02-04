import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const AdminService = {
    updatePasswordUser: async (values, id) => {
        try {
            const response = await axios.put(
                `${apiUrl}/auth/change-password-by-id/${id}`,
                {
                    new_password: values,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            return {
                data: response,
                success: true,
                message: 'Change password successfully!',
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to  change password. Please try again.',
            };
        }
    },
    getUserByEmail: async (email) => {
        try {
            const response = await axios.post(
                `${apiUrl}/users/find-user-by-email`,
                { email },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const userData = response.data?.data?.data;
            const result = {
                id: userData.user_id,
                created_at: userData.created_at,
                updated_at: userData.updated_at,
                ...userData.user_details,
            };

            return {
                success: true,
                data: result,
                message: response.detail,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to find user. Please try again.',
            };
        }
    },
    getAllUsers: async (page = 1, perPage = 10) => {
        try {
            const response = await axios.get(`${apiUrl}/users/?page=${page}&per_page=${perPage}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to get users. Please try again.',
            };
        }
    },
    getDashboard: async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/dashboard`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json',
                },
            });
            return {
                success: true,
                data: response.data.data,
                message: response.data.message,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response.detail || 'Failed to get dashboard. Please try again.',
            };
        }
    },
};

export default AdminService;
