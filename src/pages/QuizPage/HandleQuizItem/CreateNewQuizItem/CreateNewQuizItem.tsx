import { Button, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import quizApi from "src/apis/quizApi";
import BoxContent from "src/components/BoxContent";
import FormControl from "src/components/FormControl";
import { InputCheckBoxValue } from "src/components/FormControl/InputCheckBox";
import ModalContainer from "src/components/ModalContainer";
import TextContent from "src/components/TextContent";
import { Quiz, Quizzes } from "src/types";
import { notificationMessage } from "src/utils";
import "./styles.scss";

interface CreateNewQuizItemProps {
  show?: boolean;
  isUpdateCompleted?: (status: boolean) => void;
  lessonId: string;
  onClose?: () => void;
  getQuizLesson: () => void;
}

const question = {
  question: "",
  answers: [{ value: "", checked: false }],
};

const CreateNewQuizItem: React.FC<CreateNewQuizItemProps> = ({
  show,
  lessonId,
  onClose,
  getQuizLesson,
}) => {
  const [listQuestion, setListQuestion] = useState<any[]>([question]);

  const updateValue = (indexQuestion: number, value: string) => {
    setListQuestion((prevArray: any) => {
      return prevArray.map((question: any, indexQuestionState: number) => {
        if (indexQuestionState === indexQuestion) {
          return { ...question, question: value };
        }
        return question;
      });
    });
  };

  const updateListAnswer = (
    indexQuestion: number,
    answer: InputCheckBoxValue
  ) => {
    setListQuestion((prevArray: any) => {
      return prevArray.map((question: any, index: number) => {
        if (index === indexQuestion) {
          return { ...question, answers: [...question.answers, answer] };
        }
        return question;
      });
    });
  };

  const updateAnswer = (
    indexQuestion: number,
    indexAnswer: number,
    answer: InputCheckBoxValue
  ) => {
    setListQuestion((prevArray: any) => {
      return prevArray.map((question: any, indexQuestionState: number) => {
        if (indexQuestionState === indexQuestion) {
          const updatedAnswers = question.answers.map(
            (answerState: InputCheckBoxValue, indexAnswerState: number) => {
              if (indexAnswerState === indexAnswer) {
                return answer;
              }
              return answerState;
            }
          );
          return { ...question, answers: updatedAnswers };
        }
        return question;
      });
    });
  };

  const addQuestion = () => {
    setListQuestion([...listQuestion, question]);
  };

  const addAnswer = (indexQuestion: number) => {
    const answer: InputCheckBoxValue = { value: "", checked: false };
    if (listQuestion[indexQuestion]?.answers.length > 3) {
      return notificationMessage("warning", "Tối đa 4 câu trả lời");
    }
    return updateListAnswer(indexQuestion, answer);
  };

  const handleChangeQuestion = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    updateValue(index, value);
  };

  const handleChangeAnswer = (
    indexQuestion: number,
    indexAnswer: number,
    value: InputCheckBoxValue
  ) => {
    updateAnswer(indexQuestion, indexAnswer, value);
  };

  const handleSubmit = async () => {
    try {
      if (!listQuestion[0].question) return;
      else {
        const params: Quizzes = {
          lesson: lessonId,
          quizs: listQuestion?.map((item: Quiz) => ({
            question: item.question?.trim(),
            answers: item.answers?.map((answer: any, index: number) => ({
              key: index,
              value: answer.value?.trim(),
              isCorrect: answer.checked,
            })),
          })),
        };
        await quizApi.createNewQuiz(params).then((response: any) => {
          getQuizLesson();
          onClose?.();
          setListQuestion([question]);
          return notificationMessage("success", "Thêm câu hỏi thành công!");
        });
      }
    } catch (error) {
      return notificationMessage(
        "error",
        "Đã có lỗi xảy ra, vui lòng thử lại sau!"
      );
    }
  };

  const renderAnswer = (
    answers: InputCheckBoxValue[],
    indexQuestion: number
  ) => {
    return answers?.map((answer: InputCheckBoxValue, indexAnswer: any) => (
      <FormControl.InputCheckBox
        key={indexAnswer}
        value={answer.value}
        checked={answer.checked}
        label="Đáp án đúng"
        onChange={(value: any) =>
          handleChangeAnswer(indexQuestion, indexAnswer, value)
        }
      />
    ));
  };

  return (
    <ModalContainer
      title={`Tạo thêm ${listQuestion?.length || 1} câu hỏi mới`}
      open={show}
      onClose={onClose}
    >
      <Box className="modal-content-question">
        {listQuestion?.map((item: any, indexQuestion: number) => (
          <Box
            key={indexQuestion}
            className="block-question"
            display="flex"
            flexDirection="column"
            gap={15}
          >
            <TextContent.Label label={`Câu ${indexQuestion + 1}`} />
            <FormControl.Input
              required
              label="Nhập tên câu hỏi"
              name="quiz"
              value={item.question}
              onChange={(e: any) => handleChangeQuestion(e, indexQuestion)}
            />
            <Divider />
            <BoxContent.NormalContent style={{ padding: 0, gap: 10 }}>
              <Box className="block-answer">
                <TextContent.Label label="Câu trả lời" required />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => addAnswer(indexQuestion)}
                >
                  Thêm 1 đáp án mới
                </Button>
              </Box>
              {renderAnswer(item?.answers, indexQuestion)}
            </BoxContent.NormalContent>
          </Box>
        ))}
      </Box>
      <Box className="block-action">
        <Button variant="contained" color="success" onClick={addQuestion}>
          Tạo câu hỏi mới
        </Button>
        <Button variant="contained" color="info" onClick={handleSubmit}>
          Xác nhận
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default CreateNewQuizItem;
