import { Box, Button, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authApi from "src/apis/authApi";
import FormControl from "src/components/FormControl";
import { isPending, isSuccess } from "src/reducers";
import { IForgotPassword } from "src/types";
import { notificationMessage } from "src/utils";
import isVerifyCharacter from "src/utils/isVerifyCharacter";
import * as Yup from "yup";
import AuthLayout from "../AuthLayout";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      verifyCode: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Phải là email")
        .required("Vui lòng nhập gmail"),

      verifyCode: Yup.string().required("Vui lòng nhập mã xác thực"),
      password: Yup.string()
        .min(8, "Mật khẩu ít nhất 8 kí tự")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: (values) => {
      // console.log("lấy được dữ liệu là", values);
      postForgotPassword(values);
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

    try {
      const response = await authApi.postVerifyEmailForgotPassword({ email });
      // console.log(response);
      const { message }: any = response;
      dispatch(isSuccess());

      notificationMessage("success", message + "Vui lòng kiểm tra thử email");
    } catch (error) {
      toast.error(`${error}`, { position: "bottom-right" });
      notificationMessage("error", error as string);
      dispatch(isSuccess());
    }
  };

  const postForgotPassword = async (params: IForgotPassword) => {
    dispatch(isPending());
    try {
      await authApi.postForgotPassword(params);
      dispatch(isSuccess());

      notificationMessage(
        "success",
        "Lấy lại mật khẩu thành công, quay lại đăng nhập"
      );
      navigate("/login");
    } catch (error) {
      notificationMessage("error", error as string);
      dispatch(isSuccess());
    }
  };

  return (
    <AuthLayout title="Lấy lại mật khẩu">
      <Box
        className="forgot-password-form"
        display="flex"
        flexDirection="column"
        gap={20}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <FormControl.Input
          required
          label="Email"
          placeholder="Nhập địa chỉ gmail"
          errorMessage={formik.touched.email ? formik.errors.email : ""}
          {...formik.getFieldProps("email")}
        />
        <Box display="flex" flexDirection="row" gap={5} alignItems="flex-end">
          <FormControl.Input
            required
            style={{ flex: 1 }}
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

        <Button type="submit" variant="contained" color="error">
          Lấy lại mật khẩu
        </Button>
      </Box>
      <div className="extra-links">
        <Link to="/login">
          <i className="fa-solid fa-arrow-left"></i> Quay lại
        </Link>
      </div>
    </AuthLayout>
  );
};
export default ForgotPassword;
