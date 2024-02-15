import axiosClient from "./axiosClient";

const CART_API = "/carts";

const cartApi = {
  getCart: () => {
    const url = CART_API;
    return axiosClient.get(url);
  },
  addItemToCart: (course: Object) => {
    const url = CART_API;
    return axiosClient.post(url, course);
  },
  removeItemFromCart: (id?: string) => {
    const url = CART_API + "/" + id;
    return axiosClient.delete(url);
  },
  addCouponToCart: (id?: string, params?: any) => {
    const url = CART_API + "/" + id;
    return axiosClient.put(url, params);
  },
};

export default cartApi;
