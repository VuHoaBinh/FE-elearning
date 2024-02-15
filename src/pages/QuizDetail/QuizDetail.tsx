import { Box, Button, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import examApi from "src/apis/examApi";
import quizApi from "src/apis/quizApi";
import BoxContent from "src/components/BoxContent";
import LoadingContent from "src/components/LoadingContent";
import NavigationHeader from "src/components/NavigationHeader/NavigationHeader";
import {
  getQuestionState,
  selectAuthorization,
  setActiveQuestion,
  setLastQuestionNumber,
  setListQuestion,
  setQuestionNumber,
  submitQuiz,
} from "src/reducers";
import { ROLE } from "src/types";
import { notificationMessage } from "src/utils";
import MiniMapQuestion from "./MiniMapQuestion/MiniMapQuestion";
import QuestionViewDetail from "./QuestionViewDetail/QuestionViewDetail";
import DialogViewScore from "./DialogViewScore/DialogViewScore";

const QuizDetail = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const { isRole } = useSelector(selectAuthorization);
  const [showDialogViewScore, setShowDialogViewScore] =
    useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(0);
  const { listQuestion, activeQuestion, questionNumber, lastQuestionNumber } =
    useSelector(getQuestionState);
  const dispatch = useDispatch();

  const fetchListQuestion = async () => {
    setLoading(true);
    try {
      const response = await quizApi.getQuizLesson(lessonId as string);
      const { data } = response;
      setLoading(false);
      const listQuestionStudent = data?.map((item: any) => ({
        ...item,
        answers: item?.answers?.map((answer: any) => ({
          ...answer,
          checked: false,
        })),
      }));
      dispatch(setQuestionNumber(0));
      dispatch(setActiveQuestion(listQuestionStudent[0]));
      dispatch(setLastQuestionNumber(listQuestionStudent?.length));
      dispatch(setListQuestion(listQuestionStudent));
    } catch (error) {
      setLoading(false);
      notificationMessage("error", error as string);
    }
  };
  useEffect(() => {
    if (!listQuestion?.length) {
      fetchListQuestion();
    }
    return () => {
      dispatch(submitQuiz());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  const handleNextQuestion = () => {
    dispatch(setQuestionNumber(questionNumber + 1));
    dispatch(setActiveQuestion(listQuestion[questionNumber + 1]));
  };

  const handleBackQuestion = () => {
    dispatch(setQuestionNumber(questionNumber - 1));
    dispatch(setActiveQuestion(listQuestion[questionNumber - 1]));
  };

  const handleSetActiveQuestion = (item: any) => {
    setActiveQuestion(item);
    dispatch(setActiveQuestion(item));
    // eslint-disable-next-line array-callback-return
    listQuestion.map((itemList: any, index: number) => {
      if (itemList._id === item._id)
        return dispatch(setQuestionNumber(index || 0));
    });
  };

  const updateAnswer = (idQuestion: string, idAnswer: string, answer: any) => {
    const listAnswerUpdated = listQuestion.map((question: any) => {
      if (question?._id === idQuestion) {
        const updatedAnswers = question.answers.map((answerState: any) => {
          if (answerState?._id === idAnswer) {
            return { ...answerState, checked: !answer?.checked };
          }
          return answerState;
        });
        dispatch(setActiveQuestion({ ...question, answers: updatedAnswers }));
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });
    dispatch(setListQuestion(listAnswerUpdated));
  };

  const handleChooseAnswer = (
    idQuestion: string,
    idAnswer: string,
    value: any
  ) => {
    updateAnswer(idQuestion, idAnswer, value);
  };

  const handleSubmit = async () => {
    try {
      const params = {
        lesson: lessonId,
        exams: listQuestion?.map((question: any) => ({
          quizId: question?._id,
          answeredIds: question?.answers
            ?.filter((answer: any) => answer?.checked === true)
            ?.map((item: any) => item._id),
        })),
      };
      await examApi.submitExam(params).then((response: any) => {
        console.log("response", response);
        // navigate(-1);
        setScore(response?.data?.scores);
        setMaxScore(response?.data?.maxScores);
        setShowDialogViewScore(true);

        return notificationMessage("success", "Nộp bài thành công");
      });
    } catch (error) {
      const message = (error as any)
        ?.toString()
        ?.includes("You have already done this exam")
        ? "Bạn đã nộp bài thành công trước đó"
        : "Nộp bài thất bại";
      console.log("message", message);
      return notificationMessage("error", message);
    }
  };

  const handleBackPage = () => {
    dispatch(submitQuiz());
    navigate(-1);
  };

  const handleCloseDialogViewScore = () => {
    setShowDialogViewScore(false);
    dispatch(submitQuiz());
    navigate(-1);
  };

  return (
    <React.Fragment>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <NavigationHeader
          turnPreviousPage={false}
          userAction={false}
          title="Xem trước bài kiểm tra"
        />
        <Box display="flex" gap={10} flex={1} padding={30}>
          <BoxContent.BoxShadow style={{ flex: 1 }}>
            {loading ? (
              <LoadingContent.Loading />
            ) : (
              <QuestionViewDetail
                questionNumber={questionNumber}
                lastQuestionNumber={lastQuestionNumber}
                activeQuestion={activeQuestion}
                chooseAnswer={handleChooseAnswer}
                nextQuestion={handleNextQuestion}
                backQuestion={handleBackQuestion}
              />
            )}
          </BoxContent.BoxShadow>

          <BoxContent.NormalContent
            style={{
              width: 300,
            }}
          >
            <MiniMapQuestion
              activeQuestion={activeQuestion}
              listQuestion={listQuestion}
              setActiveQuestion={handleSetActiveQuestion}
            />
            <Divider />
            {isRole === ROLE.STUDENT && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
              >
                Nộp bài
              </Button>
            )}
            <Button
              color="inherit"
              variant="contained"
              onClick={handleBackPage}
            >
              Quay lại trang trước
            </Button>
          </BoxContent.NormalContent>
        </Box>
      </Box>
      <DialogViewScore
        score={score}
        maxScore={maxScore}
        open={showDialogViewScore}
        onClose={handleCloseDialogViewScore}
      />
    </React.Fragment>
  );
};

export default QuizDetail;
