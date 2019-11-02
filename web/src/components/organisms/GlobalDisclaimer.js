import React from 'react'
import { PlainDialog } from 'components/molecules/Dialog'
import { Disclaimer } from 'components/templates/Disclaimer'

export default function GlobalDisclaimer() {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <PlainDialog
      open={open}
      handleClose={handleClose}
      title="vote4.hk 區議會投票指南"
      content={<Disclaimer />}
    ></PlainDialog>
  )
}
