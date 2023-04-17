import axios from "axios";
import router from '@/router';
import {defineStore} from 'pinia';

const BASE_URL = `http://localhost:3000/`;

export const convertApi = axios.create({
    baseURL: 'http://127.0.0.1:8502/',
    withCredentials: false,
})

export const authApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";
authApi.defaults.headers.common["Authorization"] = setAuth();

//
// authApi.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         const errMessage = error.response.data.message as string;
//         if (errMessage.includes("not logged in") && !originalRequest._retry) {
//             originalRequest._retry = true;
//             return authApi(originalRequest);
//         }
//         return Promise.reject(error);
//     }
// );

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')!),
        returnUrl: null
    }),
    actions: {
        async login(email: string, password: string) {
            const user = await authApi.post(`/auth/login`, {email, password});
            authApi.defaults.headers.common["Authorization"] = `Bearer ${user.data.access_token}`;

            // update pinia state
            this.user = user.data;

            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data.access_token));

            // redirect to previous url or default to home page
            await router.push(this.returnUrl || '/');
        },
        setUser(user: any) {
            this.user = user
        }
    }
});

function setAuth() {
    let token = localStorage.getItem('user')
    // @ts-ignore
    if (token) {
        token = token.replaceAll('"', '')
    }
    return `Bearer ${token}`
}