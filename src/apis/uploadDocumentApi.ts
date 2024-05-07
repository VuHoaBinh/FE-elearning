import axiosClient from "./axiosClient";

const COURSE_API = "/courses";
const LESSON_API = "/lessons";

const uploadDocumentApi = {
  uploadImage: (image: File) => {
    const url = COURSE_API + "/upload/image";

    const formData = new FormData();
    formData.append("image", image);

    return axiosClient.post(url, formData);
  },
  uploadFile: (file: File) => {
    const url = LESSON_API + "/upload-file";

    const formData = new FormData();
    formData.append("file", file);

    return axiosClient.post(url, formData);
  },
  uploadVideo: (lesson_id: string, video: File) => {
    const url = LESSON_API + "/upload-video";

    const formData = new FormData();
    formData.append("lesson_id", lesson_id);
    formData.append("file", video);

    return axiosClient.post(url, formData);
  },
};

export default uploadDocumentApi;
