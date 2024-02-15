//documents ~ slide
export type DocumentType = "none" | "video" | "quiz" | "slide" | "undefined";
export enum DocumentENUM {
  VIDEO = "video",
  QUIZ = "quiz",
  DOCUMENTS = "slide",
}

export interface VideoInfo {
  name?: string;
  size?: string;
  createdAt?: string;
  status?: string;
  type?: string;
}

export interface Answer {
  // answerID: string;
  key: Number; //A, B, C, D,..
  value: string; //Description ...
  isCorrect: boolean; //Correct value
}

export interface Quiz {
  question: string;
  answers: Answer[];
}

export interface Quizzes {
  // quizzesId: string;
  lesson: string;
  quizs: Quiz[];
}

export interface Exam {
  quizId: string;
  answeredId: string;
}
