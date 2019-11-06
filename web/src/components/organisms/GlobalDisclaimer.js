import React, { useEffect } from 'react'
import { PlainDialog } from 'components/molecules/Dialog'
import { Disclaimer } from 'components/templates/Disclaimer'
import localforage from 'localforage'

export default function GlobalDisclaimer() {
  const [open, setOpen] = React.useState(false)

  const handleClose = async () => {
    setOpen(false)
    await localforage.setItem('instructionRead', true)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const instructionRead = await localforage.getItem('instructionRead')
        await setOpen(!instructionRead)
      } catch (e) {
        await setOpen(true)
      }
    }

    fetchData()
  }, [])

  return (
    <PlainDialog
      open={open}
      handleClose={handleClose}
      title="vote4.hk 區議會投票指南"
      content={<Disclaimer />}
    ></PlainDialog>
  )
}
