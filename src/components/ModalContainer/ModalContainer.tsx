import { Box, Dialog, Divider, Typography } from "@mui/material";
import * as React from "react";
import MediaContent from "../MediaContent";

interface ModalProps {
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  scroll?: "body" | "paper";
  title?: string;
  open?: boolean;
  onClose?: () => void;
}

const ModalContainer: React.FC<ModalProps> = ({
  children,
  title = "Chưa đặt tên tiêu đề",
  onClose,
  open = false,
  scroll = "body",
  maxWidth = "sm",
}) => {
  const dialogConfig = {
    scroll,
    maxWidth,
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...dialogConfig}
      fullWidth
      // transitionDuration={{ appear: 600, enter: 400, exit: 300 }}
    >
      <Box padding={15}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={20}
        >
          <Typography variant="h6" component="span" fontWeight={600}>
            {title}
          </Typography>
          <MediaContent.Icon
            className="icon"
            icon="close"
            size={20}
            color=""
            onClick={onClose}
            style={{ cursor: "pointer" }}
          />
        </Box>
        <Divider sx={{ marginTop: 12, marginBottom: 12 }} />
        <Box>{children}</Box>
      </Box>
    </Dialog>
  );
};

export default ModalContainer;
