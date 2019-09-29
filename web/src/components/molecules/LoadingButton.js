import React from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress } from '@material-ui/core'
import Text from 'components/atoms/Text'
import styled from 'styled-components'

LoadingButton.propTypes = {
  onClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
}

const StyledCircularProgress = styled(CircularProgress)`
  && {
    margin: 4px;
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
        {isLoading && <StyledCircularProgress size={14} color="secondary" />}
        <Text>{label}</Text>
      </Button>
    </>
  )
}
