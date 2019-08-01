import React from 'react'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const BorderLinearProgress = withStyles({
  root: {
    height: 20,
    width: 100,
    backgroundColor: props => lighten(props.bgcolor, 0.5),
  },
  bar: {
    borderRadius: 20,
    backgroundColor: props => props.bgcolor,
  },
})(LinearProgress)

export default function CustomizedProgressBars(props) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <BorderLinearProgress
        className={classes.margin}
        variant="determinate"
        color="secondary"
        value={props.value}
        bgcolor={props.color}
      />
    </React.Fragment>
  )
}
