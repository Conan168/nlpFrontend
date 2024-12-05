import axios, { AxiosRequestConfig, AxiosResponse } from "axios"

const service = axios.create({
    baseURL: "http://localhost:8000/",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
})

// Request interceptor
service.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
service.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error", error.response || error.message);
        return Promise.reject(error);
    }
);
/*
const buildUrl = (url: string, params?: Record<string, string | number>): string => {
    if (!params || Object.keys(params).length === 0) {
        return url;
    }
    const queryString = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
    return `${url}?${queryString}`
}
*/
//Get 
const get = (url: string, params = {}) => {
    return service.get(url, { params })
}

const post = (url: string, data = {}) => {
    return service.post(url, data)
}

const patch = (url: string, data = {}) => {
    return service.patch(url, data)
}

const del = (url: string, params = {}) => {
    return service.delete(url, { params })
}

export default service