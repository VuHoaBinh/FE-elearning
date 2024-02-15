import axiosClient from "./axiosClient";

const RATING_API = "/rate";

const rateApi = {
  postRatingCourse: (rating_info: any) => {
    const url = RATING_API;
    return axiosClient.post(url, rating_info);
  },
  updateRatingCourse: (id: string, rating_info: any) => {
    const url = RATING_API + "/" + id;
    return axiosClient.put(url, rating_info);
  },
};
export default rateApi;
