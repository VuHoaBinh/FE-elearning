import { Box, Button, FormControlLabel, Switch } from '@mui/material'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import courseApi from 'src/apis/courseApi'
import ModalContainer from 'src/components/ModalContainer'
import { isPending, isSuccess } from 'src/reducers/authSlice'

interface AcceptCourseLearningProps {
  id?: string | number
  slug?: string
  show?: boolean
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
}

const AcceptCourseLearning: React.FC<AcceptCourseLearningProps> = ({
  id,
  slug,
  onClose,
  show,
  setShow,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log("value laf", value);

  const [publish, setPublish] = useState<boolean>(true)
  const [content, setContent] = useState<string>('')

  const handleRating = async (e: any) => {
    e.preventDefault()
    // const { content } = e.target;
    if (!publish && !content) {
      toast.warning('Vui lòng nhập lý do từ chối', {
        position: 'bottom-right',
      })
      return
    }
    const params = { publish, content }

    // console.log("slug là", slug);
    // console.log("params truyền là", params);
    dispatch(isPending())
    setShow?.(true)
    try {
      await courseApi.updateCourse(slug, params)
      // console.log("response", response);
      toast.success('Thao tác thành công', { position: 'bottom-right' })
      navigate(-1)
    } catch (error) {
      console.log('lỗi rồi', { error })
      toast.warning('Duyệt khoá học thất bại, hãy thử lại sau', {
        position: 'bottom-right',
      })
    }
    setShow?.(false)
    dispatch(isSuccess())
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("value", event.target.checked);
    setPublish(event.target.checked)
  }

  return (
    <ModalContainer title="Tiến hành xác nhận duyệt khoá học" open={show} onClose={onClose}>
      <form onSubmit={handleRating}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <FormControlLabel
            control={<Switch defaultChecked={publish} onChange={handleChange} />}
            label={!publish ? 'Không duyệt khoá học' : 'Duyệt khoá học'}
          />
          {!publish && (
            <div className="editor">
              <h2>
                Lý do từ chối <span>*</span>
              </h2>
              <ReactQuill
                defaultValue={content}
                theme="snow"
                onChange={(value) => setContent(value)}
                placeholder="Nhập lý do từ chối."
              />
            </div>
          )}
          <Button type="submit" variant="contained" color="warning">
            Xác nhận hoàn tất
          </Button>
        </Box>
      </form>
    </ModalContainer>
  )
}

export default AcceptCourseLearning
