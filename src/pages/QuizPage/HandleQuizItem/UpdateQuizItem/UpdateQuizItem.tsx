import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import quizApi from "src/apis/quizApi";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import { InputCheckBoxValue } from "src/components/FormControl/InputCheckBox";
import ModalContainer from "src/components/ModalContainer";
import TextContent from "src/components/TextContent";
import { Quiz } from "src/types";
import { notificationMessage } from "src/utils";
import "./styles.scss";

interface IUpdateQuizItemProps {
  show?: boolean;
  quiz: Quiz;
  onClose?: () => void;
  getQuizLesson: () => void;
}
const questionDefault = {
  question: "",
  answers: [{ value: "", checked: false }],
};

const UpdateQuizItem: React.FC<IUpdateQuizItemProps> = ({
  show,
  quiz,
  onClose,
  getQuizLesson,
}) => {
  const [question, setQuestion] = useState<any>();

  useEffect(() => {
    const ques = {
      ...quiz,
      answers: quiz?.answers.map((answer: any, index: number) => ({
        key: index,
        value: answer.value,
        checked: answer.isCorrect,
      })),
    };
    setQuestion(ques);
  }, [quiz]);

  const updateValue = (value: string) => {
    setQuestion({ ...question, question: value });
  };

  const updateListAnswer = (answer: InputCheckBoxValue) => {
    setQuestion({ ...question, answers: [...question?.answers, answer] });
  };

  const updateAnswer = (indexAnswer: number, answer: InputCheckBoxValue) => {
    const updatedAnswers = question?.answers.map(
      (answerState: InputCheckBoxValue, indexAnswerState: number) => {
        if (indexAnswerState === indexAnswer) {
          return answer;
        }
        return answerState;
      }
    );
    setQuestion({ ...question, answers: updatedAnswers });
  };

  const addAnswer = () => {
    const answer: InputCheckBoxValue = { value: "", checked: false };
    if (question?.answers.length > 3) {
      return notificationMessage("warning", "Tối đa 4 câu trả lời");
    }
    return updateListAnswer(answer);
  };

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateValue(value);
  };

  const handleChangeAnswer = (
    indexAnswer: number,
    value: InputCheckBoxValue
  ) => {
    updateAnswer(indexAnswer, value);
  };

  const handleSubmit = async () => {
    try {
      if (!question?.question) return;
      else {
        const params = {
          question: question?.question?.trim(),
          answers: question?.answers?.map((answer: any, index: number) => ({
            key: index,
            value: answer.value?.trim(),
            isCorrect: answer.checked,
          })),
        };
        await quizApi
          .updateQuiz(params, question?._id)
          .then((response: any) => {
            onClose?.();
            getQuizLesson();
            setQuestion(questionDefault);
            return notificationMessage(
              "success",
              "Chỉnh sửa câu hỏi thành công!"
            );
          });
      }
    } catch (error) {
      return notificationMessage(
        "error",
        "Đã có lỗi xảy ra, vui lòng thử lại sau!"
      );
    }
  };

  const renderAnswer = (answers: InputCheckBoxValue[]) => {
    return answers?.map((answer: InputCheckBoxValue, indexAnswer: any) => (
      <FormControl.InputCheckBox
        key={indexAnswer}
        value={answer.value}
        checked={answer.checked}
        label="Đáp án đúng"
        onChange={(value: any) => handleChangeAnswer(indexAnswer, value)}
      />
    ));
  };

  return (
    <ModalContainer title={`Chỉnh sửa câu hỏi`} open={show} onClose={onClose}>
      <Box className="modal-content-question">
        <Box
          className="block-question"
          display="flex"
          flexDirection="column"
          gap={15}
        >
          <TextContent.Label label={`Câu hỏi`} />
          <FormControl.Input
            required
            label="Nhập tên câu hỏi"
            name="quiz"
            value={question?.question}
            onChange={(e: any) => handleChangeQuestion(e)}
          />
          <Divider />
          <BoxContent.NormalContent style={{ padding: 0, gap: 10 }}>
            <Box className="block-answer">
              <TextContent.Label label="Câu trả lời" required />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => addAnswer()}
              >
                Thêm 1 đáp án mới
              </Button>
            </Box>
            {renderAnswer(question?.answers)}
          </BoxContent.NormalContent>
        </Box>
      </Box>
      <Box className="block-action">
        <Button variant="contained" color="info" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default UpdateQuizItem;
