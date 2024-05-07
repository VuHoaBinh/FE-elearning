import axiosClient from "./axiosClient";

const COURSE_API = "/courses";

const courseApi = {
  getCourses: (params?: any) => {
    const url = COURSE_API;
    return axiosClient.get(url, { params });
  },
  getCourseDetail: (id?: string) => {
    const url = COURSE_API + "/" + id;
    return axiosClient.get(url);
  },
  createNewCourse: (course_info: Object) => {
    const url = COURSE_API;
    return axiosClient.post(url, course_info);
  },

  deleteCourse: (id: string) => {
    const url = COURSE_API + "/" + id;
    return axiosClient.delete(url);
  },
  updateCourse: (id?: string, course_info?: Object) => {
    const url = COURSE_API + "/" + id;
    return axiosClient.put(url, course_info);
  },
  viewCheckCourse: (id?: string) => {
    const url = COURSE_API + "/check/" + id;
    return axiosClient.get(url);
  },
};

export default courseApi;
