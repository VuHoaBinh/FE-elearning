import { IUser } from "./user";

export interface AuthSlice {
  isLoading: boolean;
  isAuth: boolean;
  isRole: string;
  amount_cart?: number;
  userInfo: IUser;
  panelActive?: string;
}

export interface ToggleSlice {
  toggleState: boolean;
}

export interface QuestionSlice {
  listQuestion: any[];
  activeQuestion: any;
  questionNumber: number;
  lastQuestionNumber: number;
  typeLesson?: string;
  studyLesson: any;
}

export interface ActionSlices {
  auth: AuthSlice;
  toggle: ToggleSlice;
  question: QuestionSlice;
}
