import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import adminApi from "src/apis/adminApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { accountTypes, genderTypes, statusTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers";
import { IUser } from "src/types";
import * as Yup from "yup";

interface UpdateAccountProps {
  id: string | number;
  show?: boolean;
  isUpdate: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const UpdateAccount: React.FC<UpdateAccountProps> = ({
  id,
  setShow,
  isUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [userDetail, setUserDetail] = useState<IUser>({});

  useEffect(() => {
    id && getUserDetail(id);
  }, [id]);

  const getUserDetail = async (id: any) => {
    try {
      const response = await adminApi.getUserDetail(id);
      const { user }: any = response;
      setUserDetail(user);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleUpdateAccount = async (values: any) => {
    const { role, birthday, fullName, gender, isActive, password, phone } =
      values;
    isUpdate?.(false);
    dispatch(isPending());
    const params = {
      account: { password: password ? password : null, isActive, role },
      user: { fullName, birthday, gender, phone },
    };
    try {
      await adminApi.updateUserInfo(id, params);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Cập nhật thông tin tài khoản thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Cập nhật thông tin tài khoản thất bại", {
        position: "bottom-right",
      });
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      role: userDetail.account?.role,
      fullName: userDetail.fullName,
      password: "",
      birthday: userDetail.birthday,
      gender: userDetail.gender,
      phone: userDetail.phone,
      isActive: userDetail.account?.isActive,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên"),
      password: Yup.string().min(8, "Mật khẩu ít nhất 8 kí tự"),
      // phone: Yup.string()
      //   .matches(phoneRegExp, "Định dạng số điện thoại sai")
      //   .max(10, "Định dạng số điện thoại sai")
      //   .min(10, "Định dạng số điện thoại sai"),
    }),
    onSubmit: async (values) => {
      // console.log("lấy được dữ liệu là", values);
      handleUpdateAccount(values);
    },
  });

  return (
    <ModalContainer
      title="Cập nhật thông tin tài khoản"
      open={show}
      onClose={onClose}
    >
      <form
        id="update-account"
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
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            value={userDetail.account?.email}
            disabled
          />
          <FormControl.Input
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            errorMessage={formik.touched.fullName ? formik.errors.fullName : ""}
            {...formik.getFieldProps("fullName")}
          />
          <FormControl.Input
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
            onChange={(e) => formik.setFieldValue("gender", e.target.value)}
            defaultValue={formik.values.gender}
          />
          <FormControl.InputSelect
            label="Trạng thái"
            list={statusTypes}
            onChange={(e) => formik.setFieldValue("isActive", e.target.value)}
            defaultValue={formik.values.isActive}
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

export default UpdateAccount;
