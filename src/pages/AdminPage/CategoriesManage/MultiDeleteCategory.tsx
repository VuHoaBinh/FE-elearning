import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers/authSlice";

interface MultiDeleteCategoryProps {
  slugs: string[] | number[];
  show?: boolean;
  isUpdate: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const MultiDeleteCategory: React.FC<MultiDeleteCategoryProps> = ({
  slugs,
  setShow,
  isUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();

  const handleMultiDeleteCategory = async () => {
    const params = { slugs };
    // console.log("xoá multi", params);
    isUpdate?.(false);
    dispatch(isPending());
    try {
      const response = await categoryApi.deleteMultiCategory(params);
      console.log(response);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Xoá danh mục thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Xoá danh mục thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer
      title="Bạn có chắc muốn xoá những danh mục này không?"
      open={show}
      onClose={onClose}
    >
      <Button
        variant="contained"
        color="warning"
        onClick={handleMultiDeleteCategory}
      >
        Xoá danh mục
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

export default MultiDeleteCategory;
