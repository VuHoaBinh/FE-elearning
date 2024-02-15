import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import adminApi from "src/apis/adminApi";
import FormControl from "src/components/FormControl";
import ModalContainer from "src/components/ModalContainer";
import { accountTypes, genderTypes, statusTypes } from "src/data";
import { IUser } from "src/types";
import formatDate from "src/utils/formatDate";

interface AccountDetailProps {
  id: string | number;
  show?: boolean;
  onClose?: () => void;
}

const AccountDetail: React.FC<AccountDetailProps> = ({
  id,
  show = false,
  onClose,
}) => {
  const [userDetail, setUserDetail] = useState<IUser>({});

  useEffect(() => {
    id && getUserDetail(id);
  }, [id]);

  const getUserDetail = async (id: any) => {
    try {
      const response = await adminApi.getUserDetail(id);
      const { user }: any = response;
      // console.log(user);

      setUserDetail(user);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <ModalContainer
      title="Xem thông tin chi tiết tài khoản"
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
            value={userDetail.fullName}
            disabled
          />
          <FormControl.InputSelect
            label="Chức vụ"
            list={accountTypes}
            defaultValue={userDetail.account?.role}
            disabled={true}
          />
          <FormControl.Input
            // type="date"
            disabled
            placeholder="ngày-tháng-năm"
            label="Ngày tạo tài khoản"
            value={formatDate.getDate(userDetail.createdAt, "dd-MM-yyyy")}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
          <FormControl.InputSelect
            label="Giới tính"
            list={genderTypes}
            disabled={true}
            defaultValue={userDetail.gender}
          />
          <FormControl.InputSelect
            label="Trạng thái"
            list={statusTypes}
            disabled={true}
            defaultValue={userDetail.account?.isActive}
          />
          <FormControl.Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            disabled
            value={userDetail.phone}
          />
          <FormControl.Input
            // type="date"
            disabled
            label="Ngày sinh nhật"
            placeholder="ngày-tháng-năm"
            value={formatDate.getDate(userDetail.birthday, "dd-MM-yyyy")}
          />
        </Box>
      </form>
    </ModalContainer>
  );
};

export default AccountDetail;
