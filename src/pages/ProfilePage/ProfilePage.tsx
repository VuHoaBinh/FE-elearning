import { Avatar, Box } from '@mui/material'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import userApi from 'src/apis/userApi'
import BoxContent from 'src/components/BoxContent'
import LoadingContent from 'src/components/LoadingContent'
import TextContent from 'src/components/TextContent'
import { IUser } from 'src/types'
import formatDate from 'src/utils/formatDate'
import isVerifyCharacter from 'src/utils/isVerifyCharacter'
import translateVi from 'src/utils/translateVi'
import UpdatePassword from './UpdatePassword'
import UpdateProfile from './UpdateProfile'

const ProfilePage = () => {
  document.title = 'Thông tin chi tiết cá nhân'

  const [info, setInfo] = useState<IUser>({})
  const [isUpdate, setIsUpdate] = useState<boolean>(true)

  useEffect(() => {
    isUpdate && getMyInformation()
  }, [isUpdate])

  const getMyInformation = async () => {
    try {
      const response = await userApi.getMe()
      const { user }: any = response

      // console.log(user);

      setInfo(user)
    } catch (error) {
      console.log('lỗi r', { error })
    }
  }

  if (_.isEmpty(info)) {
    return <LoadingContent.Loading />
  }

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" gap={16}>
        <TextContent.NormalText content="Thông tin chi tiết cá nhân" />
        <Box
          className="profile-page-info"
          display="flex"
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
          gap={20}
        >
          <Avatar alt={info.fullName} src={info.avatar} sx={{ width: 120, height: 120 }} />

          <BoxContent.NormalContent style={{ gap: 10 }}>
            <BoxContent.ContentInfo title="Tên:" content={info.fullName} />
            <BoxContent.ContentInfo title="Chức vụ:" content={translateVi(info.account?.role)} />
            <BoxContent.ContentInfo title="Email:" content={info.account?.email} />
            <BoxContent.ContentInfo
              title="Giới tính: "
              content={isVerifyCharacter.isGender(info.gender)}
            />
            <BoxContent.ContentInfo title="Số điện thoại: " content={info.phone} />
            <BoxContent.ContentInfo
              title="Ngày sinh: "
              content={formatDate.getDate(info.birthday, 'dd-MM-yyyy')}
            />
          </BoxContent.NormalContent>
        </Box>

        <Box display="flex" gap={8}>
          <UpdateProfile data={info} onUpdate={(status) => setIsUpdate(status)} />
          <UpdatePassword />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default ProfilePage
