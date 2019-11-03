import React, { useState } from 'react'
import GroupedBarChart from 'components/atoms/charts/GroupedBarChart'
import { Query } from 'react-apollo'
import _ from 'lodash'
import { QUERY_CONSTITUENCY_STATS } from 'queries/gql'
import { Typography } from '@material-ui/core'
import { COLORS } from 'ui/theme'
import { useTranslation } from 'react-i18next'

export default props => {
  const { t } = useTranslation()

  const [filterIndex] = useState(0)

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

  const getTransformedData = data => {
    const newData = []
    const valueDict = {}
    for (var i = 0; i < data.length; i++) {
      if (data[i].category_2 === '18-20' || data[i].category_2 === '71+') {
        newData.push(data[i])
      } else {
        const ageGroupPrefix = data[i].category_2[0] // e.g. 21-25 and 26-30 will have the same first digit
        const dictKey =
          ageGroupPrefix +
          data[i].category_1 /* gender */ +
          data[i].subtype /* VOTERS, NEW_VOTERS */
        if (typeof valueDict[dictKey] === 'undefined') {
          // no existing count for this key
          valueDict[dictKey] = data[i].count
        } else {
          data[i].count += valueDict[dictKey]
          data[i].category_2 =
            ageGroupPrefix + '1-' + (parseInt(ageGroupPrefix) + 1) + '0'
          newData.push(data[i])
        }
      }
    }
    return newData
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

          // 2019-10-19 Hackathon - Reduce grouping for voters bar chart
          const transformedData = getTransformedData(
            data.dcd_constituencies[0].vote_stats
          )
          // transform the data to desire format
          const chartData = getDataForChat(transformedData)
          const meta = getMeta(transformedData)
          //TODO: i18n
          return (
            <>
              <Typography variant="h2">
                {/* 選民人數增加 */}
                {t('districtNewVoterchartContainer.text1', {
                  n: _.round(meta.increased * 100, 2),
                })}
              </Typography>
              <Typography variant="h4">
                最大增幅組別：{meta.mostIncreasedGroup.age}歲的
                {meta.mostIncreasedGroup.gender === 'MALE' ? '男' : '女'}
                性選民增加了
                {_.round(meta.mostIncreasedGroup.max * 100, 2)}%
              </Typography>
              <GroupedBarChart
                data={chartData}
                firstColor={COLORS.main.secondary}
                secondColor={COLORS.main.primary}
              />
            </>
          )
        }}
      </Query>
    </>
  )
}
