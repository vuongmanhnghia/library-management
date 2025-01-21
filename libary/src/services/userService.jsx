import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const UserService = {
    delete: async (token) => {
        try{
            const response = await axios.delete(`${apiUrl}/auth/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                success: true,
                data: response.data.data,
                message: 'User deleted successfully!',
            }
        } catch (error) {
            return {
                success: false,
                message: error.response.data?.detail || 'Failed to delete user. Please try again.',
            };
        }
    },
    update: async (userData, token) => {
        try {
            const response = await axios.put(
                `${apiUrl}/auth/`,
                {
                    email: userData.email,
                    full_name: userData.full_name || undefined,
                    phone_number: userData.phone_number || undefined,
                    avatar: userData.avatar,
                    gender: userData.gender,
                    date_of_birth: userData.date_of_birth,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return {
                data: response.data.data,
                success: true,
                message: 'User updated successfully!',
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to update user. Please try again.',
            };
        }
    },
};

export default UserService;
