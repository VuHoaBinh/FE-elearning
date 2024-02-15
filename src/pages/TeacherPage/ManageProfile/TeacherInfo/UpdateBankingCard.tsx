import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import teacherApi from "src/apis/teacherApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { isPending, isSuccess } from "src/reducers";
import { IPayment } from "src/types";
import * as Yup from "yup";

interface UpdateBankingCardProps {
  id: any;
  show?: boolean;
  isUpdate?: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
  bankingCard?: IPayment;
}

const UpdateBankingCard: React.FC<UpdateBankingCardProps> = ({
  id,
  setShow,
  show = false,
  isUpdate,
  onClose,
  bankingCard,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      accountNumber: bankingCard?.accountNumber,
      name: bankingCard?.name,
      bankName: bankingCard?.bankName,
    },
    validationSchema: Yup.object({
      accountNumber: Yup.string().required("Vui lòng nhập mã số tài khoản"),
      name: Yup.string().required("Vui lòng nhập tên chủ sở hữu"),
      bankName: Yup.string().required("Vui lòng nhập tên ngân hàng"),
    }),
    onSubmit: (values) => {
      //   console.log("lấy được value là", values);
      handleUpdateBankingCard(values);
    },
  });
  const handleUpdateBankingCard = async (payments?: any) => {
    // console.log("params là", { payments });
    dispatch(isPending());
    isUpdate?.(false);
    try {
      await teacherApi.updateTeacherInfoById(id, { payments });

      //   console.log("đã lấy đươc thông tin là", response);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Cập nhật thông tin thẻ ngân hàng thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Cập nhật thông tin thẻ ngân hàng thất bại", {
        position: "bottom-right",
      });
    }
  };
  const resetDataForm = () => {
    formik.resetForm({
      values: {
        accountNumber: bankingCard?.accountNumber,
        name: bankingCard?.name,
        bankName: bankingCard?.bankName,
      },
    });
  };
  return (
    <ModalContainer
      title="Cập nhật thông tin tài khoản ngân hàng"
      open={show}
      onClose={() => {
        onClose?.();
        setTimeout(() => resetDataForm(), 100);
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <FormControl.Input
          label="Nhập mã số tài khoản"
          defaultValue={bankingCard?.accountNumber}
          errorMessage={
            formik.touched.accountNumber ? formik.errors.accountNumber : ""
          }
          {...formik.getFieldProps("accountNumber")}
        />
        <FormControl.Input
          defaultValue={bankingCard?.bankName}
          label="Nhập tên ngân hàng"
          errorMessage={formik.touched.bankName ? formik.errors.bankName : ""}
          {...formik.getFieldProps("bankName")}
        />
        <FormControl.Input
          label="Nhập tên chủ sở hữu"
          defaultValue={bankingCard?.name}
          errorMessage={formik.touched.name ? formik.errors.name : ""}
          {...formik.getFieldProps("name")}
        />
        <Box sx={{ marginTop: 3 }}>
          <Button variant="contained" type="submit">
            Cập nhật thông tin thẻ ngân hàng
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
      </form>
    </ModalContainer>
  );
};

export default UpdateBankingCard;
