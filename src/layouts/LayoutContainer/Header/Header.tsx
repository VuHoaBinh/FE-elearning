import { Divider } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AccountPopover from 'src/components/AccountPopover'
import MediaContent from 'src/components/MediaContent'
import { linkHeader, linkUserProfile } from 'src/data'
import { useClickOutSide } from 'src/hooks'
import Logout from 'src/pages/AuthPage/Logout'
import HeaderNavigation from '../HeaderNavigation'
import './Header.scss'

interface HeaderProps {
  titleShow?: boolean
}

const Header: React.FC<HeaderProps> = ({ titleShow = true }) => {
  const navigate = useNavigate()

  const { nodeRef, show, setShow } = useClickOutSide()

  return (
    <React.Fragment>
      {/* for website */}
      <div className="header">
        <div className="header-img" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <p className="header-logoTitle">Trung tâm Anh ngữ Sparkle</p>
        </div>

        <div className="header-links">{titleShow && <HeaderNavigation links={linkHeader} />}</div>
        <div className="header-profile">
          <AccountPopover routes={linkUserProfile} />
        </div>
      </div>
      {/* for mobile */}
      <div className="header-mobile">
        <div className="icon-toggle" ref={nodeRef} onClick={() => setShow(!show)}>
          <MediaContent.Icon icon={!show ? 'align-justify' : 'close'} size={30} />
        </div>

        {show && (
          <div className="header-mobile-links">
            <HeaderNavigation links={linkHeader} />
            <Divider />
            <Logout />
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default Header
