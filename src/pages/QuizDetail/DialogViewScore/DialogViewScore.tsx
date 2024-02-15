import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import TextContent from "src/components/TextContent";
import "./styles.scss";

interface IDialogViewScoreProps {
  score: number;
  maxScore: number;
  open: boolean;
  onClose: () => void;
}

const DialogViewScore: React.FC<IDialogViewScoreProps> = (
  props: IDialogViewScoreProps
) => {
  const { score, maxScore, open, onClose } = props;
  return (
    <Dialog
      className="dialog-view-score"
      open={open}
      onClose={onClose}
      fullWidth={true}
    >
      <DialogTitle>
        Điểm của bạn là
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextContent.Label label={score.toString()} />{" "}
        <span style={{ fontSize: "45px" }}>/</span>{" "}
        <TextContent.Label label={maxScore.toString()} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogViewScore;
