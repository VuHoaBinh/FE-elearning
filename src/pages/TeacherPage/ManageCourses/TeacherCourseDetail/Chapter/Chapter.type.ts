import { ILessonUpload } from "../Lesson";

export interface IChapterUpload {
  _id: string;
  name: string;
  lessons: ILessonUpload[];
  number?: number;
}

export interface ChapterUploadProps {
  chapter: IChapterUpload;
  index: number;
  handleUpdateChapter: (name: string, index: number, chapterId: string) => void;
  handleDeleteChapter: (chapterId: string) => void;
}
