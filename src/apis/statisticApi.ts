import axiosClient from "./axiosClient";

const STATISTIC_API = "/statistics";

const statisticApi = {
  //revenues
  getRevenueByRangeDate: (params: any) => {
    const url = STATISTIC_API + "/revenues/daily";
    return axiosClient.get(url, { params });
  },
  getRevenueByRangeMonth: (year: number | string, params: any) => {
    const url = STATISTIC_API + "/revenues/monthly/" + year;
    return axiosClient.get(url, { params });
  },
  getRevenueByRangeYear: (params: any) => {
    const url = STATISTIC_API + "/revenues/yearly";
    return axiosClient.get(url, { params });
  },
  //users
  getUserByMonth: (params: any) => {
    const url = STATISTIC_API + "/users/monthly";
    return axiosClient.get(url, { params });
  },
  getUserByRangeYears: (params: any) => {
    const url = STATISTIC_API + "/users/yearly";
    return axiosClient.get(url, { params });
  },
  //courses
  getCourses: () => {
    const url = STATISTIC_API + "/courses";
    return axiosClient.get(url);
  },
  getHotCourseByMonth: (params: any) => {
    const url = STATISTIC_API + "/top-sale-courses/month";
    return axiosClient.get(url, { params });
  },
  getHotCourseByYear: (params: any) => {
    const url = STATISTIC_API + "/top-sale-courses/year";
    return axiosClient.get(url, { params });
  },
  //coupon
  getCoupons: (params: any) => {
    const url = STATISTIC_API + "/coupons";
    return axiosClient.get(url, { params });
  },

  //teacher revenue
  getTeacherRevenueByMonth: (params?: any) => {
    const url = STATISTIC_API + "/revenues/teachers";
    return axiosClient.get(url, { params });
  },
  getTeacherRevenueById: (id?: string, params?: any) => {
    const url = STATISTIC_API + "/revenues/teachers/" + id;
    return axiosClient.get(url, { params });
  },
  getTopTeacherRevenueByEveryMonth: (params?: any) => {
    const url = STATISTIC_API + "/top-teachers-of-months";
    return axiosClient.get(url, { params });
  },
  getTopTeacherRevenueByYear: (params?: any) => {
    const url = STATISTIC_API + "/top-teachers-of-year";
    return axiosClient.get(url, { params });
  },
};

export default statisticApi;
