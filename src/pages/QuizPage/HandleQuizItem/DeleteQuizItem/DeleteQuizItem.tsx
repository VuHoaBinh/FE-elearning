import { Box, Button } from "@mui/material";
import ModalContainer from "src/components/ModalContainer";
import "./styles.scss";

interface DeleteQuizItemProps {
  show?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}

const DeleteQuizItem: React.FC<DeleteQuizItemProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <ModalContainer
      title="Bạn có chắc xóa câu hỏi này?"
      open={show}
      onClose={onClose}
    >
      <Box className="action-modal-confirm">
        <Button color="inherit" variant="contained" onClick={onClose}>
          Huỷ
        </Button>
        <Button color="success" variant="contained" onClick={onConfirm}>
          Xác Nhận
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default DeleteQuizItem;
