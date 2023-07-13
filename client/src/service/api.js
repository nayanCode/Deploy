
import axios from 'axios';

const url = 'http://localhost:8000';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`http://localhost:8000/login`, user)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}


export const sentRequest = async (details) => {
    try {
        return await axios.post(`http://localhost:8000/sentRequest`, details)
    } catch (error) {
        console.log('error while calling sentRequest API: ', error);
    }
}

export const existStudent = async (details) => {
    try {
        return await axios.post(`http://localhost:8000/verifyExistence`, details)
    } catch (error) {
        console.log('error while calling sentRequest API: ', error);
    }
}


export const getStudentStatus = async (id) => {
    try {
        return await axios.get(`http://localhost:8000/getStatus/${id}`)
    } catch (error) {
        console.log('error while calling sentRequest API: ', error);
    }
}


export const updateStatus= async (id,newMessage) => {
    try {
       return await axios.post(`http://localhost:8000/updateStatus/${id}/request=${newMessage}`);
       
    } catch (error) {
        console.log('Error while updating updateStatus', error);
    }
}


export const updateHash= async (id,hash) => {
    try {
       return await axios.post(`http://localhost:8000/updateHash/${id}/request=${hash}`);
       
    } catch (error) {
        console.log('Error while updating updateStatus', error);
    }
}