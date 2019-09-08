import React, { Component } from 'react'
import { Card, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Tag } from 'components/atoms/Tag'
import { getDistrictListUriFromTag } from 'utils/helper'

const StyledCard = styled(Card)`
  && {
    margin: 5px;
    width: 100%;
    height: 60px;
  }
`

const ConstituencyCard = props => {
  const { constituency } = props
  const { tags } = constituency
  const sortedTags = tags.sort((a, b) =>
    a.type === 'boundary' ? -1 : a.type === b.type ? 0 : 1
  )

  return (
    <StyledCard
      onClick={() => {
        props.history.push(`/district/2019/${constituency.code}`)
      }}
    >
      {constituency.code}
      {constituency.name_zh}
      {sortedTags.map((tag, index) => (
        <Tag
          key={index}
          value={tag.tag}
          variant={tag.type === 'boundary' ? 'default' : 'outlined'}
          handleClick={evt => {
            evt.stopPropagation()
            props.history.push(getDistrictListUriFromTag(tag.tag))
          }}
        />
      ))}
    </StyledCard>
  )
}

export default withRouter(ConstituencyCard)
