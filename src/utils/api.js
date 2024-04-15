import axios from "axios";

const refreshAuthAxios = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

export const publicAxios = axios.create({
    baseURL: "http://localhost:5000"
});

export const authAxios = axios.create({
    baseURL: "http://localhost:5000"
});

authAxios.interceptors.request.use((config) => {
    config.headers["x-auth-token"] = localStorage.getItem("auth-token");
    return config;
}, (err) => {
    return Promise.reject(err);
});

authAxios.interceptors.response.use((response) => response, (err) => {
    if(err.response?.status === 403) {
        refreshAuthAxios.get("/api/auth/refresh-token").then((res) => {
            localStorage.setItem("auth-token", res.data["access_token"]);
            err.response.config.headers["x-auth-token"] = res.data["access_token"];
            return axios(err.response.config);
        }).catch((error) => {
            localStorage.removeItem("auth-token");
        })
    }
});