import axios from 'axios';
import { api } from '../urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';

const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}`: ''
    }
});

axiosInstance.interceptors.request.use((req) => {
    const {state} = store.getState();
    // console.log('axios',state.auth);
    if(state.auth.token) {
        req.headers.Authorization = `Bearer ${state.auth.token}`;
    }
    return req;
});

axiosInstance.interceptors.request.use((res) => {
    return res;
}, (error) => {
    // console.log(error.response);
    const {status} = error.response;
    // ป้องกัน token expire login issue
    if(status === 500) {
        localStorage.clear();
        store.dispatch({type: authConstants.LOGOUT_SUCCESS})
    }
    return Promise.reject(error);
});

export default axiosInstance