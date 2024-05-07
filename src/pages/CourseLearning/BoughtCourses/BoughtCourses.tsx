import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import myCourseApi from 'src/apis/myCourseApi'
import FormControl from 'src/components/FormControl'
import LoadingContent from 'src/components/LoadingContent'
import Pagination from 'src/components/Pagination'
import { myCourseTypes } from 'src/data'
import { ICourse, IMyCourse } from 'src/types'
import formatCharacter from 'src/utils/formatCharacter'
import BoughtCourseItem from './BoughtCourseItem'
import './BoughtCourses.scss'

export default function BoughtCourses() {
  document.title = 'Khoá học của tôi'

  const [courses, setCourses] = useState<ICourse[]>([])
  const [sort, setSort] = useState<any>('progress-desc')

  const [isUpdateComplete, setIsUpdateComplete] = useState<boolean>(false)

  const limit = 6
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState<number>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isUpdateComplete) {
      getMyCourse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateComplete])

  useEffect(() => {
    getMyCourse()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort, limit])

  const getMyCourse = async () => {
    setIsLoading(true)
    const params = { limit, page, sort }
    try {
      const response = await myCourseApi.getMyCourse(params)
      // console.log("ádadas", response);
      const { myCourses, total }: any = response
      // console.log("myCourses", myCourses, total);
      setIsLoading(false)
      setCourses(myCourses)
      setTotal(formatCharacter.numberRound(total / limit))
    } catch (error) {
      setIsLoading(false)
      console.log('lỗi rồi', { error })
    }
  }

  const renderMyCourses = (courses: IMyCourse[]) => {
    if (courses.length > 0) {
      return courses.map((course, index) => (
        <BoughtCourseItem
          isUpdate={(status) => setIsUpdateComplete(status)}
          courseInfo={course}
          key={index}
        />
      ))
    }
    return <div className="not-my-course">Bạn hiện tại chưa mua khóa học nào</div>
  }

  return (
    <div className="my-course">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <h3>Danh sách khoá học của tôi</h3>
        <FormControl.InputSelect
          defaultValue={sort}
          list={myCourseTypes}
          onChange={(status) => setSort(status)}
        />
      </Box>
      <div className="my-course-content">
        {!isLoading ? renderMyCourses(courses) : <LoadingContent.Loading />}
      </div>
      <div className="my-course-pagination">
        <Pagination
          pageActive={page}
          total={total}
          onChangeValue={(value: any) => setPage(value)}
        />
      </div>
    </div>
  )
}
