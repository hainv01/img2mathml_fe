import axios from "axios";
import { LoginInput } from "../pages/login.page";
import { RegisterInput } from "../pages/register.page";
import { GenericResponse, ILoginResponse, IUserResponse } from "./types";

const BASE_URL = "http://localhost:3000/";

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message as string;
    if (errMessage.includes("not logged in") && !originalRequest._retry) {
      originalRequest._retry = true;
      return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>("auth/register", user);
  return response.data;
};

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<ILoginResponse>("auth/login", user);
  return response.data;
};

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout");
  return response.data;
};

export const getMeFn = async () => {
  const response = await authApi.get<IUserResponse>("users/me");
  return response.data;
};
