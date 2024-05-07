import { DocumentType, VideoInfo } from "src/types";

type StatusProgress = "pending" | "success";

export interface IVideoUpload {
  name: string;
  size: string;
  createdAt: string;
  type: string;
  status: StatusProgress;
  url: string;
}

export interface ILessonUpload {
  _id: string;
  title: string;
  description: string;
  videoInfo: IVideoUpload;
  publish: boolean;
  type?: DocumentType;
  slide?: string;
}

export interface LessonUploadProps {
  lesson: ILessonUpload;
  index: number;
  handleUpdateLesson: (
    name: string,
    order: number,
    lessonId: string,
    description?: string,
    file?: string,
    documentType?: DocumentType,
    videoInfo?: VideoInfo
  ) => void;
  handleDeleteLesson: (id: string) => void;
}
