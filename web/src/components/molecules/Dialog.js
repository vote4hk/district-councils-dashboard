import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import React from 'react'

const StyledDialogTitle = styled(MuiDialogTitle)`
  && {
    padding: 16px;
    min-width: 50%;
  }
`
const StyledDialogContent = styled(MuiDialogContent)`
  && {
    padding: 16px;
    min-width: 50%;
  }
`

const DialogTitle = props => {
  const { children, onClose } = props
  return (
    <StyledDialogTitle>
      <Box display="flex" alignItems="center">
        <Box flexGrow={1}>{children}</Box>
        <Box>
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              style={{ padding: 0 }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </Box>
      </Box>
    </StyledDialogTitle>
  )
}

const DialogContent = props => {
  const { children } = props
  return <StyledDialogContent>{children}</StyledDialogContent>
}

export const PlainDialog = props => {
  const { open, handleClose, title, content, actions } = props
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {title}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}
