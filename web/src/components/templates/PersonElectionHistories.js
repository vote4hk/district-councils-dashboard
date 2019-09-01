import React from 'react'
import PropTypes from 'prop-types'
import Rows from 'components/atoms/Rows'
import { TitleText, SubTitleText } from 'components/atoms/Text'
import Columns from 'components/atoms/Columns'
import { PlainCard } from 'components/molecules/Card'
import styled from 'styled-components'
import { Box } from '@material-ui/core'

const SizedColumn = styled(Box)`
  && {
    width: ${props => props.width || 100}px;
  }
`

const UpperSection = styled(Box)`
  && {
    height: 30px;
  }
`

const LowerSection = styled(Box)`
  && {
    height: 20px;
  }
`

const PersonElectionHistories = props => {
  const { histories } = props

  return (
    <Rows>
      {histories.map((m, index) => (
        <PlainCard key={index}>
          <Columns>
            <SizedColumn width={60}>
              <TitleText> {m.year} </TitleText>
            </SizedColumn>
            <SizedColumn>
              <Rows>
                <UpperSection>
                  <SubTitleText>
                    {' '}
                    {`${m.constituency.code}${m.constituency.name_zh}`}{' '}
                  </SubTitleText>
                </UpperSection>
                <LowerSection>選區</LowerSection>
              </Rows>
            </SizedColumn>
            <SizedColumn width={60}>
              <UpperSection>
                <TitleText> {m.votes} </TitleText>
              </UpperSection>
              <LowerSection>得票</LowerSection>
            </SizedColumn>

            <SizedColumn width={60}>
              <UpperSection>
                <TitleText> {m.is_won ? '當選' : '落敗'} </TitleText>
              </UpperSection>
              <LowerSection></LowerSection>
            </SizedColumn>
          </Columns>
        </PlainCard>
      ))}
    </Rows>
  )
}

PersonElectionHistories.propsType = {
  histories: PropTypes.array,
}

export default PersonElectionHistories
