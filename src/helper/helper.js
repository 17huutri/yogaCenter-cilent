import axios from 'axios';
import jwt_decode from 'jwt-decode';
// import * as dotenv from 'dotenv';
// dotenv.config()

let token = localStorage.getItem('token');
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token');
        if (Number(response.phone) >= 0) {
            const data = await placeholderApi.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });
            return Promise.resolve({ data })
        } else throw new Error;
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile...!" })
    }
}
const placeholderApi = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
});

/** Make API Requests */


/** To get username from Token */
export async function getUsername() {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username) {
    try {
        return await placeholderApi.post('/api/authenticate', { username })
    } catch (error) {
        return { error: "Username doesn't exist...!" }
    }
}
export async function getAllUser(query) {
    try {

        // console.log(filterData)
        // console.log(query)
        const { data } = await placeholderApi.get(`/api/getAll`, { params: query });


        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not getAll' });
    }
}
export async function getCustomers(query) {
    try {
        const { data } = await placeholderApi.get('/admin/getCustomers', { params: query });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not getAll' });
    }
}
export async function getMentors(query) {
    // console.log(query)
    try {
        const { data } = await placeholderApi.get('/admin/getMentors', { params: query });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not getAll' });
    }
}
export async function getStaffs(query) {
    try {
        const { data } = await placeholderApi.get('/admin/getStaffs', { params: query });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not getAll' });
    }
}
export async function getAdmins(query) {
    try {
        const { data } = await placeholderApi.get('/admin/getAdmins', { params: query });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not getAll' });
    }
}
export async function deleteUser(userId) {
    try {
        const { data } = await placeholderApi.delete(`/api/deleteUser/${userId}`);
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: 'Could not delete' });
    }
}
export async function updateUser_1(userId, updatedUser) {
    try {
        return await placeholderApi.post(`/api/updateUser/${userId}`, updatedUser);
    } catch (error) {
        return Promise.reject({ error: 'Could not getAll' });
    }
}
/** get User details */
export async function getUser({ username }) {
    try {
        const { data } = await placeholderApi.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error: "Password doesn't Match...!" }
    }
}
export async function disableUser(id) {
    try {
        // console.log(id);
        return await placeholderApi.post(`/api/disableUser/${id}`);

    } catch (error) {
        return { error: error }
    }
}
export async function ableUser(id) {
    try {
        return await placeholderApi.post(`/api/ableUser/${id}`);

    } catch (error) {
        return { error: error }
    }
}

/** register user function */
export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await placeholderApi.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if (status === 201) {
            // let { data: { email } } = await getUser({ username });
            // await generateOTPforRegister(username,email);
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}
// for register
export async function generateOTPforRegister(username, email) {
    try {
        const { data: { code }, status } = await placeholderApi.get('/api/generateOTP', { params: { username } });

        // send mail with the OTP
        if (status === 201) {

            let text = `Welcome you to join with us, here your OTP ${code}.`;
            await placeholderApi.post('/api/registerMail', { username, userEmail: email, text, subject: "Registration OTP" })
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error: 'Could not send OTP' });
    }
}
/** login function */
export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = await placeholderApi.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Wrong password or username" })
    }
}

/** update user profile function */


/** generate OTP */
export async function recoveryUser(username) {
    try {
        const { data: { code }, status } = await placeholderApi.get('/api/recoveryUser', { params: { username } });

        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error: 'Could not recoveryUser' });
    }
}

/** generate OTP */
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await placeholderApi.get('/api/generateOTP', { params: { username } });

        // send mail with the OTP
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await placeholderApi.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" })
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error: 'Could not send OTP' });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await placeholderApi.get('/api/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await placeholderApi.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}
export async function confirmAccount({ username }) {
    try {
        const { data, status } = await placeholderApi.put('/api/confirmAccount', { username });
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error })
    }
}
export async function getStudentInGrade(gradeId) {
    try {
        const { data } = await placeholderApi.get(`/api/studentInGrade/${gradeId}`);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject('Could not Show');
    }
}
export async function kickStudent(id) {
    try {
        return await placeholderApi.post(`/api/kickStudent/${id}`);
    } catch (error) {
        return { error: error }
    }
}
