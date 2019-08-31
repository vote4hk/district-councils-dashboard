import React from 'react'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Divider from '@material-ui/core/Divider'
import { UnstyledLink } from 'components/atoms/UnstyledLink'
import { Typography } from '@material-ui/core'

const StyledFooter = styled(Box)`
  && {
    border-top: 1px rgba(0, 0, 0, 0.12) solid;
    margin: 16px 16px 0;
    padding: 16px 0;
  }
`

const StyledDivider = styled(Divider)`
  && {
    margin: 16px 0;
  }
`

const StyledFooterLink = styled(UnstyledLink)`
  && {
    color: rgba(0, 0, 0, 0.87);
  }
`

function Footer(props) {
  return (
    <>
      <StyledFooter>
        <Typography variant="body2" gutterBottom>
          本網站所刊載資訊全為公開資料，歸納自選舉管理委員會丶選舉事務處丶政府統計處丶各區區議會網站及
          <a href="https://github.com/initiummedia/hk_district_council_election">
            端傳媒
          </a>
          ，刊載前已盡力確保資料真確性，如有建議或錯漏，請按下方連結回報。
        </Typography>
        <Typography variant="body2">
          本網站與任何2019年區議會選舉候選人或其助選成員無關，刊載資料目的非為促使或阻礙任何候選人在選舉中當選。
        </Typography>
        <StyledDivider />
        <Box display="flex" alignContent="flex-start">
          <Box pr={3}>
            <StyledFooterLink
              target="_blank"
              href="https://www.facebook.com/g0vhk.io"
            >
              關於g0vhk.io
            </StyledFooterLink>
          </Box>
          <Box pr={3}>
            <StyledFooterLink
              target="_blank"
              href="https://forms.gle/irD6tEznWPNda6w59"
            >
              反映意見
            </StyledFooterLink>
          </Box>
          <Box>
            <StyledFooterLink
              target="_blank"
              href="https://github.com/cswbrian/district-councils-dashboard"
            >
              GitHub
            </StyledFooterLink>
          </Box>
        </Box>
      </StyledFooter>
    </>
  )
}

export default Footer
