import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import CopyIcon from '@material-ui/icons/Link'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { getCurrentUrl } from 'utils/helper'
import { COLORS } from 'ui/theme'
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

const StyledCopyIcon = styled(CopyIcon)`
  && {
    width: 32px;
    height: 32px;
  }
`

const StyledFab = styled(Fab)`
  && {
    margin: 0px;
    top: auto;
    right: 20px;
    bottom: 20px;
    left: auto;
    position: fixed;
    color: ${COLORS.main.background};
  }
`

function getShareUrl(url, platform) {
  return updateUrlParameter(
    updateUrlParameter(url, 'utm_source', platform),
    'utm_medium',
    'social_share'
  )
}

// https://gist.github.com/niyazpk/f8ac616f181f6042d1e0
function updateUrlParameter(uri, key, value) {
  // remove the hash part before operating on the uri
  var i = uri.indexOf('#')
  var hash = i === -1 ? '' : uri.substr(i)
  uri = i === -1 ? uri : uri.substr(0, i)

  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
  var separator = uri.indexOf('?') !== -1 ? '&' : '?'

  if (!value) {
    // remove key-value pair if value is empty
    uri = uri.replace(new RegExp('([?&]?)' + key + '=[^&]*', 'i'), '')
    if (uri.slice(-1) === '?') {
      uri = uri.slice(0, -1)
    }
    // replace first occurrence of & by ? if no ? is present
    if (uri.indexOf('?') === -1) uri = uri.replace(/&/, '?')
  } else if (uri.match(re)) {
    uri = uri.replace(re, '$1' + key + '=' + value + '$2')
  } else {
    uri = uri + separator + key + '=' + value
  }
  return uri + hash
}

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
      <StyledFab
        color="primary"
        aria-label="Share"
        aria-controls="share-menu"
        aria-haspopup="true"
        onClick={handleShareButtonClick}
      >
        <AddIcon />
      </StyledFab>
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleShareButtonClose}
      >
        <MenuItem>
          <FacebookShareButton
            url={getShareUrl(url, 'facebook')}
            children={<FacebookIcon size={32} round={true} />}
          />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <TelegramShareButton
            url={getShareUrl(url, 'telegram')}
            children={<TelegramIcon size={32} round={true} />}
          />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <WhatsappShareButton
            url={getShareUrl(url, 'whatsapp')}
            children={<WhatsappIcon size={32} round={true} />}
          />
        </MenuItem>
        <MenuItem onClick={handleShareButtonClose}>
          <TwitterShareButton
            url={getShareUrl(url, 'twitter')}
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
