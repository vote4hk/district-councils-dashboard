import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { PlainCard } from '../molecules/Card'
import { Tag } from '../atom/Tag'
import { UnstyledNavLink } from '../atom/UnstyledLink'

const StyledAvatar = styled(Avatar)`
  && {
    margin: 10px;
    width: 60px;
    height: 60px;
  }
`

class Councillor extends Component {
  static propTypes = {
    // areas: PropTypes.array.isRequired
  }

  homeUrl = 'https://cswbrian.github.io/district-councils-dashboard'

  render() {
    const { councilor } = this.props
    return (
      <UnstyledNavLink to={`/profile/${councilor.person.id}`}>
        <PlainCard>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h6" gutterBottom>
                現任區議員
              </Typography>
            </Box>
            <Box>
              <Tag value="自動當選" />
            </Box>
          </Box>

          <Grid container wrap="nowrap" spacing={0}>
            <Grid item>
              <StyledAvatar
                src={`${this.homeUrl}/static/images/avatar/${councilor.person.uuid}.jpg`}
                imgProps={{
                  onError: e => {
                    e.target.src =
                      this.homeUrl + '/static/images/avatar/default.png'
                  },
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {councilor.person.name_zh}
              </Typography>
              <Box display="flex">
                <Box pr={1} alignSelf="flex-end">
                  <Typography variant="body2">報稱政治聯繫</Typography>
                </Box>
                <Box>
                  <Typography variant="body1">
                    {councilor.political_affiliation}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </PlainCard>
      </UnstyledNavLink>
    )
  }
}

export default Councillor
