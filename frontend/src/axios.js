import axios from "axios";

window.axios = axios;
axios.defaults.withCredentials = false;

// Use consistent base URL for development and production
let backendUrl;

// In development mode, use the proxy setup
if (process.env.NODE_ENV === 'development') {
    backendUrl = '/api';
} else {
    // In production, use the hostname with port
    backendUrl = "http://" + window.location.hostname + ":8001/api";
}

axios.defaults.baseURL = backendUrl;

// Add request/response interceptors for debugging if needed
axios.interceptors.request.use(request => {
    return request;
}, error => {
    console.error('Request error:', error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.error('Response error:', error);
    return Promise.reject(error);
});

export default axios;
