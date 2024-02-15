import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import couponApi from "src/apis/couponApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { discountApplyTypes, discountTypes } from "src/data";
import { ICoupon } from "src/types";

import formatDate from "src/utils/formatDate";

interface CouponDetailProps {
  id: string | number;
  show?: boolean;
  onClose?: () => void;
}

const CouponDetail: React.FC<CouponDetailProps> = ({
  id,
  show = false,
  onClose,
}) => {
  const [couponDetail, setCouponDetail] = useState<ICoupon>({});

  useEffect(() => {
    id && getCategoryDetail(id);
  }, [id]);

  const getCategoryDetail = async (id: any) => {
    try {
      const response = await couponApi.getCouponDetail(id);
      const { coupon }: any = response;
      // console.log("details laf", response);
      setCouponDetail(coupon);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <ModalContainer
      title="Thông tin chi tiết mã giảm giá"
      open={show}
      onClose={onClose}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl.Input
            label="Tên mã giảm giá"
            placeholder="Nhập tên mã giảm giá"
            value={couponDetail.title}
            disabled
          />
          <FormControl.Input
            label="Người tạo"
            placeholder="Nhập tên mã giảm giá"
            value={couponDetail.author?.fullName}
            disabled
          />
          <FormControl.InputSelect
            label="Đơn vị tính"
            list={discountTypes}
            defaultValue={couponDetail.type}
            disabled
          />
          <FormControl.Input
            disabled
            label="Ngày bắt đầu"
            // type="datetime-local"
            value={formatDate.getDate(
              couponDetail.startDate,
              "dd-MM-yyyy HH:mm"
            )}
          />
          <FormControl.Input
            disabled
            label="Ngày hết hạn"
            // type="datetime-local"
            value={formatDate.getDate(
              couponDetail.expireDate,
              "dd-MM-yyyy HH:mm"
            )}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl.InputSelect
            disabled
            label="Phạm vi áp dụng"
            list={discountApplyTypes}
            defaultValue={couponDetail.apply}
          />
          <FormControl.Input
            disabled
            label="Còn lại"
            placeholder="Nhập số lượng giảm"
            value={`${couponDetail.remain}/${couponDetail.number}`}
          />

          <FormControl.Input
            disabled
            label={`Số lượng giảm ${
              couponDetail.type === "percent" ? "(Phần trăm)" : "(VNĐ)"
            }`}
            placeholder="Nhập số lượng giảm"
            value={couponDetail.amount}
          />
          <FormControl.Input
            disabled
            label="Giảm giá tối đa (VNĐ) - Chỉ dành cho đơn vị tính là %"
            placeholder="Nhập giá tối đa"
            value={couponDetail.maxDiscount}
          />
          <FormControl.Input
            disabled
            label="Giá tối thiểu (VNĐ)"
            placeholder="Nhập giá tối thiểu"
            value={couponDetail.minPrice}
          />
        </Box>
      </form>
    </ModalContainer>
  );
};

export default CouponDetail;
