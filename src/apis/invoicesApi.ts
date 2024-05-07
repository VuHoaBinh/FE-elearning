import axiosClient from "./axiosClient";

const INVOICES_API = "/invoices";

const invoicesApi = {
  getInvoices: (params?: any) => {
    const url = INVOICES_API;
    return axiosClient.get(url, { params });
  },
  getInvoiceDetail: (id?: string) => {
    const url = INVOICES_API + "/" + id;
    return axiosClient.get(url);
  },
  updateInvoices: (id?: string, data?: any) => {
    const url = INVOICES_API + "/" + id;
    return axiosClient.put(url, data);
  },
};

export default invoicesApi;
