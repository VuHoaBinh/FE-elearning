import axiosClient from "./axiosClient";

const PAYMENT_API = "/payment";

const paymentApi = {
  // postCheckoutCart: (params: any) => {
  //   const url = PAYMENT_API + "/checkout-cart";
  //   return axiosClient.post(url, params);
  // },
  postCheckout: (params?: any) => {
    const url = PAYMENT_API + "/checkout";
    return axiosClient.post(url, params);
  },
  RedirectGateway: (gateway: string) => {
    const url = PAYMENT_API + "/" + gateway + "/callback";
    return axiosClient.get(url);
  },
};
export default paymentApi;
