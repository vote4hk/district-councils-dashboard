import React, { Component } from 'react'
import { styled } from '@material-ui/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'
import CustomizedProgressBars from '../../components/BorderLinearProgress'
import { getDistrictDataByYearCode } from '../../service/district'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import OLMap from '../../components/OLMap'

const Map = styled(Paper)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 300,
  padding: '0 30px',
})

const DistrictCard = styled(Paper)({
  background: '#f6f6f6',
  color: '#00000',
  height: 300
})

class DistrictPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      district: undefined
    }
  }

  async componentDidMount() {
    const { match: { params: { year, code } } } = this.props
    this.setState({
      year,
      code,
      district: await getDistrictDataByYearCode(year, code)
    })
  }

  async componentDidUpdate(prevProps) {
    const { match: { params: { year, code } } } = this.props
    if (year !== prevProps.match.params.year) {
      this.setState({
        year,
        district: await getDistrictDataByYearCode(year, code)
      })
    }

    if (code !== prevProps.match.params.code) {
      this.setState({
        code,
        district: await getDistrictDataByYearCode(year, code)
      })
    }
  }

  handleChangeDistrict = (year, code) => {
    if (!year || ! code) return
    this.props.history.replace(`/district/${year}/${code}`)
  }

  render() {
    const { year, code, district } = this.state
    if (!district) return null

    return (
      <React.Fragment>
        <Container maxWidth='lg'>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <OLMap
                year={year}
                code={code}
                changeDistrict={this.handleChangeDistrict}
                 />
            </Grid>
            <Grid item xs={4}>
              <DistrictCard>
                <Box
                  p={1} 
                  border={0}
                  color='primary.minor'>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems='center'
                    justifyContent='space-between'>
                    <IconButton aria-label='arrow_back'>
                      <ArrowBackIcon />
                    </IconButton>
                    <Typography variant='button' gutterBottom>
                      {year}
                    </Typography>
                    <IconButton aria-label='arrow_forward'>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>

                  <Typography variant='h4' color='inherit' style={{ display: 'inline-block' }}>
                    {district.name_zh}
                  </Typography>
                  <Typography variant='h4' color='inherit' style={{ display: 'inline-block' }}>
                    {code}
                  </Typography>
                  <Divider />
                  <List>
                    <ListItemText primary={'區議員'} />
                    <ListItemSecondaryAction>{district.councillor.person.name_zh}</ListItemSecondaryAction>
                  </List>
                  <List>
                    <ListItemText primary={'政黨'} />
                    <ListItemSecondaryAction>{district.councillor.political_affiliation ? district.councillor.political_affiliation.name_zh : '-'}</ListItemSecondaryAction>
                  </List>
                </Box>
              </DistrictCard>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' gutterBottom>主要屋邨 / 地區：</Typography>
            <List>
              {
                district.main_areas.map((area, index) => <ListItem alignItems='flex-start' key={index}>
                  <ListItemText
                    primary={`${Object.keys(area)[0]}. ${area[Object.keys(area)[0]]}`}
                  />
                </ListItem>)
              }
            </List>
          </Grid>
        </Container>
        <Grid item xs={12}>
          <Container maxWidth='lg'>
            <Typography variant='h5' gutterBottom>估計人口</Typography>
            {district.expected_population}
            
            <Typography variant='h5' gutterBottom>議員候選人</Typography>
            <Grid item xs={12}>
              {
                district.candidates.sort((a, b) => a.candidate_number - b.candidate_number).map(candidate =>
                  <div 
                    style={{ width: '100%' }}
                    key={candidate.candidate_number}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent='space-between'>
                    <Box p={1}>
                      <Avatar
                        src={`/static/images/avatar/${year}/${code}_${year === 2011 ? '0' : ''}${candidate.candidate_number}.jpg`}
                        imgProps={{ onError: (e) => { e.target.src = '/static/images/avatar/default.png'; } }} >
                      </Avatar>
                    </Box>
                    <Box p={1}>
                      <Typography gutterBottom variant='h6'>
                        {`${candidate.candidate_number}. ${candidate.person.name_zh}`}
                      </Typography>
                      </Box>
                    <Box p={1}>
                      <Typography color='textSecondary' variant='body2'>
                        陣營
                      </Typography>
                      <Typography gutterBottom variant='body1'>
                        {candidate.political_affiliation ? candidate.political_affiliation.name_zh: ''}
                      </Typography>
                      </Box>
                    <Box p={1}>
                      <Typography gutterBottom variant='body1'>
                        {`${candidate.votes} (${candidate.vote_percentage}%)`}
                      </Typography>
                    </Box>
                    <Box p={1}>
                      <Typography color='textSecondary' variant='body2'>
                        得票率
                      </Typography>
                      <CustomizedProgressBars
                        value={parseFloat(candidate.vote_percentage)} />
                    </Box>
                    <Box p={1}>
                      {candidate.won && <CheckCircleIcon />}
                    </Box>
                  </Box>
                  </div>)
              }
            </Grid>
          </Container>
        </Grid>
      </React.Fragment>
    )
  }
}

export default DistrictPage
