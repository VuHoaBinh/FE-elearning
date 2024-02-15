import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import teacherApi from "src/apis/teacherApi";
import BoxContent from "src/components/BoxContent";
import TextContent from "src/components/TextContent";
import { selectAuthorization } from "src/reducers";
import { IUser } from "src/types";
import UpdateBankingCard from "./UpdateBankingCard";

const TeacherInfo: React.FC = () => {
  document.title = "Thông tin thẻ ngân hàng";

  const { userInfo } = useSelector(selectAuthorization);

  const [teacherInfo, setTeacherInfo] = useState<IUser>();

  const [showUpdateBanking, setShowUpdateBanking] = useState<boolean>(false);
  const [isUpdateBankingCompleted, setIsUpdateBankingCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    getTeacherInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isUpdateBankingCompleted) {
      getTeacherInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo._id, isUpdateBankingCompleted]);

  const getTeacherInfo = async () => {
    // console.log("id là", userInfo._id);

    try {
      const response = await teacherApi.getTeacherInfoById(userInfo._id);
      // console.log("response", response);
      const { user }: any = response;
      // console.log("user", user);
      setTeacherInfo(user);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" gap={30}>
        <TextContent.NormalText content="Thông tin tài khoản ngân hàng" />

        <BoxContent.BoxShadow>
          <BoxContent.ContentInfo
            type="fit-content"
            responsive={false}
            title="Mã số tài khoản: "
            content={teacherInfo?.teacher?.payments?.accountNumber}
          />

          <BoxContent.ContentInfo
            type="fit-content"
            responsive={false}
            title="Tên ngân hàng: "
            content={teacherInfo?.teacher?.payments?.bankName}
          />

          <BoxContent.ContentInfo
            type="fit-content"
            responsive={false}
            title="Tên chủ sở hữu: "
            content={teacherInfo?.teacher?.payments?.name}
          />
        </BoxContent.BoxShadow>

        <Button variant="contained" onClick={() => setShowUpdateBanking(true)}>
          Cập nhật thông tin tài khoản ngân hàng
        </Button>
      </Box>

      <UpdateBankingCard
        bankingCard={teacherInfo?.teacher?.payments}
        id={teacherInfo?._id}
        show={showUpdateBanking}
        isUpdate={(status) => setIsUpdateBankingCompleted(status)}
        onClose={() => setShowUpdateBanking(false)}
        setShow={setShowUpdateBanking}
      />
    </React.Fragment>
  );
};

export default TeacherInfo;
