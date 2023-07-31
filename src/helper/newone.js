import axios from 'axios';
// import * as dotenv from 'dotenv';
// dotenv.config()
const token = localStorage.getItem('token')
const placeholderApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});
export async function getGradeByStudent(id) {
    try {      
        const { data } = await placeholderApi.get(`/customer/getGrade/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}