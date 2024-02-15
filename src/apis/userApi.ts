import axiosClient from "./axiosClient";

const ACCOUNT_API = "/user";

const userApi = {
  getMe: () => {
    const url = ACCOUNT_API;
    return axiosClient.get(url);
  },
  updateInfo: (user_info: Object) => {
    const url = ACCOUNT_API;
    return axiosClient.put(url, user_info);
  },
  getHistorySearch: () => {
    const url = ACCOUNT_API + "/history";
    return axiosClient.get(url);
  },
  getHistoryPayment: (params?: any) => {
    const url = ACCOUNT_API + "/invoices";
    return axiosClient.get(url, { params });
  },
  getHistoryPaymentDetail: (id?: string) => {
    const url = ACCOUNT_API + "/invoices/" + id;
    return axiosClient.get(url);
  },
};

export default userApi;
