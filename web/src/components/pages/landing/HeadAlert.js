import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { Typography } from '@material-ui/core'
import withQuery from 'withQuery'
import { Alert } from 'components/atoms/Alert'
import { withLanguage } from 'utils/helper'
import styled from 'styled-components'
import { COLORS } from 'ui/theme'

const StyledAlert = styled(Alert)`
  && {
    a {
      text-decoration: unset;
      color: ${COLORS.main.background};
      font-weight: 500;
    }
  }
`

function HeadAlert({ text }) {
  if (!text) {
    return <></>
  }

  return (
    <StyledAlert>
      <Typography
        variant="h6"
        gutterBottom
        dangerouslySetInnerHTML={{ __html: text }}
      ></Typography>
    </StyledAlert>
  )
}

HeadAlert.propTypes = {
  text: PropTypes.string,
}

HeadAlert.defaultProps = {
  text: null,
}

export default withQuery(
  HeadAlert,
  {
    query: `
        alertText: dcd_config(where: { key: { _eq: $alertTextKey } }) {
          value
        }
    `,
    variables: { alertTextKey: 'landing_alert_i18n' },
  },
  data => ({
    text: get(
      data,
      withLanguage('alertText.0.value.en', 'alertText.0.value.zh')
    ),
  })
)
