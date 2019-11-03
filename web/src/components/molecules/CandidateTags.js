import React from 'react'
import PropTypes from 'prop-types'
import { HtmlTooltip } from '../atoms/Tooltip'
import { Box } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

CandidateTags.propTypes = {
  tags: PropTypes.array.isRequired,
}

function getTextByTagAndType(tag, type) {
  const { t } = useTranslation()
  if (type === 'camp' && tag === '有爭議') {
    // return '侯選人政治立場未明'
    return t('candidate.noPoliticalAffiliation')
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
