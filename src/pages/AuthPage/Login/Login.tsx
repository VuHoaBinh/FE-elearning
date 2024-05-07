import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import authApi from "src/apis/authApi";
import FormControl from "src/components/FormControl";
import { getUserInfo, isLogin, isPending, isSuccess } from "src/reducers";
import { Authentication } from "src/types";
import { ILogin } from "src/types/auth";
import { handleLocalStorage, notificationMessage } from "src/utils";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();

  const postLogin = async (data: ILogin) => {
    dispatch(isPending());
    try {
      const response = await authApi.postLogin(data);
      // console.log(response);
      // const { refreshToken, user, role, token }: any = response;
      const { user, role, token }: any = response;

      handleLocalStorage.setLocalStorage(Authentication.accessToken, token);

      //get role,user_info
      dispatch(isLogin(role));
      dispatch(getUserInfo(user));

      notificationMessage("success", "Đăng nhập thành công");
    } catch (error) {
      console.log("lỗi rồi", error);
      notificationMessage("error", error as string);
      dispatch(isSuccess());
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Vui lòng nhập đúng email")
        .required("Vui lòng nhập địa chỉ email"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      // console.log("lấy được dữ liệu là", values);
      postLogin(values);
    },
  });

  return (
    <AuthLayout title="Đăng nhập hệ thống">
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={20}
        onSubmit={formik.handleSubmit}
      >
        <FormControl.Input
          required
          label="Địa chỉ email"
          placeholder="Nhập địa chỉ gmail"
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

        <Button type="submit" variant="contained" className="btn-login">
          Đăng nhập
        </Button>
        <Box display="flex" flexDirection="row" gap={20}>
          <Link className="forgot_password" to="/forgot_password">
            Quên mật khẩu?
          </Link>
        </Box>
      </Box>
      <hr />
      <Box display="flex" flexDirection="row" gap={20}>
        <Link className="register" to="/register">
          Đăng ký tài khoản
        </Link>
      </Box>
    </AuthLayout>
  );
};
export default Login;
