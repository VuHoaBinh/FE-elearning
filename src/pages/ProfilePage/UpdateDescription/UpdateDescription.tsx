import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import teacherApi from "src/apis/teacherApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import TextContent from "src/components/TextContent";
import { isPending, isSuccess } from "src/reducers";
import { notificationMessage } from "src/utils";

interface UpdateDescriptionProps {
  id?: string;
  slug?: string;
  show?: boolean;
  value?: string;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const UpdateDescription: React.FC<UpdateDescriptionProps> = ({
  id,
  slug,
  onClose,
  value,
  show,
  setShow,
}) => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState<string>();

  useEffect(() => {
    setDescription(value);
  }, [value]);

  const handleUpdateDescription = async () => {
    dispatch(isPending());
    setShow?.(true);
    try {
      await teacherApi.updateTeacherInfoById(id, { description });

      notificationMessage("success", "Cập nhật thông tin mô tả thành công");
    } catch (error) {
      console.log("lỗi rồi", { error });
      notificationMessage(
        "warning",
        "Cập nhật thông tin mô tả thất bại, hãy thử lại sau"
      );
    }
    setShow?.(false);
    dispatch(isSuccess());
  };

  return (
    <ModalContainer
      title="Tiến hành mô tả thông tin cá nhân"
      open={show}
      onClose={onClose}
    >
      <Box display="flex" flexDirection="column" gap={16}>
        <TextContent.Label label="Thông tin mô tả cá nhân" required />
        <FormControl.FormEditor
          value={description}
          placeholder="Nhập nội dung mô tả thông tin cá nhân."
          onChange={setDescription}
        />
        <Button variant="contained" onClick={handleUpdateDescription}>
          Cập nhật mô tả
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default UpdateDescription;
