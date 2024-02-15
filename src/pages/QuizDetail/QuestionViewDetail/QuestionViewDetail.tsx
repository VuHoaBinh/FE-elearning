import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import TextContent from "src/components/TextContent";
import { selectAuthorization } from "src/reducers";
import { ROLE } from "src/types";
import "./styles.scss";

interface IQuestionViewDetailProps {
  questionNumber: number;
  lastQuestionNumber: number;
  activeQuestion: any;
  chooseAnswer: (idQuestion: string, idAnswer: string, answer: any) => void;
  backQuestion: () => void;
  nextQuestion: () => void;
}

const QuestionViewDetail: React.FC<IQuestionViewDetailProps> = (
  props: IQuestionViewDetailProps
) => {
  const {
    questionNumber,
    lastQuestionNumber,
    activeQuestion,
    chooseAnswer,
    backQuestion,
    nextQuestion,
  } = props;
  const { isRole } = useSelector(selectAuthorization);
  const handleChooseAnswer = (answer: any) => {
    chooseAnswer(activeQuestion._id, answer?._id, answer);
  };

  return (
    <Box className="block-view-quiz">
      <Box className="content-quiz">
        <Box className="title-question">
          <TextContent.Label
            label={`Câu ${questionNumber + 1}: ${activeQuestion?.question}`}
          />
        </Box>
        <Box style={{ display: "flex", flexDirection: "column" }}>
          {activeQuestion?.answers?.map((answer: any, index: number) => {
            if (isRole === ROLE.STUDENT) {
              return (
                <FormControlLabel
                  className="block-answer-list answer-content"
                  label={`Đáp án ${index + 1}: ${answer?.value}`}
                  key={index}
                  control={
                    <Checkbox
                      checked={answer?.checked}
                      onChange={() => handleChooseAnswer(answer)}
                    />
                  }
                />
              );
            } else
              return (
                <Box
                  className={`block-answer-list answer-content ${
                    answer?.isCorrect === true ? "answer-success" : ""
                  }`}
                  key={index}
                >
                  <TextContent.Label
                    key={index}
                    label={`Đáp án ${index + 1}: ${answer?.value}`}
                  />
                </Box>
              );
          })}
        </Box>
      </Box>
      <Box className="footer-question">
        <Box
          className={`footer-action-question ${
            questionNumber === 0 ? "display-none-action" : ""
          }`}
          onClick={backQuestion}
        >
          <ArrowBackIosNewIcon className="footer-action-icon" />
          <TextContent.Label label="Back" />
        </Box>
        <Box
          className={`footer-action-question ${
            questionNumber === lastQuestionNumber - 1
              ? "display-none-action"
              : ""
          }`}
          onClick={nextQuestion}
        >
          <TextContent.Label label="Next" />
          <ArrowForwardIosIcon className="footer-action-icon" />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionViewDetail;
