import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { COLORS } from 'ui/theme'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { geti18nFromCamp } from 'utils/helper'

const styles = {
  establishment: {
    '& svg': {
      fill: COLORS.camp['establishment'].background,
    },
  },
  democracy: {
    '& svg': {
      fill: COLORS.camp['democracy'].background,
    },
  },
  others: {
    '& svg': {
      fill: COLORS.camp['other'].background,
    },
  },
}

class CampSelector extends Component {
  constructor(props) {
    super(props)
    const { classes } = props
    this.camps = [
      {
        name: 'democracy',
        text: '民主',
        color: 'asdf',
        className: classes.democracy,
      },
      { name: 'establishment', text: '建制', className: classes.establishment },
      { name: 'others', text: '其他', className: classes.others },
    ]
    this.state = {
      checked: {
        democracy: true,
        establishment: true,
        others: true,
      },
    }
  }

  handleChange(evt) {
    const checked = this.state.checked
    const name = evt.target.value
    checked[name] = evt.target.checked
    this.setState({ ...this.state, checked: checked })
    const { onChange } = this.props
    if (onChange) {
      onChange(
        this.state.checked.democracy,
        this.state.checked.establishment,
        this.state.checked.others
      )
    }
  }

  render() {
    const { state } = this
    const { t } = this.props
    return (
      <div>
        <FormGroup row>
          <Box m={2} />
          <FormControlLabel
            control={<div></div>}
            // label="顯示："
            label={t('show')}
          />
          {this.camps.map((c, i) => (
            <FormControlLabel
              key={c.name}
              control={
                <Checkbox
                  className={c.className}
                  checked={state.checked[c.name]}
                  value={c.name}
                  onChange={this.handleChange.bind(this)}
                />
              }
              label={t(geti18nFromCamp(c.text, true))}
            />
          ))}
        </FormGroup>
      </div>
    )
  }
}

export default withStyles(styles)(withTranslation()(CampSelector))
