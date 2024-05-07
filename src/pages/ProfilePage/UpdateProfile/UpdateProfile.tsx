import { Box, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import userApi from 'src/apis/userApi'
import FormControl from 'src/components/FormControl'
import ModalContainer from 'src/components/ModalContainer'
import { genderTypes } from 'src/data'
import { getUserInfo, isPending, isSuccess } from 'src/reducers'
import { IUser } from 'src/types'
import handleObject from 'src/utils/handleObject'

interface UpdateProfileProps {
  onUpdate?: (isComplete: boolean) => void
  data: IUser
}
const UpdateProfile: React.FC<UpdateProfileProps> = ({ data, onUpdate }) => {
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  const formik = useFormik({
    initialValues: {
      fullName: data.fullName,
      birthday: data.birthday,
      gender: data.gender,
      phone: data.phone,
      avatar: null,
    },
    onSubmit: (values) => {
      updateProfile(values)
    },
  })

  const updateProfile = async (user_info: IUser) => {
    const formData = handleObject.convertIntoFormData(user_info)

    dispatch(isPending())
    onUpdate?.(false)
    try {
      const response = await userApi.updateInfo(formData)
      const { user }: any = response
      setShowModal(false)
      dispatch(getUserInfo(user))
      toast.success('Cập nhật thông tin thành công', {
        position: 'bottom-right',
      })
      onUpdate?.(true)
    } catch (error) {
      dispatch(isSuccess())
      onUpdate?.(true)
      console.log('lỗi rồi', { error })
    }
  }

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        fullName: data.fullName,
        birthday: data.birthday,
        gender: data.gender,
        phone: data.phone,
        avatar: null,
      },
    })
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          resetDataForm()
          setShowModal(true)
        }}
      >
        Cập nhật
      </Button>

      <ModalContainer
        title="Cập nhật thông tin"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <Box component="form" onSubmit={formik.handleSubmit}>
          <FormControl.InputUploadFile
            label="Ảnh đại diện"
            // multiple
            // value={formik.values.avatar}
            valueDefault={data.avatar}
            onChange={(value) => {
              formik.setFieldValue('avatar', value);
              // console.log("check image: ",value)
              }
            }
          />
          <FormControl.Input label="Họ và tên" {...formik.getFieldProps('fullName')} />
          <FormControl.Input type="date" label="Ngày sinh" {...formik.getFieldProps('birthday')} />
          <FormControl.Input
            label="Số điện thoại"
            {...formik.getFieldProps('phone')}
            // errorMessage={formik.touched.phone ? formik.errors.phone : ""}
          />
          <FormControl.InputSelect
            label="Giới tính"
            list={genderTypes}
            required
            onChange={(gender) => formik.setFieldValue('gender', gender)}
            defaultValue={formik.values.gender}
          />

          <Button type="submit" variant="contained" color="success" sx={{ marginTop: 8 }}>
            Thay đổi thông tin
          </Button>
        </Box>
      </ModalContainer>
    </React.Fragment>
  )
}

export default UpdateProfile
