import {
  IForgotPassword,
  ILogin,
  IRegister,
  IUpdatePassword,
} from "src/types/auth";
import axiosClient from "./axiosClient";

const AUTH_API = "/login";
const ACCOUNTS_API = "/accounts";

const authApi = {
  // for auth api
  postLogin: (account: ILogin) => {
    const url = AUTH_API;
    return axiosClient.post(url, account);
  },
  postLoginGoogle: (access_token: Object) => {
    const url = AUTH_API + "/google";
    return axiosClient.post(url, access_token);
  },
  postLogout: () => {
    const url = AUTH_API + "/logout";
    return axiosClient.post(url);
  },
  postRefreshToken: (refresh_token: Object) => {
    const url = AUTH_API + "/refresh-token";
    return axiosClient.post(url, refresh_token);
  },

  // for account api
  postRegister: (account: IRegister) => {
    const url = ACCOUNTS_API + "/signup";
    return axiosClient.post(url, account);
  },
  postVerifyEmailRegister: (email: Object) => {
    const url = ACCOUNTS_API + "/verify";
    return axiosClient.post(url, email);
  },

  postForgotPassword: (account: IForgotPassword) => {
    const url = ACCOUNTS_API + "/forgot-pw";
    return axiosClient.post(url, account);
  },
  postVerifyEmailForgotPassword: (email: Object) => {
    const url = ACCOUNTS_API + "/verify/forgot";
    return axiosClient.post(url, email);
  },

  postUpdatePassword: (account: IUpdatePassword) => {
    const url = ACCOUNTS_API + "/change-pw";
    return axiosClient.post(url, account);
  },
};

export default authApi;
