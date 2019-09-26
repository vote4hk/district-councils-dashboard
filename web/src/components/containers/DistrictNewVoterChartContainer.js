import React, { useState } from 'react'
import GroupedBarChart from 'components/atoms/charts/GroupedBarChart'
import { Query } from 'react-apollo'
import _ from 'lodash'
import { QUERY_CONSTITUENCY_STATS } from 'queries/gql'
import { Button, Typography } from '@material-ui/core'

export default props => {
  const filters = [null, 'FEMALE', 'MALE']
  const [filterIndex, setFilterIndex] = useState(0)

  const changeFilter = () => {
    let index = filterIndex + 1
    if (index === filters.length) {
      index = 0
    }
    setFilterIndex(index)
  }

  const getDataForChat = voteStats => {
    /**
     * voteStats = [{
     *  type: "BY_GENDER_AGE",
     *  subtype: "VOTERS/NEW_VOTERS",
     *  category_1: "FEMALE/MALE",
     *  category_2: "21-25"
     *  count: 10
     * }]
     */

    const isFiltered = gender => {
      if (gender === 'MALE' && filterIndex === 1) {
        return false
      } else if (gender === 'FEMALE' && filterIndex === 2) {
        return false
      }
      return true
    }
    const data = _.values(_.groupBy(voteStats, stat => stat.category_2))
    data.forEach(row => {
      row.label = row[0].category_2
      row.values = _.values(_.groupBy(row, r => r.subtype)).map(r =>
        r
          .filter(v => isFiltered(v.category_1))
          .map(v => v.count)
          .reduce((c, v) => c + v, 0)
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

  const getMeta = voteStats => {
    const meta = {
      increased: 0,
      mostIncreasedGroup: null,
    }
    const total = voteStats
      .filter(v => v.subtype === 'VOTERS')
      .map(v => v.count)
      .reduce((c, v) => c + v, 0)

    const newVotes = voteStats
      .filter(v => v.subtype === 'NEW_VOTERS')
      .map(v => v.count)
      .reduce((c, v) => c + v, 0)

    let max = 0
    const groupedByAge = _.groupBy(voteStats, v => v.category_2)
    Object.keys(groupedByAge).forEach(age => {
      const genders = groupedByAge[age]
      const groupedByGender = _.groupBy(genders, v => v.category_1)
      Object.keys(groupedByGender).forEach(gender => {
        const types = groupedByGender[gender]
        const groupedByType = _.groupBy(types, v => v.subtype)
        const newVoters = groupedByType['NEW_VOTERS'][0].count
        const totalVoters = groupedByType['VOTERS'][0].count
        if (newVoters / totalVoters > max) {
          max = _.round(newVoters / totalVoters, 4)
          meta.mostIncreasedGroup = {
            gender,
            age,
            max,
          }
        }
      })
    })
    // .filter(v => v.subtype === 'NEW_VOTERS')
    // .forEach(v => {
    //   if (v.count > max) {
    //     meta.mostIncreasedGroup = {
    //       gender: v.category_1,
    //       age: v.category_2
    //     }
    //   }
    // })
    meta.increased = _.round(newVotes / (total - newVotes), 4)

    return meta
  }

  return (
    // TODO: support page other than battleground page
    <>
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
          const chartData = getDataForChat(
            data.dcd_constituencies[0].vote_stats
          )
          const meta = getMeta(data.dcd_constituencies[0].vote_stats)
          return (
            <>
              <Typography variant="h2">
                選民增加{_.round(meta.increased * 100, 2)}%
              </Typography>
              <Typography variant="h4">
                {meta.mostIncreasedGroup.age}歲的
                {meta.mostIncreasedGroup.gender === 'MALE' ? '男' : '女'}
                性選民增加了
                {_.round(meta.mostIncreasedGroup.max * 100, 2)}%
              </Typography>
              <Button onClick={changeFilter}>
                {filterIndex === 0
                  ? '顯示所有'
                  : filterIndex === 1
                  ? '只顯示男性選民'
                  : '只顯示女性選民'}
              </Button>
              <GroupedBarChart data={chartData} />
            </>
          )
        }}
      </Query>
    </>
  )
}
