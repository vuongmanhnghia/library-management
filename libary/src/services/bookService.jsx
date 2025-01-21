import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const BookService = {
    getAll: async (currentPage = 1, perPage = 8) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return {
                success: false,
                message: 'Authentication token is missing.',
            };
        }

        try {
            const response = await axios.get(`${apiUrl}/books/?page=${currentPage}&perpage=${perPage}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Response:', response);

            if (response.data.status === 200) {
                const result = response.data.data;
                return {
                    success: true,
                    data: result.books[0],
                    message: 'Get books successfully!',
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to get books. Please try again.',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'An error occurred while fetching books. Please try again.',
            };
        }
    },
    getUserBooks: async (currentPage = 1, perPage = 8) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return {
                success: false,
                message: 'Authentication token is missing.',
            };
        }

        try {
            const response = await fetch(`${apiUrl}/users/my-books`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            console.log('Response:', response);
            if (response.status === 200) {
                const result = response;
                return {
                    success: true,
                    data: result,
                    message: 'Get user books successfully!',
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to get user books. Please try again.',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.detail || 'An error occurred while fetching books. Please try again.',
            };
        }
    },
};

export default BookService;
