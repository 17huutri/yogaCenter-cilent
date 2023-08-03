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
export async function deleteGrade(id) {
    try {      
        const { data } = await placeholderApi.delete(`/grade/deleteGrade/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}
export async function updateGrade(id,data) {
    try {      
        return await placeholderApi.post(`/grade/updateGrade${id}`,data);
    } catch (error) {
        return Promise.reject({ error: 'Could not update' });
    }
}
export async function getAllGrades() {
    try {      
        const { data } = await placeholderApi.get('/grade/getAllGrades');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function createGrade(data){
    try {      
        return await placeholderApi.post(`/grade/createGrade`,data);
    } catch (error) {
        return Promise.reject({ error: 'Could not create' });
    }
}
export async function detailGrade(gradeName) {
    try {
        const response = await placeholderApi.get(`/grade/detailGrade?gradeName=${gradeName}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Could not get details');
    }
}
export async function getGradesOfMentor(id){
    try {
        const { data } = await placeholderApi.get(`/grade/gradesOfMentor/${id}`);
        return Promise.resolve({data});
    } catch (error) {
        return Promise.reject({ error: 'Could not SHow' });
    }
}
export async function getGradeById(id){
    try {
        const {data}  = await placeholderApi.get(`/grade/getGradeById/${id}`);
        return {data};
    } catch (error) {
        return Promise.reject({ error: 'Could not SHow' });
    }
}
export async function checkAttendance(query){
    try {
        let grade = query.grade
        let user = query.user
        let isAttended = query.isAttended
        let date = new Date(query.date)
        // date.setHours(0,0,0,0)
        const {data}  = await placeholderApi.post(`/slot/createSlot?grade=${grade}&user=${user}&date=${date}&isAttended=${isAttended}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not SHow' });
    }
}
export async function getSlotOfUser(id){
    try {
        const {data}  = await placeholderApi.get(`/slot/getSlot/${id}`);
        return {data};
    } catch (error) {
        return Promise.reject({ error: 'Could not SHow' });
    }
}
export async function getAllGradesForSchedule() {
    try {      
        const { data } = await placeholderApi.get('/grade/getAllGradesForSchedule');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}