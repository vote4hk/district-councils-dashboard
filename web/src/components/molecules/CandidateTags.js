import React from 'react'
import PropTypes from 'prop-types'
import { HtmlTooltip } from '../atoms/Tooltip'
import { Box } from '@material-ui/core'

CandidateTags.propTypes = {
  tags: PropTypes.array.isRequired,
}

function getTextByTagAndType(tag, type) {
  if (type === 'camp' && tag === '有爭議') {
    return '侯選人立場有爭議'
  }
  return ''
}

export default function CandidateTags(props) {
  const { tags } = props

  return (
    <Box className={props.className}>
      {tags.map((tag, i) => (
        <HtmlTooltip
          key={`tag-${i}`}
          disableFocusListener
          disableTouchListener
          text={getTextByTagAndType(tag.tag, tag.type)}
          placement="bottom"
          type="error"
          size={21}
          onClick={evt => {
            evt.preventDefault()
            evt.stopPropagation()
            evt.nativeEvent.stopPropagation()
            evt.nativeEvent.stopImmediatePropagation()
          }}
        />
      ))}
    </Box>
  )
}
