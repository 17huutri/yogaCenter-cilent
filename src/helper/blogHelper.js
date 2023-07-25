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
export async function deleteBlog(id) {
    try {      
        const { data } = await placeholderApi.delete(`/blog/deleteBlog/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}
export async function updateBlog(id) {
    try {      
        return await placeholderApi.post(`/blog/updateBlog/${id}`);
    } catch (error) {
        return Promise.reject({ error: 'Could not update' });
    }
}
export async function getAllBlogs() {
    try {      
        const { data } = await placeholderApi.get('/blog/getAllBlogs');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function createBlog(data){
    try {      
        return await placeholderApi.post(`/blog/createBlog`,data);
    } catch (error) {
        return Promise.reject({ error: 'Could not create' });
    }
}
