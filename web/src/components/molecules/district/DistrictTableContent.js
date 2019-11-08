import React from 'react'
import ConstituencyTableContent from 'components/molecules/constituency/ConstituencyTableContent'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import TableCell from '@material-ui/core/TableCell'
import { Typography } from '@material-ui/core'
import TableRow from '@material-ui/core/TableRow'
import { useTranslation } from 'react-i18next'
import { withLanguage } from 'utils/helper'

const DistrictNameTableRow = styled(TableRow)`
  && {
    cursor: pointer;
  }
`

const DistrictTableContent = props => {
  const {
    district,
    year,
    showEstablishment,
    showDemocracy,
    showBlank,
    showOthers,
  } = props

  const { t } = useTranslation()
  return (
    <>
      <DistrictNameTableRow
        onClick={() => {
          props.history.push(`/district/${year}/${district.dc_code}`)
        }}
      >
        <TableCell colSpan={5}>
          <Typography variant="h4">
            {withLanguage(district.dc_name_en, district.dc_name_zh)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t('no_of_districts', { n: district.constituencies.length })}
          </Typography>
          {district.dc_description_zh && (
            <Typography variant="body1">
              {district.dc_description_zh}
            </Typography>
          )}
        </TableCell>
      </DistrictNameTableRow>
      {district.constituencies.map(constituency => {
        return (
          <ConstituencyTableContent
            key={constituency.id}
            constituency={constituency}
            year={year}
            showEstablishment={showEstablishment}
            showDemocracy={showDemocracy}
            showBlank={showBlank}
            showOthers={showOthers}
          />
        )
      })}
    </>
  )
}

export default withRouter(DistrictTableContent)
