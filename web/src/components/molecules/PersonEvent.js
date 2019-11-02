import styled from 'styled-components'
import { Card, CardContent } from '@material-ui/core'
import Text from '../atoms/Text'
import React from 'react'
import PropTypes from 'prop-types'
import Microlink from '@microlink/react'
import { useTranslation } from 'react-i18next'

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

const getPersonVoteText = personVote => {
  const { t } = useTranslation()
  switch (personVote) {
    case 'MOVE':
      // return '動議'
      return t('personVote.move')
    case 'SECOND':
      // return '和議'
      return t('personVote.second')
    case 'YES':
      // return '贊成'
      return t('personVote.yes')
    case 'NO':
      // return '否決'
      return t('personVote.no')
    case 'ABSTAIN':
      // return '棄權'
      return t('personVote.abstain')
    case 'ABSENT':
      // return '缺席'
      return t('personVote.absent')
    case 'NORECORD':
      // return '無紀錄'
      return t('personVote.noRecord')
    case 'PRESENT':
      // return '與席'
      return t('personVote.present')
    default:
      return ''
  }
}

const getEventTypeText = (type, personVote) => {
  switch (type) {
    case 'VOTE':
      // return `[投票 - ${getPersonVoteText(personVote)}]`
      return `${t('personVote.vote')} ${getPersonVoteText(personVote)}`
    case 'SPEECH':
      // return '[言論]'
      return t('personVote.speech')
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
  const { title, eventType, date, description, url, personVote } = props
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
              {`${getEventTypeText(eventType, personVote)} ${title}`}
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
