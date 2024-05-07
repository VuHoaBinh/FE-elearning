import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface MultiDeleteAccountProps {
  ids: string[] | number[];
  show?: boolean;
  isUpdate: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const MultiDeleteAccount: React.FC<MultiDeleteAccountProps> = ({
  ids,
  setShow,
  isUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleMultiDeleteAccount = async () => {
    const params = { ids };
    isUpdate?.(false);
    dispatch(isPending());
    try {
      await adminApi.deleteMultiUser(params);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(false);
      toast.success("Xoá tài khoản thành công", { position: "bottom-right" });
      window.location.reload();
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Xoá tài khoản thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá những tài khoản này không?"
      open={show}
      onClose={onClose}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={handleMultiDeleteAccount}
      >
        Xoá tài khoản
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={onClose}
        sx={{ marginLeft: 1 }}
      >
        Huỷ bỏ
      </Button>
    </ModalContainer>
  );
};

export default MultiDeleteAccount;
