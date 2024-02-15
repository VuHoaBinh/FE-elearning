import axiosClient from "./axiosClient";

const CHAT_API = "/chat";

const chatApi = {
  connectChat: (conversation_info: Object) => {
    const url = CHAT_API + "/conversation";
    return axiosClient.post(url, conversation_info);
  },
  acceptChat: (conversation_info: Object) => {
    const url = CHAT_API + "/accept-conversation";
    return axiosClient.post(url, conversation_info);
  },
  getUserChatList: (params?: string) => {
    const url = CHAT_API + "/conversation";
    return axiosClient.get(url, { params });
  },
  sendMessage: (params?: any) => {
    const url = CHAT_API + "/message";
    return axiosClient.post(url, params);
  },
  getLatestMessage: (conversation?: string, params?: any) => {
    const url = CHAT_API + "/conversation/" + conversation;
    return axiosClient.get(url, { params });
  },
  markIsReadMessage: (conversation?: string) => {
    const url = CHAT_API + "/conversation/" + conversation;
    return axiosClient.put(url);
  },
};
export default chatApi;
