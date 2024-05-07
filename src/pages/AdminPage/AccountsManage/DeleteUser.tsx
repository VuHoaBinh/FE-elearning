import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface DeleteAccountProps {
  id: string | number;
  show?: boolean;
  isUpdate: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({
  id,
  setShow,
  isUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const handleDeleteAccount = async () => {
    // console.log("xoá user có id", id);
    isUpdate(false);
    dispatch(isPending());
    try {
      await adminApi.deleteUser(id);
      // const response = await adminApi.deleteUser(id);
      // console.log("check delete3: ",response);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate(true);
      toast.success("Xoá tài khoản thành công ", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Xoá tài khoản thất bại", { position: "bottom-right" });
    }
    window.location.reload();
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá tài khoản này khôngddd?"
      open={show}
      onClose={onClose}
    >
      <Button variant="contained" color="warning" onClick={handleDeleteAccount}>
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

export default DeleteAccount;
