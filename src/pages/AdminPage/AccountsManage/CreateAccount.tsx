import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { accountTypes, genderTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers";
import { ICreateNewUser } from "src/types";
import * as Yup from "yup";

interface CreateAccountProps {
  show?: boolean;
  isUpdate: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  show = false,
  onClose,
  isUpdate,
  setShow,
}) => {
  document.title = "Quản lý người dùng";
  const dispatch = useDispatch();

  useEffect(() => {
    if (!show) {
      resetDataForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const formik = useFormik({
    initialValues: {
      role: "student",
      fullName: "",
      email: "",
      password: "",
      birthday: "",
      gender: "true",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
      email: Yup.string()
        .email("Phải là email")
        .required("Vui lòng nhập gmail"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      // console.log("lấy được dữ liệu là", values);
      await handleCreateAccount(values);
      resetDataForm();
    },
  });

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        role: "student",
        birthday: "",
        email: "",
        fullName: "",
        gender: "true",
        password: "",
        phone: "",
      },
    });
  };

  const handleCreateAccount = async (values: ICreateNewUser) => {
    isUpdate?.(false);
    dispatch(isPending());
    try {
      const response = await adminApi.createNewUser(values);
      console.log(response);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Tạo tài khoản thành công", { position: "bottom-right" });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Tạo tài khoản thất bại", { position: "bottom-right" });
    }
  };

  return (
    <ModalContainer title="Tạo tài khoản mới" open={show} onClose={onClose}>
      <form
        id="create-account"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl.Input
            required
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            errorMessage={formik.touched.fullName ? formik.errors.fullName : ""}
            {...formik.getFieldProps("fullName")}
          />
          <FormControl.Input
            required
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            errorMessage={formik.touched.email ? formik.errors.email : ""}
            {...formik.getFieldProps("email")}
          />
          <FormControl.Input
            required
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            errorMessage={formik.touched.password ? formik.errors.password : ""}
            {...formik.getFieldProps("password")}
          />
          <FormControl.InputSelect
            label="Chức vụ"
            list={accountTypes}
            onChange={(e) => formik.setFieldValue("role", e.target.value)}
            defaultValue={formik.values.role}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl.InputSelect
            label="Giới tính"
            list={genderTypes}
            onChange={(e) =>
              formik.setFieldValue("gender", e.target.value.toString())
            }
            defaultValue={formik.values.gender}
          />
          <FormControl.Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            errorMessage={formik.touched.phone ? formik.errors.phone : ""}
            {...formik.getFieldProps("phone")}
          />
          <FormControl.Input
            type="date"
            label="Ngày sinh nhật"
            {...formik.getFieldProps("birthday")}
          />
        </Box>
      </form>
      <Box sx={{ marginTop: 4 }}>
        <Button
          form="create-account"
          variant="contained"
          color="primary"
          type="submit"
        >
          Tạo tài khoản mới
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

export default CreateAccount;
