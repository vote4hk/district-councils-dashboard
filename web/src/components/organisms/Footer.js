import React from 'react'
import Box from '@material-ui/core/Box'
import styled from 'styled-components'
import Divider from '@material-ui/core/Divider'
import { UnstyledLink } from 'components/atoms/Link'
import Columns from 'components/atoms/Columns'
import { withRouter } from 'react-router-dom'
import { Disclaimer } from 'components/templates/Disclaimer'

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
              關於候選人陣營
            </StyledFooterLink>
          </LinkBox>
          <LinkBox>
            <StyledFooterLink
              target="_blank"
              href="https://forms.gle/irD6tEznWPNda6w59"
            >
              反映意見
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
              選區事實處
            </StyledFooterLink>
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
              data-share="false">
            </div>
            &nbsp;&nbsp;&nbsp;
            <div
              className="fb-share-button"
              data-href="https://dc2019.g0vhk.io"
              data-layout="button_count"
              data-size="small"
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvote4.hk%2F&amp;src=sdkpreparse"
                className="fb-xfbml-parse-ignore">
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
