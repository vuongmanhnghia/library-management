import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const UserService = {
    delete: async () => {
        try {
            const response = await axios.delete(`${apiUrl}/auth/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            return {
                success: true,
                data: response.data.data,
                message: 'User deleted successfully!',
            };
        } catch (error) {
            return {
                success: false,
                message: error.response.data?.detail || 'Failed to delete user. Please try again.',
            };
        }
    },
    update: async (userData) => {
        try {
            const response = await axios.put(
                `${apiUrl}/auth/`,
                {
                    email: userData.email,
                    full_name: userData.full_name,
                    phone_number: userData.phone_number,
                    avatar: userData.avatar || null,
                    gender: userData.gender || null,
                    date_of_birth: userData.date_of_birth|| null,
                    address: userData.address || null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            return {
                data: response.data.data,
                success: true,
                message: 'User updated successfully!',
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to update user. Please try again.',
            };
        }
    },
    updatePassword: async (values) => {
        try {
            const response = await axios.put(
                `${apiUrl}/auth/change-password`,
                {
                    old_password: values.oldPassword,
                    new_password: values.newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
            return {
                data: response.data.data,
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

export default UserService;
