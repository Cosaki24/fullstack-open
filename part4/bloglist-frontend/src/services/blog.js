import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
}

const addBlog = async (blogDetails) => {
    let authHeader = {
        'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('blogListUser')).token}`
    };
    const response = await axios.post(baseUrl, blogDetails, { headers: authHeader });
    if (response.status === 201 ){
        return response.data;
    }
}

export default { getAll, addBlog };