import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import { Typography } from '@material-ui/core'
import withQuery from 'withQuery'
import { Alert } from 'components/atoms/Alert'

function HeadAlert({ text }) {
  if (!text) {
    return <></>
  }

  return (
    <Alert>
      <Typography variant="h6" gutterBottom>
        {text}
      </Typography>
    </Alert>
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
    variables: { alertTextKey: 'landing_alert' },
  },
  data => ({
    text: get(data, 'alertText.0.value.text'),
  })
)
