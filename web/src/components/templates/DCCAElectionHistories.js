import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ScrollableTabs from 'components/organisms/ScrollableTabs'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_DCCA_ELECTION_HISTORIES = gql`
  query($year: Int!, $code: String!) {
    dcd_constituencies(where: { year: { _eq: $year }, code: { _eq: $code } }) {
      code
      name_zh
      candidates {
        person {
          name_zh
          uuid
        }
        candidate_number
        camp
        votes
        vote_percentage
        is_won
      }
    }
  }
`

class DCCAElectionHistories extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  // console.log(histories)

  // const result = histories.map(history => <Query query={GET_DCCA_ELECTION_HISTORIES} variables={{ year: history.year, code: history.CACODE }}>
  //   {({ loading, error, data }) => {
  //     if (loading) return null
  //     if (error) return `Error! ${error}`
  //     console.log(data)
  //     return data
  //   }}
  // </Query>)

  // console.log(result)

  render() {
    const { histories } = this.props

    return (
      <ScrollableTabs
        titles={histories.map(history => {
          return (
            <div>
              {history.CACODE}
              <br /> {history.year}
            </div>
          )
        })}
      >
        {histories.map(history => (
          <Query
            query={GET_DCCA_ELECTION_HISTORIES}
            variables={{ year: history.year, code: history.CACODE }}
          >
            {({ loading, error, data }) => {
              if (loading) return null
              if (error) return `Error! ${error}`

              const dccaResult = data.dcd_constituencies[0]

              // this.setState({
              //   electionHistory: {
              //     [history.year] : dccaResult
              //   }
              // })

              return <>{dccaResult.name_zh}</>
            }}
          </Query>
        ))}
      </ScrollableTabs>
    )
  }
}

export default DCCAElectionHistories
