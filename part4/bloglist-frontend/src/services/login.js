import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    const data = response.data;
    if (data && data.token) {
        return {
            username: data.username,
            token: data.token,
            name: data.name
        };
    }
}

export default { login };