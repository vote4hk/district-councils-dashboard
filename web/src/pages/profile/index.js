import React, { Component } from 'react'
import { withTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import candidates from '../../data/candidates'
import moment from 'moment'
import gql from "graphql-tag";
import { Query } from "react-apollo";


const GET_PEOPLE_PROFILE = gql`
query ($id: uuid!) {
  dc_people( 
    where: { 
      id: { _eq: $id}
    }
    order_by: {elections_aggregate: {
      max: { year: asc }
    }}
  ) {
    name_en
    name_zh
    estimated_yob
    gender
    elections {
      cacode
      year
      votes
      vote_percentage
      constituency {
        name
        expected_population
        deviation_percentage
      }
      political_affiliation {
        name_zh
      }
    }
  }
}
`;


class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {
  }

  render() {
    const { match: { params: { id } } } = this.props
    return (
      <Query query={GET_PEOPLE_PROFILE} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error! ${error}`;
          const person = data.dc_people[0];
          return (
            <Paper>
              <Card>
                <CardHeader
                  // avatar={
                  //   // TODO: Add candi_number to candidate.json
                  //   <Avatar
                  //     src={`/static/images/avatar/2015/${showCase[showCase.length - 1].cacode}_0${showCase[showCase.length - 1].candi_number}.jpg`}
                  //   >
                  //   </Avatar>
                  // }
                  title={person.name_zh ? person.name_zh : person.name_en}
                  subheader={`${moment().year() - person.estimated_yob}歲`}
                />
                <CardContent>
                </CardContent>
              </Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Year</TableCell>
                    <TableCell>Code</TableCell>
                    <TableCell>Distict</TableCell>
                    <TableCell>Political Affiliation</TableCell>
                    <TableCell>Votes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {person.elections.map(row => (
                    <TableRow key={row.year + row.cacode}>
                      <TableCell align="right">{row.year}</TableCell>
                      <TableCell align="right">{row.cacode}</TableCell>
                      {row.constituency ?
                        <TableCell align="right">{row.constituency.name}</TableCell> :
                        <TableCell align="right">?</TableCell>
                      }
                      {row.political_affiliation ?
                        <TableCell align="right">{row.political_affiliation.name_zh}</TableCell> :
                        <TableCell align="right">N/A</TableCell>
                      }

                      <TableCell align="right">{`${row.votes ? row.votes : '-'} (${row.vote_percentage ? row.vote_percentage : '-'}%)`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          );
        }}
      </Query>
      // TODO: UI design

    )
  }
}

export default ProfilePage
