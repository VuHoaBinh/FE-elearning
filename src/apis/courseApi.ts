import { IGetCourse } from "src/types/course";
import axiosClient from "./axiosClient";

const COURSE_API = "/courses";

const courseApi = {
  getCourses: (params?: any) => {
    const url = COURSE_API;
    return axiosClient.get(url, { params });
  },
  getCoursesHot: (params?: IGetCourse) => {
    const url = COURSE_API + "/hot";
    return axiosClient.get(url, { params });
  },
  getCoursesSuggest: (params?: any) => {
    const url = COURSE_API + "/suggest";
    return axiosClient.get(url, { params });
  },
  getCoursesRelated: (id?: string, params?: any) => {
    const url = COURSE_API + "/" + id + "/related";
    return axiosClient.get(url, { params });
  },
  getCourseDetail: (id?: string) => {
    const url = COURSE_API + "/" + id;
    return axiosClient.get(url);
  },
  getCourseRatingList: (id?: string) => {
    const url = COURSE_API + "/" + id + "/rate";
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
