import { Box, Button, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import adminApi from 'src/apis/adminApi'
import FormControl from 'src/components/FormControl'
import ModalContainer from 'src/components/ModalContainer'
import { accountTypes, genderTypes, studentTypes } from 'src/data'
import { isPending, isSuccess } from 'src/reducers'
import { ICourse, ICreateNewUser } from 'src/types'
import * as Yup from 'yup'

interface CreateAccountProps {
  show?: boolean
  isUpdate: (status: boolean) => void
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
  courses?: ICourse[]
  isStudent?: boolean
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  show = false,
  onClose,
  isUpdate,
  setShow,
  courses,
  isStudent = false,
}) => {
  document.title = 'Quản lý người dùng'
  const dispatch = useDispatch()
  const [countProgress, setCountProgress] = useState(1)

  useEffect(() => {
    if (!show) {
      resetDataForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  const handleProgressPaid = (isAdd: boolean = false) => {
    if (isAdd) {
      setCountProgress(prev => prev + 1)
      formik.setFieldValue('progressPaid', Array.from({ length: countProgress + 1 }, () => ({ datePaid: new Date(), amount: 0 })))
      return;
    } 
    setCountProgress(prev => prev - 1)
    formik.setFieldValue('progressPaid', Array.from({ length: countProgress - 1 }, () => ({ datePaid: new Date(), amount: 0 })))
  }

  const coursesType =
    courses?.map((courses) => ({ name: courses.name!, value: courses._id! })) ?? []

  const formik = useFormik({
    initialValues: {
      role: 'student',
      fullName: '',
      email: '',
      password: '',
      birthday: '',
      gender: 'true',
      phone: '',
      courseId: 'defaultCourseId',
      progressPaid: [{ datePaid: new Date(), amount: 0 }]
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Vui lòng nhập họ tên'),
      email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập gmail').matches(/@gmail.com$/, 'Email phải có định dạng @gmail.com'),
      password: Yup.string().min(8, 'Mật khẩu ít nhất 8 kí tự').required('Vui lòng nhập mật khẩu'),
    }),
    onSubmit: async (values) => {
      console.log("lấy được dữ liệu là: ", values);
      await handleCreateAccount(values)
      resetDataForm()
    },
  })

  const resetDataForm = () => {
    formik.resetForm({
      values: {
        role: 'student',
        birthday: '',
        email: '',
        fullName: '',
        gender: 'true',
        password: '',
        phone: '',
        courseId: '',
        progressPaid: [{ datePaid: new Date(), amount: 0 }],
      },
    })
  }

  const handleCreateAccount = async (values: ICreateNewUser) => {
    isUpdate?.(false)
    dispatch(isPending())
    try {
      await adminApi.createNewUser(values)
      dispatch(isSuccess())
      setShow?.(false)
      isUpdate?.(true)
      toast.success('Tạo tài khoản thành công', { position: 'bottom-right' })
    } catch (error) {
      console.log('lỗi rồi', { error })
      dispatch(isSuccess())
      setShow?.(false)
      toast.warning('Tạo tài khoản thất bại', { position: 'bottom-right' })
    }
  }

  return (
    <ModalContainer title="Tạo tài khoản mới" open={show} onClose={() => {
      resetDataForm()
      setCountProgress(0)
      onClose?.()
    }}>
      <form
        id="create-account"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
        }}
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControl.Input
            required
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            errorMessage={formik.touched.fullName ? formik.errors.fullName : ''}
            {...formik.getFieldProps('fullName')}
          />
          <FormControl.Input
            required
            label="Địa chỉ email"
            placeholder="Nhập địa chỉ email"
            errorMessage={formik.touched.email ? formik.errors.email : ''}
            {...formik.getFieldProps('email')}
          />
          <FormControl.Input
            required
            type="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            errorMessage={formik.touched.password ? formik.errors.password : ''}
            {...formik.getFieldProps('password')}
          />
          <FormControl.InputSelect
            label="Chức vụ"
            list={isStudent ? studentTypes : accountTypes}
            onChange={(e) => {
              formik.setFieldValue('role', e)
            }}
            style={{ border: '1px solid #e2e8f0' }}
            defaultValue={formik.values.role}
          />
          <FormControl.InputSelect
            label="Giới tính"
            list={genderTypes}
            onChange={(e) => formik.setFieldValue('gender', e.target.value.toString())}
            style={{ border: '1px solid #e2e8f0' }}
            defaultValue={formik.values.gender}
          />
          <FormControl.Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            errorMessage={formik.touched.phone ? formik.errors.phone : ''}
            {...formik.getFieldProps('phone')}
          />
          <FormControl.Input
            type="date"
            label="Ngày sinh nhật"
            {...formik.getFieldProps('birthday')}
          />
          {isStudent && (
            <>
              <FormControl.InputSelect
                label="Khóa học"
                list={coursesType}
                onChange={(e) => {
                  formik.setFieldValue('courseId', e)
                }}
                errorMessage={formik.touched.courseId ? formik.errors.courseId : ''}
                style={{ border: '1px solid #e2e8f0' }}
                defaultValue={formik.values.courseId}
              />
              <div style={{ fontWeight: 'bold', margin: '4px 0' }}>Lịch sử học phí</div>
              {formik.values.progressPaid?.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 8 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={item.datePaid}
                        onChange={(value) => {
                          formik.setFieldValue(`progressPaid.${index}.datePaid`, value)
                        }}
                        renderInput={(params) => (
                          <TextField
                            sx={{ border: '1px solid #e2e8f0' }}
                            {...params}
                            helperText={null}
                            size="small"
                          />
                        )}
                      />
                    </LocalizationProvider>
                    <FormControl.Input
                      type="number"
                      placeholder="Số tiền đã đóng"
                      {...formik.getFieldProps(`progressPaid.${index}.amount`)}
                    />
                  </div>
                  {index === formik.values.progressPaid.length - 1 && index > 0 ? <Button variant='contained' onClick={() => handleProgressPaid()}>-</Button> : <Button variant='contained' onClick={() => handleProgressPaid(true)}>+</Button>}
                </div>
              ))}
            </>
          )}
        </Box>
      </form>
      <Box sx={{ marginTop: 4 }}>
        <Button form="create-account" variant="contained" color="primary" type="submit">
          Tạo tài khoản mới
        </Button>
        <Button variant="contained" color="success" onClick={onClose} sx={{ marginLeft: 1 }}>
          Huỷ bỏ
        </Button>
      </Box>
    </ModalContainer>
  )
}

export default CreateAccount
