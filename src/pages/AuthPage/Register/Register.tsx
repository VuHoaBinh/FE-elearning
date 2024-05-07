import { Box, Button, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authApi from "src/apis/authApi";
import FormControl from "src/components/FormControl";
import { isPending, isSuccess } from "src/reducers";
import { IRegister } from "src/types";
import { notificationMessage } from "src/utils";
import isVerifyCharacter from "src/utils/isVerifyCharacter";
import regexCharacter from "src/utils/regexCharacter";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      verifyCode: "",
      password: "",
      // passwordConfirm: "",
      // birthday: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
      email: Yup.string()
        .email("Phải là email")
        .required("Vui lòng nhập gmail"),

      verifyCode: Yup.string().required("Vui lòng nhập mã xác thực"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
      // passwordConfirm: Yup.string()
      //   .min(8, "Mật khẩu ít nhất 8 kí tự")
      //   .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng nhau"),
      phone: Yup.string().matches(
        regexCharacter.phoneRegExp,
        "Nhập đúng số điện thoại"
      ),
    }),
    onSubmit: (values) => {
      // console.log("lấy được dữ liệu là", values);
      postRegister(values);
    },
  });

  const handleVerifyEmail = () => {
    if (!isVerifyCharacter.isEmail(formik.values.email)) {
      notificationMessage(
        "warning",
        "Địa chỉ email không hợp lệ, xin vui lòng nhập lại"
      );
    } else {
      notificationMessage("success", "Đang tiến hành gửi email");
      verifyEmail(formik.values.email);
    }
  };

  const verifyEmail = async (email: string) => {
    dispatch(isPending());
    const params = { email: email };
    try {
      const response = await authApi.postVerifyEmailRegister(params);
      // console.log(response);
      const { message }: any = response;
      dispatch(isSuccess());
      notificationMessage("success", message + ". Vui lòng kiểm tra thử email");
    } catch (error) {
      notificationMessage("error", error as string);
      dispatch(isSuccess());
    }
  };

  const postRegister = async (params: IRegister) => {
    dispatch(isPending());
    try {
      await authApi.postRegister(params);
      dispatch(isSuccess());

      notificationMessage(
        "success",
        "Tạo tài khoản thành công, quay lại đăng nhập"
      );
      navigate("/login");
    } catch (error) {
      notificationMessage("error", error as string);
      dispatch(isSuccess());
    }
  };

  return (
    <AuthLayout title="Đăng ký tài khoản">
      <Box
        id="register-form"
        className="register-form"
        display="flex"
        flexDirection="row"
        gap={30}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Box flex={1} display="flex" flexDirection="column" gap={20}>
          <FormControl.Input
            required
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            errorMessage={formik.touched.email ? formik.errors.email : ""}
            {...formik.getFieldProps("email")}
          />
          <Box display="flex" flexDirection="row" gap={5} alignItems="flex-end">
            <FormControl.Input
              style={{ flex: 1 }}
              required
              label="Mã xác nhận email"
              placeholder="Nhập mã xác nhận"
              errorMessage={
                formik.touched.verifyCode ? formik.errors.verifyCode : ""
              }
              {...formik.getFieldProps("verifyCode")}
            />
            <Tooltip title="Nhận mã xác thực gmail">
              <Button
                variant="contained"
                // endIcon={<SendIcon />}
                onClick={handleVerifyEmail}
              >
                Gửi mã
              </Button>
            </Tooltip>
          </Box>

          <FormControl.Input
            required
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            errorMessage={formik.touched.password ? formik.errors.password : ""}
            {...formik.getFieldProps("password")}
          />
        </Box>

        <Box flex={1} display="flex" flexDirection="column" gap={20}>
          <FormControl.Input
            required
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            errorMessage={formik.touched.fullName ? formik.errors.fullName : ""}
            {...formik.getFieldProps("fullName")}
          />
          <FormControl.Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            errorMessage={formik.touched.phone ? formik.errors.phone : ""}
            {...formik.getFieldProps("phone")}
          />
        </Box>
      </Box>
      <Button
        form="register-form"
        type="submit"
        variant="contained"
        color="success"
        sx={{ marginTop: 2, width: "100%" }}
      >
        Đăng ký tài khoản
      </Button>
      <div className="extra-links">
        <Link className="login" to="/login">
          <i className="fa-solid fa-arrow-left"></i> Quay lại
        </Link>
      </div>
    </AuthLayout>
  );
};
export default Register;
