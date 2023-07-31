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
export async function deleteBooking(id) {
    try {
        const { data } = await placeholderApi.delete(`/booking/deleteBooking/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}
export async function setPaymentStatus(id) {
    try {
        const { data } = await placeholderApi.post(`/booking/setPaymentStatus/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}
export async function updateBooking(id) {
    try {
        return await placeholderApi.post(`/booking/updateBooking/${id}`);
    } catch (error) {
        return Promise.reject({ error: 'Could not update' });
    }
}
export async function rejectBooking(id) {
    try {
        return await placeholderApi.post(`/booking/rejectBooking/${id}`);
    } catch (error) {
        return Promise.reject({ error: 'Could not update' });
    }
}
export async function getAllBookings() {
    try {
        const { data } = await placeholderApi.get('/booking/getAllBookings');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function createBooking(data) {
    try {
        return await placeholderApi.post(`/booking/createBooking`, data);
    } catch (error) {
        return Promise.reject({ error: 'Could not create' });
    }
}
export async function getBookings(query) {
    try {
        const { data } = await placeholderApi.get('/booking/getBookings',{params : query});
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function getAcceptedBookings() {
    try {
        const { data } = await placeholderApi.get('/booking/accepted');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function getWaitingBookings() {
    try {
        const { data } = await placeholderApi.get('/booking/waiting');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function getRejectedBookings() {
    try {
        const { data } = await placeholderApi.get('/booking/rejected');
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not get' });
    }
}
export async function getBookingOfUser(id) {
    try {
        const { data } = await placeholderApi.get(`/booking/getBookingOfUser/${id}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}