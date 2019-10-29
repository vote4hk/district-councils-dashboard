import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { QUERY_GET_NOMINATION_SUMMARY } from 'queries/gql'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { DefaultLink } from 'components/atoms/Link'
import Columns, { SeperatedColumns } from 'components/atoms/Columns'
import { getConstituencyTagsByCandidateCamps } from 'utils/helper'
import _ from 'lodash'

const Container = styled(Box)`
  && {
    width: 100%;
    padding: 0 16px;
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

        let result = []
        if (data && data.dcd_constituencies) {
          data.dcd_constituencies.forEach(dcca => {
            const tags = getConstituencyTagsByCandidateCamps(dcca.candidates)

            if (tags.length > 0) {
              result.push({
                ...dcca,
                tags,
              })
            }
          })
        }

        const demo_clash = result.filter(r => r.tags.includes('民主撞區'))
        const estab_clash = result.filter(r => r.tags.includes('建制撞區'))

        const demo_clash_grouped = _.groupBy(
          demo_clash,
          c => c.district.dc_name_zh
        )
        const estab_clash_grouped = _.groupBy(
          estab_clash,
          c => c.district.dc_name_zh
        )

        const object2array = obj =>
          Object.keys(obj).map(key => {
            return {
              dc_name_zh: key,
              clashed: obj[key],
            }
          })

        const demo_clash_grouped_array = object2array(demo_clash_grouped)

        demo_clash_grouped_array.sort(
          (a, b) => b.clashed.length - a.clashed.length
        )

        const estab_clash_grouped_array = object2array(estab_clash_grouped)

        estab_clash_grouped_array.sort(
          (a, b) => b.clashed.length - a.clashed.length
        )

        // const candi_5 = result.filter(r => r.tags.includes('多人混戰')).filter(district => district.candidates.length === 5)
        // const candi_4 = result.filter(r => r.tags.includes('多人混戰')).filter(district => district.candidates.length === 4)

        return (
          <>
            {result && result.length > 0 && (
              <Container>
                {/* <Typography variant="h6" gutterBottom>
                  2019年區議會選舉將於11月24日舉行，屆時將選出香港18區區議會共
                  <b>{data.dcd_constituencies.length}</b>個民選議席。
                </Typography> */}

                <SeperatedColumns>
                  <Typography variant="h5" gutterBottom>
                    民主派撞區 - {demo_clash.length}區
                  </Typography>
                </SeperatedColumns>
                <Columns>
                  {demo_clash_grouped_array.map(district => {
                    const dcca = district.clashed.map((d, i) => (
                      <FlexLink
                        key={i}
                        onClick={() =>
                          props.history.push(`district/2019/${d.code}`)
                        }
                      >
                        {`${d.name_zh}`}
                      </FlexLink>
                    ))
                    return (
                      <Columns>
                        <Typography variant="h6">
                          {district.dc_name_zh} -
                        </Typography>
                        {dcca}
                      </Columns>
                    )
                  })}
                </Columns>

                <SeperatedColumns>
                  <Typography variant="h5" gutterBottom>
                    建制派撞區 - {estab_clash.length}區
                  </Typography>
                </SeperatedColumns>
                <Columns>
                  {estab_clash_grouped_array.map(district => {
                    const dcca = district.clashed.map((d, i) => (
                      <FlexLink
                        key={i}
                        onClick={() =>
                          props.history.push(`district/2019/${d.code}`)
                        }
                      >
                        {`${d.name_zh}`}
                      </FlexLink>
                    ))
                    return (
                      <Columns>
                        <Typography variant="h6">
                          {district.dc_name_zh} -
                        </Typography>
                        {dcca}
                      </Columns>
                    )
                  })}
                </Columns>

                {/* <Typography variant="h6" gutterBottom>
                  5人混戰 - {candi_5.length}區
                </Typography>
                <Columns>
                  {candi_5.map((district, index) => (
                    <FlexLink
                      key={index}
                      onClick={() =>
                        props.history.push(
                          `district/2019/${district.code}`
                        )
                      }
                    >
                      {`${district.name_zh}`}
                    </FlexLink>
                  ))}
                </Columns> */}

                {/* <Typography variant="h6" gutterBottom>
                  4人混戰 - {candi_4.length}區
                </Typography>
                <Columns>
                  {candi_4.map((district, index) => (
                    <FlexLink
                      key={index}
                      onClick={() =>
                        props.history.push(
                          `district/2019/${district.code}`
                        )
                      }
                    >
                      {`${district.name_zh}`}
                    </FlexLink>
                  ))}
                </Columns> */}
              </Container>
            )}
          </>
        )
      }}
    </Query>
  )
}

export default withRouter(Summary)
