import axiosClient from "./axiosClient";

const CATEGORY_API = "/categories";

const categoryApi = {
  getCategories: (params?: any) => {
    const url = CATEGORY_API;
    return axiosClient.get(url, { params });
  },
  getCategoryDetail: (id: string | number) => {
    const url = CATEGORY_API + "/" + id;
    return axiosClient.get(url);
  },
  createNewCategory: (name: Object) => {
    const url = CATEGORY_API;
    return axiosClient.post(url, name);
  },
  updateCategory: (id: string | number, category_info: any) => {
    const url = CATEGORY_API + "/" + id;
    return axiosClient.put(url, category_info);
  },
  deleteCategory: (id: string | number) => {
    const url = CATEGORY_API + "/" + id;
    return axiosClient.delete(url);
  },
  deleteMultiCategory: (ids: any) => {
    const url = CATEGORY_API;
    return axiosClient.delete(url, { data: ids });
  },
};

export default categoryApi;
