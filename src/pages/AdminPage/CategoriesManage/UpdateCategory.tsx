import { Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import categoryApi from "src/apis/categoryApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { categoryTypes, statusTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers";
import { ICategory } from "src/types";

import * as Yup from "yup";

interface UpdateCategoryProps {
  id: string | number;
  isUpdate: (status: boolean) => void;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const UpdateCategory: React.FC<UpdateCategoryProps> = ({
  id,
  setShow,
  isUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [categoryDetail, setCategoryDetail] = useState<ICategory>({});

  useEffect(() => {
    id && getCategoryDetail(id);
  }, [id]);

  const getCategoryDetail = async (id: any) => {
    try {
      const response = await categoryApi.getCategoryDetail(id);
      console.log("áádasd", response);
      const { category }: any = response;
      setCategoryDetail(category);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleUpdateCategory = async (values: any) => {
    isUpdate?.(false);
    dispatch(isPending());

    try {
      await categoryApi.updateCategory(id, values);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Cập nhật thông tin danh mục thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Cập nhật thông tin danh mục thất bại", {
        position: "bottom-right",
      });
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryDetail.name,
      publish: categoryDetail.publish,
      isPending: categoryDetail.isPending,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Tên danh mục không được để trống"),
    }),
    onSubmit: async (values) => {
      console.log("lấy được dữ liệu là", values);
      handleUpdateCategory(values);
    },
  });

  const resetForm = () => {
    formik.resetForm({
      values: {
        name: categoryDetail.name,
        publish: categoryDetail.publish,
        isPending: categoryDetail.isPending,
      },
    });
  };

  return (
    <ModalContainer
      title="Cập nhật thông tin danh mục"
      open={show}
      onClose={() => {
        onClose?.();
        setTimeout(() => resetForm(), 200);
      }}
    >
      <form id="update-account" onSubmit={formik.handleSubmit}>
        <FormControl.Input
          label="Tên danh mục"
          placeholder="Nhập tên danh mục"
          errorMessage={formik.touched.name ? formik.errors.name : ""}
          {...formik.getFieldProps("name")}
        />

        <FormControl.InputSelect
          label="Xuất bản"
          list={statusTypes}
          defaultValue={formik.values.publish}
          errorMessage={formik.touched.publish ? formik.errors.publish : ""}
          {...formik.getFieldProps("publish")}
        />
        <FormControl.InputSelect
          label="Trạng thái"
          list={categoryTypes}
          defaultValue={formik.values.isPending?.toString()}
          errorMessage={formik.touched.isPending ? formik.errors.isPending : ""}
          {...formik.getFieldProps("isPending")}
        />
      </form>
      <Button
        form="update-account"
        type="submit"
        variant="contained"
        color="warning"
      >
        Cập nhật thông tin
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

export default UpdateCategory;
