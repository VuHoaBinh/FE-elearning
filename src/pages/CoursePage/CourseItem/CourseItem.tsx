import { Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useHover } from 'src/hooks'
import { ICourse } from 'src/types'
import CourseModal from '../CourseModal'
import './CourseItem.scss'

interface CourseItemProps {
  courseInfo: ICourse
}
const CourseItem: React.FC<CourseItemProps> = ({ courseInfo }) => {
  const navigate = useNavigate()

  const { nodeRef, show } = useHover()

  return (
    <div className="course-item">
      <div className="img" ref={nodeRef}>
        <img
          src={courseInfo.thumbnail}
          alt="img"
          onClick={() => navigate(`/courses/${courseInfo.slug}`)}
        />
        {show && <CourseModal course={courseInfo} />}
      </div>
      <div className="content">
        <Tooltip title={courseInfo.name || ''}>
          <span className="name">{courseInfo.name}</span>
        </Tooltip>
      </div>
    </div>
  )
}

export default CourseItem
