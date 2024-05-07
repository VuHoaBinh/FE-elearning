import axiosClient from "./axiosClient";

const TEACHER_API = "/teacher";

const teacherApi = {
  getCourses: (params?: any) => {
    const url = TEACHER_API + "/courses";
    return axiosClient.get(url, { params });
  },
  getCourseDetails: (id?: string) => {
    const url = TEACHER_API + "/courses/" + id;
    return axiosClient.get(url);
  },
  getTeacherInfoById: (id?: string) => {
    const url = TEACHER_API + "/info/" + id;
    return axiosClient.get(url);
  },
  updateTeacherInfoById: (id?: string, params?: any) => {
    const url = TEACHER_API + "/info/" + id;
    return axiosClient.put(url, params);
  },
};
export default teacherApi;
