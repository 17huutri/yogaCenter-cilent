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
export async function deleteCourse(id) {
    try {      
        const { data } = await placeholderApi.delete(`/course/deleteCourse/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}
export async function updateCourse(id,data) {
    try {      
        return await placeholderApi.post(`/course/updateCourse/${id}`,data);
    } catch (error) {
        return Promise.reject({ error: 'Could not update' });
    }
}
export async function getAllCourses() {
    try {      
        const { data } = await placeholderApi.get('/course/getAllCourses');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function createCourse(data){
    try {      
        return await placeholderApi.post(`/course/createCourse`,data);
    } catch (error) {
        return Promise.reject({ error: 'Could not create' });
    }
}

export async function detailCourse(courseName){
    try {      
        return await placeholderApi.post(`/course/detailCourse/${courseName}`);
    } catch (error) {
        return Promise.reject({ error: 'Could not get details' });
    }
}
