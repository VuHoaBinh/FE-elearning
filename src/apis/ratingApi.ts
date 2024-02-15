import axiosClient from "./axiosClient";

const RATE_API = "rate";

const ratingApi = {
  postRate: (data?: any) => {
    const url = RATE_API;
    return axiosClient.post(url, data);
  },
  updateRate: (id?: string, data?: any) => {
    const url = RATE_API + "/" + id;
    return axiosClient.put(url, data);
  },
};

export default ratingApi;
