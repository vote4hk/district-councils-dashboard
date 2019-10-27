import { Typography } from '@material-ui/core'
import React from 'react'

export default props => {
  return (
    <Typography
      className={props.className}
      dangerouslySetInnerHTML={{ __html: props.text }}
    ></Typography>
  )
}
