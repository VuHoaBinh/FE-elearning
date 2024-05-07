import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import couponApi from "src/apis/couponApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface MultiDeleteCouponProps {
  ids: string[] | number[];
  show?: boolean;
  isUpdate?: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const MultiDeleteCoupon: React.FC<MultiDeleteCouponProps> = ({
  ids,
  setShow,
  show = false,
  isUpdate,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleMultiDeleteCoupon = async () => {
    const params = { ids };
    isUpdate?.(false);
    dispatch(isPending());
    try {
      await couponApi.multiDeleteCoupon(params);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Xoá mã khuyến mãi thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Xoá mã khuyến mãi thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá những mã khuyến mãi này không?"
      open={show}
      onClose={onClose}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={handleMultiDeleteCoupon}
      >
        Xoá mã khuyến mãi
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

export default MultiDeleteCoupon;
