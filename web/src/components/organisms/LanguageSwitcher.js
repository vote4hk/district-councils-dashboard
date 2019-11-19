import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import styled from 'styled-components'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import LanguageIcon from '@material-ui/icons/Language'
import { useTranslation } from 'react-i18next'
import { fireEvent } from 'utils/ga_fireevent'

const RightIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0;
  }
`

function LanguageSwitcher(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleButtonClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleButtonClose = () => {
    setAnchorEl(null)
  }

  const changeLanguage = lng => {
    var path = window.location.pathname
    if (path.includes('/en/') && lng === 'zh') {
      path = path.replace('/en/', '/zh/')
      window.location.pathname = path
    } else if (path.includes('/zh/') && lng === 'en') {
      path = path.replace('/zh/', '/en/')
      window.location.pathname = path
    } else if (!path.includes('/en/') && !path.includes('/zh/')) {
      path = `${lng}${path}`
      window.location.pathname = path
    } else {
      handleButtonClose()
    }
    fireEvent({
      ca: 'language',
      ac: 'click',
      lb: `switch_to_${lng}`,
    })
  }

  const { t } = useTranslation()

  return (
    <>
      <RightIconButton
        color="inherit"
        component="span"
        aria-label="Language Switcher"
        aria-controls="lang-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
      >
        <LanguageIcon />
      </RightIconButton>
      <Menu
        id="lang-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleButtonClose}
      >
        <MenuItem onClick={() => changeLanguage('zh')}>
          {/* 中文 */}
          {t('lang.zh')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>
          {/* English */}
          {t('lang.en')}
        </MenuItem>
      </Menu>
    </>
  )
}

export default LanguageSwitcher
