import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { linkUserProfile } from 'src/data'
import AccountPopover from '../AccountPopover'
import BoxContent from '../BoxContent'
import TextContent from '../TextContent'

const HeaderNavigationStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 0,
  padding: '0 24px',
  background: 'white',
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: 3,
}

interface NavigationHeaderProps {
  title?: string
  turnPreviousPage?: boolean
  userAction?: boolean
}

export default function NavigationHeader(props: NavigationHeaderProps) {
  const { title, userAction = true, turnPreviousPage = true } = props

  const navigate = useNavigate()

  return (
    <BoxContent.BoxShadow shadow="type2" style={HeaderNavigationStyle}>
      <Box flex={1} display="flex" gap={20} padding="12px 0">
        {turnPreviousPage && (
          <span onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i> <></>
            <TextContent.NormalText content="Quay lại" style={{ cursor: 'pointer' }} />
          </span>
        )}
        {title && (
          <TextContent.NormalText content={title} style={{ userSelect: 'none', color: 'green' }} />
        )}
      </Box>
      {userAction && (
        <Box className="user-actions" display="flex" alignItems="center">
          <AccountPopover routes={linkUserProfile} />
        </Box>
      )}
    </BoxContent.BoxShadow>
  )
}
