import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import quizApi from "src/apis/quizApi";
import BoxContent from "src/components/BoxContent";
import LoadingContent from "src/components/LoadingContent";
import NavigationHeader from "src/components/NavigationHeader";
import { Quiz } from "src/types";
import { notificationMessage } from "src/utils";
import HandleQuizItem from "./HandleQuizItem";

const QuizPage = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [quiz, setQuiz] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [openCreateNewQuiz, setOpenCreateNewQuiz] = useState(false);
  const [openDeleteQuizItem, setOpenDeleteQuizItem] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      getQuizLesson();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuizLesson = async () => {
    setLoading(true);
    try {
      const response = await quizApi.getQuizLesson(lessonId as string);
      const { data } = response;
      setLoading(false);
      setQuiz(data);
    } catch (error) {
      setLoading(false);
      notificationMessage("error", error as string);
    }
  };

  const handleClickPreview = () => {
    return navigate(`/teacher/course/${lessonId}/quiz-detail`);
  };

  return (
    <React.Fragment>
      <Box minHeight="100vh" display="flex" flexDirection="column">
        <NavigationHeader
          turnPreviousPage={false}
          userAction={false}
          title="Hệ thống làm bài kiểm tra"
        />
        <Box display="flex" gap={10} flex={1} padding={30}>
          <BoxContent.BoxShadow style={{ flex: 1 }}>
            {loading ? (
              <LoadingContent.Loading />
            ) : (
              <HandleQuizItem.QuizContent
                quizs={quiz}
                getQuizLesson={() => getQuizLesson()}
              />
            )}
          </BoxContent.BoxShadow>

          <BoxContent.NormalContent style={{ width: 300 }}>
            <Button
              variant="contained"
              onClick={() => setOpenCreateNewQuiz(true)}
            >
              Thêm 1 câu hỏi mới
            </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleClickPreview()}
            >
              Xem trước
            </Button>
            <Button
              variant="contained"
              color="warning"
              onClick={() => setOpenDeleteQuizItem(true)}
            >
              Xóa bài kiểm tra
            </Button>
            <Button
              color="inherit"
              variant="contained"
              onClick={() => navigate(-1)}
            >
              Quay lại trang trước
            </Button>
          </BoxContent.NormalContent>
        </Box>
      </Box>

      <HandleQuizItem.CreateNewQuizItem
        show={openCreateNewQuiz}
        lessonId={lessonId || ""}
        getQuizLesson={getQuizLesson}
        onClose={() => setOpenCreateNewQuiz(false)}
      />
      <HandleQuizItem.DeleteQuizItem
        show={openDeleteQuizItem}
        onClose={() => setOpenDeleteQuizItem(false)}
      />
    </React.Fragment>
  );
};

export default QuizPage;
