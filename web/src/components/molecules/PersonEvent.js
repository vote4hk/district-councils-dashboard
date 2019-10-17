import styled from 'styled-components'
import { Card, CardContent } from '@material-ui/core'
import Text from '../atoms/Text'
import React from 'react'
import PropTypes from 'prop-types'
import Microlink from '@microlink/react'

const StyledCard = styled(Card)`
  && {
    margin: 16px;
    background-color: ${props => props.color || '#fff'};
  }
`

const StyledMicrolink = styled(Microlink)`
  && {
    width: 100%;
    max-width: calc(100vw - 64px);
  }
`

const getEventTypeText = type => {
  switch (type) {
    case 'VOTE':
      return '[投票]'
    case 'SPEECH':
      return '[言論]'
    default:
      return ''
  }
}

const trimDescription = description => {
  if (!description) return ''
  return description.length > 100
    ? description.substring(0, 100) + '...'
    : description
}

const validateUrl = url => {
  const patt = /(http|https):\/\/.*/
  const match = patt.exec(url)
  return match ? match[0] : null
}

const PersonEvent = props => {
  const { title, eventType, date, description, url } = props
  const validatedUrl = validateUrl(url)

  return (
    <StyledCard>
      <CardContent>
        <Text gutterBottom>{date}</Text>
        {eventType === 'MEDIA' && validatedUrl ? (
          <StyledMicrolink url={validatedUrl} size="large" />
        ) : (
          <>
            <Text variant="h5" gutterBottom>
              {`${getEventTypeText(eventType)} ${title}`}
            </Text>
            <Text color="textSecondary">{trimDescription(description)}</Text>
          </>
        )}
      </CardContent>
    </StyledCard>
  )
}

PersonEvent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  eventType: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

export default PersonEvent
