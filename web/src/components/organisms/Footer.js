import React from 'react'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Divider from '@material-ui/core/Divider'
import { UnstyledLink } from 'components/atoms/Link'
import Columns from 'components/atoms/Columns'
import { withRouter } from 'react-router-dom'
import { Disclaimer } from 'components/templates/Disclaimer'
import { useTranslation } from 'react-i18next'

const StyledFooter = styled(Box)`
  && {
    width: 100%;
    max-width: 1024px;
    margin: auto;
    padding: 16px;
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

const LinkBox = styled(Box)`
  && {
    margin: 8px 16px 8px 0;
    word-break: keep-all;
    overflow: hidden;
  }
`

function Footer(props) {
  const { t } = useTranslation()
  return (
    <>
      <StyledFooter>
        <StyledDivider />
        <Disclaimer />
        <StyledDivider />
        <Columns>
          <LinkBox>
            <StyledFooterLink
              target="_blank"
              href="https://www.facebook.com/g0vhk.io"
            >
              g0vhk.io
            </StyledFooterLink>
          </LinkBox>
          <LinkBox>
            <StyledFooterLink
              onClick={
                () => props.history.push(`/disclaimer`)
                // console.log(props)
              }
            >
              {/* 關於候選人陣營 */}
              {t('footer.link.text1')}
            </StyledFooterLink>
          </LinkBox>
          <LinkBox>
            <StyledFooterLink
              target="_blank"
              href="https://forms.gle/irD6tEznWPNda6w59"
            >
              {/* 反映意見 */}
              //TODO: i18n reuse
              {t('footer.link.text2')}
            </StyledFooterLink>
          </LinkBox>
          <LinkBox>
            <StyledFooterLink
              target="_blank"
              href="https://github.com/cswbrian/district-councils-dashboard"
            >
              GitHub
            </StyledFooterLink>
          </LinkBox>
          <LinkBox>
            <StyledFooterLink target="_blank" href="https://hkfactcheck.io/">
              {/* 選區事實處 */}
              {t('thirdParty.dfo')}
            </StyledFooterLink>
          </LinkBox>
          <LinkBox>
            <div
              className="fb-like"
              data-href="https://dc2019.g0vhk.io"
              data-width=""
              data-layout="standard"
              data-action="like"
              data-size="small"
              data-show-faces="true"
              data-share="true"
            ></div>
          </LinkBox>
        </Columns>
      </StyledFooter>
    </>
  )
}

export default withRouter(Footer)
