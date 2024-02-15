import { ICoupon } from "src/types/cart";
import axiosClient from "./axiosClient";

const COUPON_API = "/coupons";

const couponApi = {
  getCoupons: (params: any) => {
    const url = COUPON_API;
    return axiosClient.get(url, { params });
  },
  getCouponDetail: (id: string) => {
    const url = COUPON_API + "/" + id;
    return axiosClient.get(url);
  },

  createNewCoupon: (params: ICoupon) => {
    const url = COUPON_API;
    return axiosClient.post(url, params);
  },
  updateCoupon: (id: string | number, params: any) => {
    const url = COUPON_API + "/" + id;
    return axiosClient.put(url, params);
  },
  multiDeleteCoupon: (ids: any) => {
    const url = COUPON_API;
    return axiosClient.delete(url, { data: ids });
  },

  postCouponToGoogleSheet: (data: any) => {
    const url = COUPON_API + "/export-sheet";
    return axiosClient.post(url, data);
  },
};
export default couponApi;
