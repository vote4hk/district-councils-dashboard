import React from 'react'
import { Box, Typography } from '@material-ui/core'
import styled from 'styled-components'
import { PeopleAvatar } from 'components/atoms/Avatar'
import { getColorFromCamp } from 'utils/helper'
import Columns from 'components/atoms/Columns'
import { withRouter } from 'react-router-dom'
import { COLORS } from 'ui/theme'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import { getProfilePath } from 'utils/helper'
import DistrictSelector from 'components/molecules/DistrictSelector'
import { fireEvent } from 'utils/ga_fireevent'

const AddressOption = props => {
  const { className, onClick } = props
  return (
    <Box
      className={className}
      onClick={() =>
        onClick({ year: 2019, code: props.data.constituency.code })
      }
    >
      <Typography variant="h5">{props.label}</Typography>
      {props.data.constituency && (
        <Typography variant="caption" color="textSecondary">{`${props.data
          .constituency.dc_name_zh || ''} | ${props.data.constituency.code} - ${
          props.data.constituency.name_zh
        }`}</Typography>
      )}
    </Box>
  )
}

const StyledTypography = styled(Typography)`
  && {
    margin-left: 8px;
  }
`

export const PeopleOption = props => {
  const homeUrl = process.env.REACT_APP_HOST_URI
  const { className, onClick } = props
  const { uuid, name_zh, name_en, camp, constituency } = props.data
  const avatarPath = uuid
    ? `${homeUrl}/static/images/avatar/${uuid}.jpg`
    : `${homeUrl}/static/images/avatar/default.png`
  return (
    <Box
      className={className}
      onClick={() => onClick({ uuid, name_zh, name_en })}
    >
      <Columns alignItems="center">
        <PeopleAvatar
          borderwidth={2}
          camp={getColorFromCamp(camp)}
          src={avatarPath}
          imgProps={{
            onError: e => {
              e.target.src = `${homeUrl}/static/images/avatar/default.png`
            },
          }}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '24px',
          }}
        />
        <StyledTypography variant="h4">{name_zh || name_en}</StyledTypography>
        {constituency && (
          <StyledTypography variant="h6" color="textSecondary">
            {`${constituency.district.dc_name_zh || ''} | ${
              constituency.code
            } - ${constituency.name_zh}`}
          </StyledTypography>
        )}
      </Columns>
    </Box>
  )
}

const StyledAddressOption = styled(AddressOption)`
  && {
    padding-left: 8px;
    padding-top: 8px;
  }
`
const StyledPeopleOption = styled(PeopleOption)`
  && {
    padding-left: 8px;
    padding-top: 8px;
  }
`

export default withRouter(props => {
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  function handleAddressSelected({ year, code }) {
    props.history.push(`/district/${year}/${code}`)
    dispatch({ type: DRAWER_CLOSE })
  }

  function handlePeopleSelected(person) {
    const path = getProfilePath(person)
    props.history.push(path)
    dispatch({ type: DRAWER_CLOSE })
  }

  const { type } = props.data
  return (
    <>
      {type === 'address' ? (
        <StyledAddressOption {...props} onClick={handleAddressSelected} />
      ) : (
        <StyledPeopleOption {...props} onClick={handlePeopleSelected} />
      )}
    </>
  )
})
