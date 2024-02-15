import { Box } from "@mui/material";
import TextContent from "src/components/TextContent";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import "./styles.scss";

interface IMiniMapQuestionProps {
  listQuestion: any[];
  activeQuestion: any;
  setActiveQuestion: (item: any) => void;
}

const MiniMapQuestion: React.FC<IMiniMapQuestionProps> = (
  props: IMiniMapQuestionProps
) => {
  const { listQuestion, activeQuestion, setActiveQuestion } = props;

  const handleSetActiveQuestion = (item: any) => {
    setActiveQuestion(item);
  };

  const boxQuestion = (index: number, item: any) => {
    return (
      <Box
        className={`box-question ${
          item?._id === activeQuestion?._id ? "question-active" : ""
        }
          ${
            item?.answers?.some((answer: any) => answer?.checked === true)
              ? "question-answered"
              : ""
          }
        `}
        key={index}
        onClick={() => handleSetActiveQuestion(item)}
      >
        <TextContent.Label label={index.toString()} />
        {item?.answers?.some((answer: any) => answer?.checked === true) && (
          <TaskAltIcon className="btn-icon-checked" color="primary" />
        )}
      </Box>
    );
  };

  return (
    <Box>
      <TextContent.Label label="Danh sách câu hỏi" />
      <Box className="wrapper">
        {listQuestion?.map((item, index) => boxQuestion(index + 1, item))}
      </Box>
    </Box>
  );
};

export default MiniMapQuestion;
