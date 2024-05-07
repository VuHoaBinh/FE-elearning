import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch } from "react-redux";
import { getPanelActive } from "src/reducers";
import { ChaptersProps } from "src/types";
import CourseChapterLesson from "../CourseChapterLesson";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(() => ({
  gap: 4,
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "&.panel-active": {
    background: "rgb(99, 99, 99)",
    color: " rgb(255, 255, 255)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface CourseChaptersProps {
  height?: number;
  width?: number;
  chapters?: ChaptersProps;
  index?: number;
  panelActive?: string;
  // onPanelActive?: (index: string | number | boolean) => void;
}

const CourseChapters: React.FC<CourseChaptersProps> = ({
  height,
  width,
  chapters,
  index = 0,
  // onPanelActive,
  panelActive,
}) => {
  // console.log("áddas", chapters);

  const dispatch = useDispatch();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      // onPanelActive?.(newExpanded ? panel : false);
      dispatch(getPanelActive(newExpanded ? panel : false));
    };

  return (
    <React.Fragment>
      <Accordion
        expanded={panelActive === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
        style={{ height, width }}
      >
        <AccordionSummary
          className={panelActive === `panel${index}` ? "panel-active" : ""}
        >
          <Typography style={{ textTransform: "capitalize" }}>
            <b>Chương {index + 1}: </b>
            {chapters?.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <CourseChapterLesson
            chapterNumber={index}
            lessons={chapters?.lessons}
          />
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default CourseChapters;
