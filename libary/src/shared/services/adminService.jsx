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
};

export default AdminService;
