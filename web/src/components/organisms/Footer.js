import React from 'react'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Divider from '@material-ui/core/Divider'
import { UnstyledLink, DefaultLink } from 'components/atoms/Link'
import Columns from 'components/atoms/Columns'
import { withRouter } from 'react-router-dom'
import { Disclaimer } from 'components/templates/Disclaimer'
import { useTranslation } from 'react-i18next'
import { getCurrentLanguage } from 'utils/helper'

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
  const currentLanguage = getCurrentLanguage()
  if (typeof window.FB !== 'undefined') {
    React.useEffect(() => {
      try {
        window.FB.XFBML.parse()
      } catch (e) {}
    }, [])
  }
  return (
    <>
      <StyledFooter>
        <StyledDivider />
        <Disclaimer />
        <StyledDivider />
        <Columns>
          <LinkBox>
            <DefaultLink
              onClick={
                () => props.history.push(`/${currentLanguage}/about-us`)
                // console.log(props)
              }
            >
              {t('about.support_us')}
            </DefaultLink>
          </LinkBox>
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
                () => props.history.push(`/${currentLanguage}/disclaimer`)
                // console.log(props)
              }
            >
              {/* 關於候選人陣營 */}
              {t('about.camp')}
            </StyledFooterLink>
          </LinkBox>
          <LinkBox>
            <StyledFooterLink
              target="_blank"
              href="https://forms.gle/irD6tEznWPNda6w59"
            >
              {/* 反映意見 */}
              {t('about.feedback')}
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
            <DefaultLink
              onClick={
                () => props.history.push(`/${currentLanguage}/privacy`)
                // console.log(props)
              }
            >
              Privacy
            </DefaultLink>
          </LinkBox>
          <LinkBox>
            <div
              className="fb-like"
              data-href="https://g0vhk.io"
              data-width=""
              data-layout="button"
              data-action="like"
              data-size="small"
              data-show-faces="false"
              data-share="false"
            ></div>
            &nbsp;&nbsp;&nbsp;
            <div
              className="fb-share-button"
              data-href="https://dc2019.g0vhk.io"
              data-layout="button_count"
              data-size="small"
            >
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvote4.hk%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
              >
                Share
              </a>
            </div>
          </LinkBox>
        </Columns>
      </StyledFooter>
    </>
  )
}

export default withRouter(Footer)
