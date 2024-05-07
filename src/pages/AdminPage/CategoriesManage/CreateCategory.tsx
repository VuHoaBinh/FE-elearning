import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers";
import * as Yup from "yup";

interface CreateCategoryProps {
  show?: boolean;
  isUpdate: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const CreateCategory: React.FC<CreateCategoryProps> = ({
  show = false,
  onClose,
  isUpdate,
  setShow,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!show) {
      resetDataForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const formik = useFormik({
    initialValues: { name: "", isPending: false },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên danh mục mới"),
    }),
    onSubmit: async (values) => {
      console.log("lấy được dữ liệu là", values);
      await handleCreateCatergory(values);
      resetDataForm();
    },
  });

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        name: "",
        isPending: false,
      },
    });
  };

  const handleCreateCatergory = async (values: Object) => {
    dispatch(isPending());
    isUpdate?.(false);
    try {
      await categoryApi.createNewCategory(values);
      // console.log(response);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Tạo danh mục thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Tạo danh mục thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer title="Tạo danh mục mới" open={show} onClose={onClose}>
      <form id="create-form" onSubmit={formik.handleSubmit}>
        <FormControl.Input
          required
          label="Tên danh mục"
          placeholder="Nhập tên danh mục"
          errorMessage={formik.touched.name ? formik.errors.name : ""}
          {...formik.getFieldProps("name")}
        />
      </form>
      <Box sx={{ marginTop: 4 }}>
        <Button
          form="create-form"
          variant="contained"
          color="primary"
          type="submit"
        >
          Tạo danh mục mới
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={onClose}
          sx={{ marginLeft: 1 }}
        >
          Huỷ bỏ
        </Button>
      </Box>
    </ModalContainer>
  );
};

export default CreateCategory;
