import styled from 'styled-components'
import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/InfoOutlined'

const InfoIconSvg = styled(InfoIcon)`
  && {
    font-size: ${props => props.fontsize || 16}px;
    vertical-align: bottom;
  }
`

export const HtmlTooltip = styled(props => (
  <Tooltip
    classes={{ popper: props.className, tooltip: 'tooltip' }}
    title={
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: props.text,
          }}
        />
      </>
    }
    {...props}
  >
    <InfoIconSvg />
  </Tooltip>
))`
  && {
    margin-left: 2px;
  }
  & .tooltip {
    margin: 2px 0;
    border: 1px solid #000;
    background-color: #fff;
    color: #000;
  }
`
