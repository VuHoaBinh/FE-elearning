import axiosClient from "./axiosClient";

const EXAM_API = "/exam";

const examApi = {
  getReviewExam: (lesson: string) => {
    const url = EXAM_API;
    return axiosClient.get(url, {
      params: { lesson },
    });
  },

  submitExam: (payload: any) => {
    const url = EXAM_API;
    return axiosClient.post(url, payload);
  },
};

export default examApi;
