import React from 'react'
import { Card, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { SecondaryTag } from 'components/atoms/Tag'
import Box from '@material-ui/core/Box'
import Columns from 'components/atoms/Columns'
import {
  getDistrictListUriFromTag,
  getCurrentLanguage,
  withLanguage,
} from 'utils/helper'
import CandidatesContainer from 'components/containers/CandidatesContainer'

const StyledCard = styled(Card)`
  && {
    margin: 0 0 16px;
    padding: 16px;
    height: auto;
  }
`

const TagContainer = styled(Box)`
  && {
    margin-top: 6px;
    margin-right: 8px;
  }
`

const ConstituencyCard = props => {
  const { year, constituency } = props
  const { tags } = constituency
  const sortedTags = tags.sort((a, b) =>
    a.type === 'boundary' ? -1 : a.type === b.type ? 0 : 1
  )
  const currentLanguage = getCurrentLanguage()

  return (
    <StyledCard
      onClick={() => {
        props.history.push(
          `/${currentLanguage}/district/2019/${constituency.code}`
        )
      }}
    >
      <Typography variant="h6" gutterBottom>
        {withLanguage(constituency.name_en, constituency.name_zh)}（
        {constituency.code}）
      </Typography>
      <Columns>
        {sortedTags.map((tag, index) => (
          <TagContainer>
            <SecondaryTag
              key={index}
              value={tag.tag}
              handleClick={evt => {
                evt.stopPropagation()
                props.history.push(getDistrictListUriFromTag(tag.tag))
              }}
            />
          </TagContainer>
        ))}
      </Columns>
      <CandidatesContainer year={year} code={constituency.code} />
    </StyledCard>
  )
}

export default withRouter(ConstituencyCard)
