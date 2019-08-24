import React from 'react'
import GroupedBarChart from 'components/charts/GroupedBarChart'
import { Query } from 'react-apollo'
import _ from 'lodash'
import { QUERY_CONSTITUENCY_STATS } from 'queries/gql'

export default props => {
  const getDataForChat = voteStats => {
    /**
     * voteStats = [{
     *  type: "BY_GENDER_AGE",
     *  subtype: "VOTERS/NEW_VOTERS",
     *  category_1: "FEMALE/MALE",
     *  category_2: "21-25"
     * }]
     */

    const data = _.values(_.groupBy(voteStats, stat => stat.category_2))
    data.forEach(row => {
      row.label = row[0].category_2
      row.values = _.values(_.groupBy(row, r => r.subtype)).map(r =>
        r.map(v => v.count).reduce((c, v) => c + v, 0)
      )
      row.values = [row.values[0] - row.values[1], row.values[0]]
      row.labels = ['2018', '2019']
    })

    /**
     * [{
     *  label: "21-22",
     *  values: [200, 159] // -> 2019 vs 2018
     * }]
     */

    return data
  }

  return (
    // TODO: support page other than battleground page
    <Query
      query={QUERY_CONSTITUENCY_STATS}
      variables={{ year: 2019, code: props.code }}
    >
      {({ loading, error, data }) => {
        if (loading) return null
        if (error) return `Error! ${error}`
        if (data.dcd_constituencies.length === 0) {
          console.error(`cannot find constituency. code: ${props.code}`)
          return `Error!`
        }
        // transform the data to desire format
        const chartData = getDataForChat(data.dcd_constituencies[0].vote_stats)

        return <GroupedBarChart data={chartData} />
      }}
    </Query>
  )
}
