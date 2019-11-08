import React from 'react'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { COLORS } from 'ui/theme'

const DisclaimerContainer = styled.div`
  && {
    a {
      text-decoration: unset;
      color: ${COLORS.main.primary};
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
    }
  }
`

export const Disclaimer = props => {
  const { t } = useTranslation()
  return (
    <DisclaimerContainer>
      <Typography variant="body2" gutterBottom>
        {/* 本網站與任何2019年區議會選舉候選人或其助選成員無關，刊載資料目的非為促使或阻礙任何候選人在選舉中當選。 */}
        {t('disclaimer.segment.text1')}
      </Typography>
      <Typography variant="body2">
        <span
          dangerouslySetInnerHTML={{ __html: t('disclaimer.segment.source') }}
        />
        <span
          dangerouslySetInnerHTML={{ __html: t('disclaimer.segment.report') }}
        />
      </Typography>
    </DisclaimerContainer>
  )
}
