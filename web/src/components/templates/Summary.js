import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { QUERY_GET_NOMINATION_SUMMARY } from 'queries/gql'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { DefaultLink } from 'components/atoms/Link'
import Columns from 'components/atoms/Columns'

const Container = styled(Box)`
  && {
    width: 100%;
    padding: 16px;
    box-shadow: none;
  }
`

const FlexLink = styled(DefaultLink)`
  && {
    font-size: 14px;
    margin-right: 8px;
  }
`
const Summary = props => {
  return (
    <Query query={QUERY_GET_NOMINATION_SUMMARY}>
      {({ loading, error, data }) => {
        if (error) return `Error! ${error}`

        let result
        let more_than_2 = []
        if (data && data.dcd_constituencies) {
          result = data.dcd_constituencies.reduce(
            (a, c) => {
              a.no_of_candidates += c.candidates.length

              if (!a.stat[c.candidates.length]) {
                a.stat[c.candidates.length] = 1
              } else {
                a.stat[c.candidates.length]++
              }

              if (c.candidates.length > 2) {
                const district = {
                  code: c.code,
                  name_zh: c.name_zh,
                }
                a.more_than_2.push(district)
              }
              return a
            },
            { no_of_candidates: 0, stat: {}, more_than_2: [] }
          )

          result.no_competition = result.stat['0'] + result.stat['1']

          console.log(result)
        }

        return (
          <>
            {result && (
              <Container>
                <Typography variant="h6" gutterBottom>
                  2019年區議會選舉將於11月24日舉行，屆時將選出香港18區區議會共
                  <b>{data.dcd_constituencies.length}</b>個民選議席，連同
                  <b>27</b>位當然議員，合共<b>479</b>個議席。
                </Typography>

                <Typography variant="h6" gutterBottom>
                  本網頁已收錄<b>{result.no_of_candidates}</b>
                  名參選人資料，現時全港有<b>{result.no_competition}</b>
                  個選區未有競爭，而以下<b>{result.more_than_2.length}</b>
                  個選區多於兩人參選。
                </Typography>

                <Columns>
                  {result.more_than_2.map((district, index) => (
                    <FlexLink
                      key={index}
                      onClick={() =>
                        props.history.push(`district/2019/${district.code}`)
                      }
                    >
                      {`${district.name_zh}`}
                    </FlexLink>
                  ))}
                </Columns>
              </Container>
            )}
          </>
        )
      }}
    </Query>
  )
}

export default withRouter(Summary)
