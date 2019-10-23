import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { getCurrentUrl } from 'utils/helper'
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
} from 'react-share'

const RightIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
  }
`

function ShareButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleShareButtonClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleShareButtonClose = () => {
    setAnchorEl(null)
  }

  const url = getCurrentUrl()

  return (
    <>
      <RightIconButton
        color="inherit"
        component="span"
        aria-label="Share"
        aria-controls="share-menu"
        aria-haspopup="true"
        onClick={handleShareButtonClick}
      >
        <ShareIcon />
      </RightIconButton>
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleShareButtonClose}
      >
        <MenuItem>
          <FacebookShareButton url={url} children={<FacebookIcon />} />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <TelegramShareButton url={url} children={<TelegramIcon />} />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <WhatsappShareButton url={url} children={<WhatsappIcon />} />
        </MenuItem>
      </Menu>
    </>
  )
}

export default ShareButton
