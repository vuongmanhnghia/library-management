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
            const response = await axios.get(`${apiUrl}/books/?page=${currentPage}&per_page=${perPage}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status === 200) {
                const result = response.data.data;
                return {
                    success: true,
                    data: result,
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
            const response = await fetch(`${apiUrl}/users/my-books/?page=${currentPage}&per_page=${perPage}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
            if (response.status === 200) {
                const result = await response.json();
                return {
                    success: true,
                    data: result.data,
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

    getPendingBooks: async () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return {
                success: false,
                message: 'Authentication token is missing.',
            };
        }

        try {
            const response = await axios.get(`${apiUrl}/books/pending/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.status === 200) {
                const result = response.data.data;
                return {
                    success: true,
                    data: result,
                    message: 'Get pending books successfully!',
                };
            } else {
                return {
                    success: false,
                    message: 'Failed to get pending books. Please try again.',
                };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.detail || 'An error occurred while fetching pending books. Please try again.',
            };
        }

    },
    getBooksById: async (id) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return {
                success: false,
                message: 'Authentication token is missing.',
            };
        }

        try {
            const response = await axios.get(`${apiUrl}/books/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data,
                    message: 'Get book successfully!',
                };
            } else {
                return { success: false, message: 'Failed to get book. Please try again.' };
            }
        } catch (error) {
            if (error.response) {
                return {
                    success: false,
                    message: error.response.data.detail || 'An error occurred while fetching book. Please try again.',
                };
            } else {
                return { success: false, message: 'An error occurred while fetching book. Please try again.' };
            }
        }
    },
    create: async (payload) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return {
                success: false,
                message: 'Authentication token is missing.',
            };
        }

        try {
            const response = await axios.post(`${apiUrl}/books/`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message,
                };
            } else {
                return { success: false, message: 'Failed to create book. Please try again.' };
            }
        } catch (error) {
            return { success: false, message: 'An error occurred while creating book. Please try again.' };
        }
    },
    update: async (id, payload) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return {
                success: false,
                message: 'Authentication token is missing.',
            };
        }

        try {
            const response = await axios.put(`${apiUrl}/books/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data.data,
                    message: response.data.message,
                };
            } else {
                return { success: false, message: 'Failed to update book. Please try again.' };
            }
        } catch (error) {
            return { success: false, message: 'An error occurred while updating book. Please try again.' };
        }
    },
    updateStatus: async (id) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            return {
                success: false,
                message: 'Authentication token is missing.',
            };
        }

        try {
            const response = await axios.patch(`${apiUrl}/books/${id}/status`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                return {
                    success: true,
                    message: response.data.message,
                };
            } else {
                return { success: false, message: 'Failed to update book. Please try again.' };
            }
        } catch (error) {
            return { success: false, message: 'An error occurred while updating book. Please try again.' };
        }
        },
        deleteBook: async (id) => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                return {
                    success: false,
                    message: 'Authentication token is missing.',
                };
            }
    
            try {
                const response = await axios.delete(`${apiUrl}/books/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    return {
                        success: true,
                        message: response.data?.message,
                    };
                } else {
                    return { success: false, message: 'Failed to delete book. Please try again.' };
                }
            } catch (error) {
                return { success: false, message: 'An error occurred while deleting book. Please try again.' };
            }
        },
};

export default BookService;
