import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const getUser = async (token) => {
    if (!token) {
        return null;
    }
    try {
        const response = await axios.get(`${apiUrl}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};


export { getUser };