import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const AuthService = {
    login: async (values) => {
        const payload = {
            email: values.email,
            password: values.password,
        };

        try {
            const response = await axios.post(`${apiUrl}/auth/login`, payload);
            if (response.data.status === 200) {
                const { access_token } = response.data.data;
                localStorage.setItem('access_token', access_token);
                return { success: true, token: access_token, message: 'Login successful!' };
            } else {
                return {
                    success: false,
                    message: 'Login failed. Please try again.',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: 'Login failed. Please try again.',
            };
        }
    },
    register: async (values) => {
        try {
            const payload = {
                email: values.email,
                password: values.password,
                phone_number: values.phoneNumber,
                full_name: values.name,
            };
            const response = await axios.post(`${apiUrl}/auth/register`, payload);
            if (response.data.status === 201) {
                return {
                    success: true,
                    message: 'Registration successful!',
                };
            } else {
                return {
                    success: false,
                    message: 'Registration failed. Please try again.',
                };
            }
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: error.response.data.detail,
            };
        }
    },
};

export default AuthService;
