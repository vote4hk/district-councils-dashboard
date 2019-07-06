import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CustomizedProgressBars from '../../components/BorderLinearProgress'
import Avatar from '@material-ui/core/Avatar'
import { bps } from 'utils/responsive'

const Container = styled.div`
   {
    padding-bottom: 100px;
  }
`

const RowsContainer = styled.div`
   {
    margin-top: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
    ${bps.down('md')} {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`

const FlexRowContainer = styled(Box)`
  && {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 1440px;
    margin: auto;
    ${bps.down('md')} {
      width: 1440px;
      margin: auto;
    }
  }
`

const FlexColumn = styled(Box)`
  && {
    height: 149px;
    align-items: center;
    display: flex;
    padding-left: 40px;
    ${bps.down('md')} {
      height: 70px;
    }
  }
`

const AvatarColumn = styled(FlexColumn)`
  && {
    width: 100px;
    ${bps.down('md')} {
      width: 100%;
    }
  }
`

const NameColumn = styled(FlexColumn)`
  && {
    width: 200px;
    ${bps.down('md')} {
      width: 100%;
    }
  }
`

const PoliticalColumn = styled(FlexColumn)`
  && {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 160px;
    ${bps.down('md')} {
      width: 100%;
    }
  }
`

const StyledDivier = styled(Divider)`
  && {
    margin-left: 30px;
    margin-right: 30px;
  }
`

class CandidateList extends Component {
  static propTypes = {
    candidates: PropTypes.array.isRequired,
    year: PropTypes.number.isRequired,
    code: PropTypes.string.isRequired,
  }

  // todo: use ENV_VAR
  homeUrl = 'https://cswbrian.github.io/district-councils-dashboard/'

  render() {
    const { candidates, year, code } = this.props
    return (
      <Container maxWidth="lg">
        <Typography variant="h5" gutterBottom>
          議員候選人
        </Typography>
        <RowsContainer>
          {candidates
            .sort((a, b) => a.candidate_number - b.candidate_number)
            .map((candidate, index) => (
              <>
                {index > 0 ? <StyledDivier /> : null}
                <FlexRowContainer
                  style={{ width: '100%' }}
                  key={candidate.candidate_number}
                >
                  <AvatarColumn>
                    <Avatar
                      src={`${
                        this.homeUrl
                      }/static/images/avatar/${year}/${code}_${
                        year === 2011 ? '0' : ''
                      }${candidate.candidate_number}.jpg`}
                      imgProps={{
                        onError: e => {
                          e.target.src =
                            this.homeUrl + '/static/images/avatar/default.png'
                        },
                      }}
                    ></Avatar>
                  </AvatarColumn>
                  <NameColumn p={1}>
                    <Typography gutterBottom variant="h5">
                      {`${
                        candidate.candidate_number == null
                          ? ''
                          : candidate.candidate_number + '.'
                      } ${candidate.person.name_zh ||
                        candidate.person.name_en}`}
                    </Typography>
                  </NameColumn>
                  <PoliticalColumn>
                    <Typography variant="h6" display="block">
                      陣營
                    </Typography>
                    {'\n'}
                    <Typography display="block">
                      {candidate.political_affiliation
                        ? candidate.political_affiliation.name_zh
                        : '-'}
                    </Typography>
                  </PoliticalColumn>
                  <PoliticalColumn>
                    <Typography variant="h6" display="block">
                      政治聯繫
                    </Typography>
                    {'\n'}
                    <Typography display="block">
                      {candidate.political_affiliation
                        ? candidate.political_affiliation.name_zh
                        : '-'}
                    </Typography>
                  </PoliticalColumn>
                  <PoliticalColumn>
                    <Typography gutterBottom>
                      {`${candidate.votes} (${candidate.vote_percentage}%)`}
                    </Typography>
                  </PoliticalColumn>
                  <FlexColumn>
                    <Typography color="textSecondary" variant="body2">
                      得票率
                    </Typography>
                    <CustomizedProgressBars
                      value={parseFloat(candidate.vote_percentage)}
                    />
                  </FlexColumn>
                  <FlexColumn>
                    {candidate.is_won && <CheckCircleIcon />}
                    {!candidate.is_won && (
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                        }}
                      ></div>
                    )}
                  </FlexColumn>
                </FlexRowContainer>
              </>
            ))}
        </RowsContainer>
      </Container>
    )
  }
}

export default CandidateList
