import axiosClient from "./axiosClient";

const Blog_API = "/blog";

const blogApi = {
  getBlog: (params?: any): any => {
    const url = Blog_API;
    return axiosClient.get(url, { params });
  },
  CreateNewBlog: (blog_info: Object) => {
    const url = Blog_API;
    return axiosClient.post(url, blog_info);
  },
  DeleteBlog: (id?: string) => {
    const url = Blog_API + "/" + id;
    return axiosClient.delete(url);
  },
};
export default blogApi;
