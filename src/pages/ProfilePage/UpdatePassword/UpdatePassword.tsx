import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers";
import { IUpdatePassword } from "src/types";
import * as Yup from "yup";

const UpdatePassword = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu hiện tại"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")

        .required("Vui lòng nhập mật khẩu mới"),

      passwordConfirm: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .oneOf(
          [Yup.ref("password"), null],
          "Mật khẩu xác nhận không giống với mật khẩu mới"
        )
        .required("Vui lòng nhập mật khẩu xác nhận"),
    }),
    validate: (values) => {
      let errors = {};
      if (
        values.oldPassword &&
        values.password &&
        values.oldPassword === values.password
      ) {
        errors = {
          ...errors,
          password: "Mật khẩu mới không được đặt giống với mật khẩu cũ",
        };
      }
      return errors;
    },
    onSubmit: async (values) => {
      await changePassword(values);
      resetDataForm();
    },
  });

  const changePassword = async (values: IUpdatePassword) => {
    const passwordInfo = Object.assign({
      oldPassword: values.oldPassword,
      password: values.password,
    });

    dispatch(isPending());

    try {
      await authApi.postUpdatePassword(passwordInfo);
      dispatch(isSuccess());
      toast.success("Thay đổi mật khẩu thành công", {
        position: "bottom-right",
      });
      setShowModal(false);
    } catch (error) {
      console.log("lỗi rồi", { error });
      toast.warning(`${error}`, { position: "bottom-right" });
      dispatch(isSuccess());
    }
  };

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        oldPassword: "",
        password: "",
        passwordConfirm: "",
      },
    });
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="warning"
        onClick={() => setShowModal(true)}
      >
        Đổi mật khẩu
      </Button>
      <ModalContainer
        title="Thay đổi mật khẩu"
        open={showModal}
        onClose={() => {
          resetDataForm();
          setShowModal(false);
        }}
      >
        <Box
          component="form"
          display="flex"
          flexDirection="column"
          rowGap={12}
          onSubmit={formik.handleSubmit}
        >
          <FormControl.Input
            label="Nhập mật khẩu hiện tại"
            type="password"
            errorMessage={
              formik.touched.oldPassword ? formik.errors.oldPassword : ""
            }
            {...formik.getFieldProps("oldPassword")}
          />
          <FormControl.Input
            label="Nhập mật khẩu mới"
            type="password"
            errorMessage={formik.touched.password ? formik.errors.password : ""}
            {...formik.getFieldProps("password")}
          />
          <FormControl.Input
            label="Xác nhận lại mật khẩu mới"
            type="password"
            errorMessage={
              formik.touched.passwordConfirm
                ? formik.errors.passwordConfirm
                : ""
            }
            {...formik.getFieldProps("passwordConfirm")}
          />

          <Button type="submit" variant="contained" color="warning">
            Đổi mật khẩu
          </Button>
        </Box>
      </ModalContainer>
    </React.Fragment>
  );
};

export default UpdatePassword;
