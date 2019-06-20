import React, { Component } from 'react'
import { styled } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import district from '../../data/district'
import { fetchData } from '../../utils/httpClient'


const Map = styled(Paper)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 300,
  padding: '0 30px',
});

const DistrictCard = styled(Paper)({
  background: '#f6f6f6',
  border: 0,
  color: '#00000',
  height: 300,
  padding: '0 30px',
});

class DistrictPage extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  async componentDidMount() {
    const { match: { params } } = this.props
    const { year, code } = params
    const query = `
    {
      dc_area(where: {
        cacode: {
          _eq: "${code}"
        },
        year: {
          _eq: "${year}"
        }
      }) {
        id
        cname
        people (where: {
          year: {
            _eq: "${year}"
          }
        }) {
          id
          name_chi
          year
        }
      }
    }
    `
    const fetched_data = await fetchData(query);
    console.log(fetched_data)
  }

  render() {
    const { match: { params } } = this.props
    const { year, code } = params
    const districtCode = code.substring(0, 1)
    const dcca = code !== districtCode ? code : null
    const data = district[year][districtCode][dcca];



    

    
   
    return (
      // TODO: UI design
      <Grid container>
        <Grid item xs={9}>
        <Map>Styled Components</Map>
        </Grid>
        <Grid item xs={3}>
        <DistrictCard>
              <CardHeader
                title={`${data.code} ${data.name}`}
                subheader={year}
              />
              <CardContent>
              </CardContent>
        </DistrictCard>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
                  主要屋邨 / 地區：
                </Typography>
                <List>
                  {
                    data.mainArea.map((area, index) => <ListItem alignItems="flex-start" key={index}>
                      <ListItemText
                        primary={`${Object.keys(area)[0]}. ${area[Object.keys(area)[0]]}`}
                      />
                    </ListItem>)

                  }
                </List>
        </Grid>
        <Grid item xs={12}>
          <Paper>
                <Typography variant="subtitle1" gutterBottom>
                  估計人口： {data.expectedPopulation}
                </Typography>

                
                
          </Paper>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper>
            <List>
              {
                data.boundaries.map((boundary, index) => <ListItem alignItems="flex-start" key={index}>
                  <ListItemText
                    primary={`${Object.keys(boundary)[0]} ${boundary[Object.keys(boundary)[0]]}`}
                  />
                </ListItem>)

              }
            </List>
          </Paper>
        </Grid> */}
      </Grid>
    )
  }
}

export default DistrictPage
