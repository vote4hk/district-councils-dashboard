import styled from 'styled-components'
import { Card, CardContent } from '@material-ui/core'
import Text from '../atoms/Text'
import React from 'react'
import PropTypes from 'prop-types'
import { ReactTinyLink } from 'react-tiny-link'

const StyledCard = styled(Card)`
  && {
    padding: 16px;
    margin: 16px;
    background-color: ${props => props.color || '#fff'};
  }
`

const getEventTypeText = type => {
  switch (type) {
    case 'VOTE':
      return '[投票]'
    case 'SPEECH':
      return '[言論]'
    case 'MEDIA':
      return '[媒體]'
    default:
      return ''
  }
}

const trimDescription = description => {
  return description.length > 100
    ? description.substring(0, 100) + '...'
    : description
}

const PersonEvent = props => {
  const { title, eventType, date, description, url } = props
  return (
    <StyledCard>
      <CardContent>
        <Text variant="h5" gutterBottom>
          {`${getEventTypeText(eventType)} ${title}`}
        </Text>
        <Text gutterBottom>{date}</Text>
        <Text color="textSecondary">{trimDescription(description)}</Text>
        {eventType === 'MEDIA' && url && (
          <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            url={url}
          />
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
