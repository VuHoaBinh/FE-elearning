import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import couponApi from "src/apis/couponApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { discountTypes } from "src/data";
import { isPending, isSuccess } from "src/reducers";
import { ICoupon } from "src/types";
import * as Yup from "yup";

interface UpdateCouponProps {
  id: string | number;
  show?: boolean;
  isUpdate?: (status: boolean) => void;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
}

const UpdateCoupon: React.FC<UpdateCouponProps> = ({
  id,
  setShow,
  isUpdate,
  show = false,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [couponDetail, setCouponDetail] = useState<ICoupon>({});

  useEffect(() => {
    id && getCategoryDetail(id);
  }, [id]);

  const getCategoryDetail = async (id: any) => {
    try {
      const response = await couponApi.getCouponDetail(id);
      // console.log("details laf", response);
      const { coupon }: any = response;
      setCouponDetail(coupon);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const handleUpdateCoupon = async (values: any) => {
    // console.log("values have updated", values);

    dispatch(isPending());
    isUpdate?.(false);
    try {
      await couponApi.updateCoupon(id, values);
      dispatch(isSuccess());
      setShow?.(false);
      isUpdate?.(true);
      toast.success("Cập nhật mã khuyến mãi thành công", {
        position: "bottom-right",
      });
    } catch (error) {
      console.log("lỗi rồi", { error });
      dispatch(isSuccess());
      setShow?.(false);
      toast.warning("Cập nhật mã khuyến mãi thất bại", {
        position: "bottom-right",
      });
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: couponDetail.title,
      type: couponDetail.type,
      amount: couponDetail.amount,
      startDate: couponDetail.startDate,
      expireDate: couponDetail.expireDate,
      maxDiscount: couponDetail.maxDiscount,
      minPrice: couponDetail.minPrice,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Vui lòng nhập tên mã giảm giá"),
      startDate: Yup.string().required("Vui lòng nhập ngày bắt đầu"),
      amount: Yup.number().required("Bắt buộc"),
      expireDate: Yup.string().required("Vui lòng nhập ngày kết thúc"),
    }),
    validate: (values) => {
      let errors = {};
      if (
        values.amount &&
        values.type === "percent" &&
        (values.amount <= 0 || values.amount > 100)
      ) {
        errors = {
          ...errors,
          amount: "Giá trị giảm giá phải lớn hơn 0% và bé hơn bằng 100%",
        };
      }
      if (values.amount && values.type === "money" && values.amount <= 0) {
        errors = {
          ...errors,
          amount: "Giá trị giảm giá phải lớn hơn 0",
        };
      }
      if (values.maxDiscount && values.maxDiscount <= 0) {
        errors = {
          ...errors,
          maxDiscount: "Giá phải lớn hơn 0",
        };
      }
      if (values.minPrice && values.minPrice <= 0) {
        errors = {
          ...errors,
          minPrice: "Giá phải lớn hơn 0",
        };
      }
      if (
        values.startDate &&
        values.expireDate &&
        Date.parse(values.startDate) >= Date.parse(values.expireDate)
      ) {
        errors = {
          ...errors,
          expireDate: "Ngày bắt đầu phải nhỏ hơn ngày hết hạn",
        };
      }
      return errors;
    },
    onSubmit: async (values) => {
      // console.log("lấy được dữ liệu là", values);
      handleUpdateCoupon(values);
    },
  });

  const resetForm = () => {
    formik.resetForm({
      values: {
        title: couponDetail.title,
        type: couponDetail.type,
        amount: couponDetail.amount,
        startDate: couponDetail.startDate,
        expireDate: couponDetail.expireDate,
        maxDiscount: couponDetail.maxDiscount,
        minPrice: couponDetail.minPrice,
      },
    });
  };

  return (
    <ModalContainer
      title="Cập nhật thông tin mã khuyến mãi"
      open={show}
      onClose={() => {
        onClose?.();
        setTimeout(() => resetForm(), 200);
      }}
    >
      <form
        id="update-account"
        onSubmit={formik.handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl.Input
            required
            label="Tên mã giảm giá"
            placeholder="Nhập tên mã giảm giá"
            errorMessage={formik.touched.title ? formik.errors.title : ""}
            {...formik.getFieldProps("title")}
          />
          <FormControl.InputSelect
            required
            label="Đơn vị tính"
            list={discountTypes}
            defaultValue={formik.values.type}
            onChange={(type) => formik.setFieldValue("type", type)}
          />
          <FormControl.Input
            required
            label="Ngày bắt đầu"
            type="datetime-local"
            errorMessage={
              formik.touched.startDate ? formik.errors.startDate : ""
            }
            {...formik.getFieldProps("startDate")}
          />
          <FormControl.Input
            required
            label="Ngày hết hạn"
            type="datetime-local"
            errorMessage={
              formik.touched.expireDate ? formik.errors.expireDate : ""
            }
            {...formik.getFieldProps("expireDate")}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl.Input
            required
            label={`Số lượng giảm ${
              formik.values.type === "percent" ? "(Phần trăm)" : "(VNĐ)"
            }`}
            placeholder="Nhập số lượng giảm"
            errorMessage={formik.touched.amount ? formik.errors.amount : ""}
            {...formik.getFieldProps("amount")}
          />
          <FormControl.Input
            disabled={formik.values.type !== "percent"}
            label="Giảm giá tối đa (VNĐ) - Chỉ dành cho đơn vị tính là %"
            placeholder="Nhập giá tối đa"
            errorMessage={
              formik.touched.maxDiscount ? formik.errors.maxDiscount : ""
            }
            {...formik.getFieldProps("maxDiscount")}
          />
          <FormControl.Input
            label="Giá tối thiểu (VNĐ)"
            placeholder="Nhập giá tối thiểu"
            errorMessage={formik.touched.minPrice ? formik.errors.minPrice : ""}
            {...formik.getFieldProps("minPrice")}
          />
        </Box>
      </form>
      <Button
        form="update-account"
        type="submit"
        variant="contained"
        color="warning"
      >
        Cập nhật mã khuyến mãi
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

export default UpdateCoupon;
