import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import { PlainCard } from '../molecules/Card'
import { Tag } from '../atoms/Tag'
import { UnstyledNavLink } from '../atoms/UnstyledLink'
import {
  getColorFromPoliticalAffiliation,
  getCouncillorMeta,
} from 'utils/helper'
import moment from 'moment'
import PropTypes from 'prop-types'

const StyledAvatar = styled(Avatar)`
  && {
    margin: 10px;
    width: 60px;
    height: 60px;
    border: 3px ${props => props.theme.camp[props.camp]} solid;
  }
`

const Councillor = props => {
  const { councillors } = props
  if (councillors.length === 0) {
    return <> </>
  }
  // we just get the latest councillor from the dc
  const councillor = councillors[0]
  const tags = ['競逐連任']
  const IMAGE_HOST_URI =
    process.env.REACT_APP_HOST_URI || 'https://hkvoteguide.github.io'
  const meta = getCouncillorMeta(councillor)

  return (
    <UnstyledNavLink
      key={councillor.code}
      to={`/profile/${councillor.person.name_zh || councillor.person.name_en}/${
        councillor.person.uuid
      }`}
    >
      <Box>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h6" gutterBottom>
              {`${councillor.term_from.substring(0, 4)} `}
              {`${councillor.constituency.name_zh}${councillor.constituency.code}`}
            </Typography>
          </Box>
          <Box>
            {tags.length > 0 &&
              tags.map((tag, index) => <Tag value={tag} key={index} />)}
          </Box>
        </Box>

        <Grid container wrap="nowrap" spacing={0}>
          <Grid item>
            <StyledAvatar
              camp={getColorFromPoliticalAffiliation(
                councillor.political_affiliation
              )}
              src={`${IMAGE_HOST_URI}/static/images/avatar/${councillor.person.uuid}.jpg`}
              imgProps={{
                onError: e => {
                  e.target.src =
                    IMAGE_HOST_URI + '/static/images/avatar/default.png'
                },
              }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h4" gutterBottom>
              {councillor.person.name_zh}
            </Typography>
            <Box display="flex">
              <Box pr={1} alignSelf="flex-end">
                <Typography variant="body2">報稱政治聯繫</Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {councillor.political_affiliation}
                </Typography>
              </Box>
            </Box>

            <Box display="flex">
              <Box pr={1} alignSelf="flex-end">
                <Typography variant="body2">
                  {meta.lastParticipated.year}
                  選舉結果
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {meta.lastParticipated.votesDiff === 0 && '自動當選'}
                  {meta.lastParticipated.votesDiff > 0 &&
                    `${
                      meta.lastParticipated.votesDiff /
                        meta.lastParticipated.votes >
                      0.2
                        ? '大'
                        : meta.lastParticipated.votesDiff /
                            meta.lastParticipated.votes <
                          0.05
                        ? '險'
                        : ''
                    }勝${meta.lastParticipated.votesDiff}票`}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </UnstyledNavLink>
  )
}

export default Councillor
