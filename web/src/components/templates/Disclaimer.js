import React from 'react'
import { DefaultLink } from 'components/atoms/Link'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

export const Disclaimer = props => {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="body2" gutterBottom>
        {/* 本網站與任何2019年區議會選舉候選人或其助選成員無關，刊載資料目的非為促使或阻礙任何候選人在選舉中當選。 */}
        {t('disclaimer.segment.text1')}
      </Typography>
      <Typography variant="body2">
        {/* 本網站所刊載資訊全為公開資料，歸納自 */}
        {t('disclaimer.segment.text3')}
        <DefaultLink href="https://www.eac.hk/" target="_blank">
          {/* 選舉管理委員會 */}
          {t('thirdParty.ElectoralAffairsCommission')}
        </DefaultLink>
        丶
        <DefaultLink href="https://www.reo.gov.hk/" target="_blank">
          {/* 選舉事務處 */}
          {t('thirdParty.ElectoralAndElectoralOffice')}
        </DefaultLink>
        丶
        <DefaultLink href="https://www.censtatd.gov.hk/" target="_blank">
          {/* 政府統計處 */}
          {t('thirdParty.censusAndStatisticsDepartment')}
        </DefaultLink>
        丶
        <DefaultLink href="https://www.districtcouncils.gov.hk" target="_blank">
          {/* 各區區議會網站 */}
          {t('thirdParty.websitesOfDC')}
        </DefaultLink>
        及
        <DefaultLink
          href="https://github.com/initiummedia/hk_district_council_election"
          target="_blank"
        >
          {/* 端傳媒 */}
          {t('thirdParty.initiumMedia')}
        </DefaultLink>
        ，刊載前已盡力確保資料真確性，如有建議或錯漏，請按
        <DefaultLink href="https://forms.gle/irD6tEznWPNda6w59" target="_blank">
          此
        </DefaultLink>
        匯報。
      </Typography>
    </>
  )
}
