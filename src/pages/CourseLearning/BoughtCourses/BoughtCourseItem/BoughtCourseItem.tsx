import { Tooltip } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import MediaContent from 'src/components/MediaContent'
import { IMyCourse } from 'src/types'
import formatCharacter from 'src/utils/formatCharacter'
import './BoughtCourseItem.scss'

interface BoughtCourseItemProps {
  courseInfo?: IMyCourse
  isUpdate?: (status: boolean) => void
}

const BoughtCourseItem: React.FC<BoughtCourseItemProps> = ({ courseInfo, isUpdate }) => {
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <div className="my-course-item">
        <div className="course-thumbnail" onClick={() => navigate(`${courseInfo?._id}`)}>
          <MediaContent.Image src={courseInfo?.course?.thumbnail} />
        </div>
        <div className="course-info">
          <Tooltip title={courseInfo?.course?.name || ''}>
            <span className="name" onClick={() => navigate(`/courses/${courseInfo?.course?.slug}`)}>
              {courseInfo?.course?.name}
            </span>
          </Tooltip>
          <span className="author">
            <b>Tác giả: </b>
            {courseInfo?.course?.author?.fullName}
          </span>
          <span
            className={classNames(
              'progress-learning',
              !courseInfo?.percentProgress ? 'nonView' : ''
            )}
          >
            <span className="progress-number">
              {courseInfo?.percentProgress
                ? formatCharacter.numberRound(courseInfo?.percentProgress) + '/100'
                : 'Chưa xem'}
            </span>
            <span
              className="percent"
              style={{
                width: courseInfo?.percentProgress ? `${courseInfo?.percentProgress}%` : 0,
              }}
            ></span>
          </span>
        </div>
      </div>
    </React.Fragment>
  )
}
export default BoughtCourseItem
