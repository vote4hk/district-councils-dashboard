import React from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress } from '@material-ui/core'
import Text from 'components/atoms/Text'
import styled from 'styled-components'
import { COLORS } from 'ui/theme'

LoadingButton.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
}

const StyledCircularProgress = styled(CircularProgress)`
  && {
    margin: 4px;
    color: ${COLORS.main.background};
  }
`

const WhiteText = styled(Text)`
  && {
    color: ${COLORS.main.background};
  }
`

export default function LoadingButton(props) {
  const { label, isLoading, onClick, className } = props

  return (
    <>
      <Button
        variant="outlined"
        className={className}
        disabled={isLoading}
        onClick={onClick}
      >
        {isLoading && (
          <>
            <StyledCircularProgress size={14} color="secondary" />
            <WhiteText>{label}</WhiteText>
          </>
        )}
        {!isLoading && <>{label}</>}
      </Button>
    </>
  )
}
