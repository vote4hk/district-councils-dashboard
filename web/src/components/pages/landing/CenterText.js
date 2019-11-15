import React from 'react'
import get from 'lodash.get'
import withQuery from 'withQuery'
import styled from 'styled-components'
import { COLORS } from 'ui/theme'

const ConfigCenterText = styled.div`
  && {
    width: 100%;
    text-align: center;
    a {
      text-decoration: none;
      color: ${COLORS.main.primary};
    }
  }
`

function CenterText({ text }) {
  return (
    <ConfigCenterText variant="h6" gutterBottom>
      <div
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      />
    </ConfigCenterText>
  )
}

export default withQuery(
  CenterText,
  {
    query: `
            centerText: dcd_config(where: { key: { _eq: $centerTextKey } }) {
                value
            }
        `,
    variables: {
      centerTextKey: 'landing_center_text',
    },
  },
  data => ({
    text: get(data, 'centerText.0.value.html_text'),
  })
)
