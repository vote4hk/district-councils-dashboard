import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import CopyIcon from '@material-ui/icons/Link'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { getCurrentUrl } from 'utils/helper'
import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share'

const RightIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
  }
`

const StyledCopyIcon = styled(CopyIcon)`
  && {
    width: 32px;
    height: 32px;
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
          <FacebookShareButton
            url={`${url}?utm_source=facebook`}
            children={<FacebookIcon size={32} round={true} />}
          />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <TelegramShareButton
            url={`${url}?utm_source=telegram`}
            children={<TelegramIcon size={32} round={true} />}
          />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <WhatsappShareButton
            url={`${url}?utm_source=whatsapp`}
            children={<WhatsappIcon size={32} round={true} />}
          />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <TwitterShareButton
            url={`${url}?utm_source=twitter`}
            children={<TwitterIcon size={32} round={true} />}
          />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <StyledCopyIcon
            onClick={() => {
              navigator.clipboard.writeText(url)
            }}
          />
        </MenuItem>
      </Menu>
    </>
  )
}

export default ShareButton
