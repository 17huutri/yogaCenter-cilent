import axios from 'axios';
// import * as dotenv from 'dotenv';
// dotenv.config()
let token = localStorage.getItem('token');
const placeholderApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
    }
});

export async function uploadFile(file) {
    try {
        return await placeholderApi.post(`/upload`, file);
    } catch (error) {
        return Promise.reject({ error: 'Cannot upload' });
    }
}
export function getFile(id) {
    try {
        return `http://localhost:8080/getUpload/${id}`;
    } catch (error) {
        return 'Failed'
    }
}