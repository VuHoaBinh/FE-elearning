import { createSlice } from "@reduxjs/toolkit";
import { ActionSlices, QuestionSlice } from "src/types";

const initialState: QuestionSlice = {
  listQuestion: [],
  activeQuestion: {},
  questionNumber: 0,
  lastQuestionNumber: 0,
  typeLesson: "",
  studyLesson: {},
};

const questionSlice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {
    setActiveQuestion(state, action) {
      state.activeQuestion = action.payload;
    },
    submitQuiz(state) {
      state.listQuestion = [];
      state.activeQuestion = {};
      state.questionNumber = 0;
      state.lastQuestionNumber = 0;
      state.typeLesson = "";
      state.studyLesson = {};
    },
    setListQuestion(state, action) {
      state.listQuestion = action.payload;
    },
    setQuestionNumber(state, action) {
      state.questionNumber = action.payload;
    },
    setLastQuestionNumber(state, action) {
      state.lastQuestionNumber = action.payload;
    },
    setLessonType(state, action) {
      state.typeLesson = action.payload;
    },
    setStudyLesson(state, action) {
      state.studyLesson = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = questionSlice;

export const {
  setListQuestion,
  submitQuiz,
  setActiveQuestion,
  setQuestionNumber,
  setLastQuestionNumber,
  setLessonType,
  setStudyLesson,
} = actions;
export const getQuestionState = (state: ActionSlices) => state.question;
export default reducer;
