import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Divider } from "@mui/material";
import { useState } from "react";
import quizApi from "src/apis/quizApi";
import TextContent from "src/components/TextContent";
import { Answer } from "src/types";
import HandleQuizItem from "..";
import "./styles.scss";
import { notificationMessage } from "src/utils";

interface QuizContentProps {
  quizs: any[];
  getQuizLesson: () => void;
}

const QuizContent: React.FC<QuizContentProps> = ({ quizs, getQuizLesson }) => {
  const [openUpdateQuiz, setOpenUpdateQuiz] = useState(false);
  const [quiz, setQuiz] = useState<any>();
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  if (!quizs.length) {
    return (
      <TextContent.NormalText
        content="Không có nội dung hiển thị"
        style={{ margin: "auto " }}
      />
    );
  }

  const handleDeleteQuiz = async () => {
    try {
      await quizApi.deleteQuiz(quiz._id).then((res: any) => {
        getQuizLesson();
        return notificationMessage("success", "Xoá câu hỏi thành công");
      });
    } catch (error) {
      return notificationMessage(
        "error",
        "Đã có lỗi xảy ra, vui lòng thử lại sau!"
      );
    }
  };

  return (
    <Box>
      <TextContent.Label label="Danh sách câu hỏi" />
      <Divider className="divider" />
      {quizs?.map((quiz: any, indexQuestion: number) => (
        <Box key={indexQuestion} className="content-quiz">
          <Box className="title-question">
            <TextContent.Label
              label={`Câu ${indexQuestion + 1}: ${quiz?.question}`}
            />
            <Box className="action-question">
              <EditIcon
                className="btn-icon"
                color="primary"
                onClick={() => {
                  setQuiz(quiz);
                  setOpenUpdateQuiz(true);
                }}
              />
              <DeleteIcon
                className="btn-icon"
                color="error"
                onClick={() => {
                  setQuiz(quiz);
                  setShowModalDelete(true);
                }}
              />
            </Box>
          </Box>
          <Box>
            {quiz?.answers?.map((answer: Answer, indexAnswer: number) => (
              <Box
                className={`block-answer-list answer-content ${
                  answer?.isCorrect === true ? "answer-success" : ""
                }`}
                key={indexAnswer}
              >
                <TextContent.Label
                  key={indexAnswer}
                  label={`Đáp án ${indexAnswer + 1}: ${answer?.value}`}
                />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
      <HandleQuizItem.UpdateQuizItem
        show={openUpdateQuiz}
        quiz={quiz}
        onClose={() => setOpenUpdateQuiz(false)}
        getQuizLesson={getQuizLesson}
      />
      <HandleQuizItem.DeleteQuizItem
        show={showModalDelete}
        onClose={() => setShowModalDelete(false)}
        onConfirm={handleDeleteQuiz}
      />
    </Box>
  );
};

export default QuizContent;
