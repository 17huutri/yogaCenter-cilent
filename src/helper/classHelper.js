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
export async function deleteClass(id) {
    try {      
        const { data } = await placeholderApi.delete(`/class/deleteClass/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}
// export async function updateClass(id) {
//     try {      
//         return await placeholderApi.post(`/class/updateClass/${id}`);
//     } catch (error) {
//         return Promise.reject({ error: 'Could not update' });
//     }
// }
export async function getAllClasses() {
    try {      
        const { data } = await placeholderApi.get('/class/getAllClasses');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function createClass(data){
    try {      
        return await placeholderApi.post(`/class/createClass`,data);
    } catch (error) {
        return Promise.reject({ error: 'Could not create' });
    }
}
