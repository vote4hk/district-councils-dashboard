import React from 'react'
import PropTypes from 'prop-types'
import { HtmlTooltip } from '../atoms/Tooltip'

CandidateTags.propTypes = {
  tags: PropTypes.array.isRequired,
}

function getTextByTagAndType(tag, type) {
  if (type === 'camp' && tag === '有爭議') {
    return '侯選人立場有爭議'
  }
  return 'asdasdasda'
}

export default function CandidateTags(props) {
  const { tags } = props

  return (
    <>
      {tags.map((tag, i) => (
        <HtmlTooltip
          key={`tag-${i}`}
          disableFocusListener
          disableTouchListener
          text={getTextByTagAndType(tag.tag, tag.type)}
          placement="bottom"
          size={30}
          onClick={evt => {
            evt.preventDefault()
            evt.stopPropagation()
            evt.nativeEvent.stopPropagation()
            evt.nativeEvent.stopImmediatePropagation()
          }}
        />
      ))}
    </>
  )
}
