import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import SearchTab from 'components/organisms/SearchTab'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import ContextStore from 'ContextStore'
import { DRAWER_CLOSE } from 'reducers/drawer'
import { useTranslation } from 'react-i18next'
import { getCurrentLanguage } from 'utils/helper'

const ExpandedRow = styled(Box)`
  && {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }
`

const LeftMargin = styled(ExpandedRow)`
  && {
    min-height: 48px;
    align-items: center;
    padding: 0 16px 0 16px;
    cursor: pointer;
  }
`
const SearchMenu = props => {
  const { t } = useTranslation()
  const {
    drawer: { dispatch },
  } = React.useContext(ContextStore)

  function goToPage(route) {
    props.history.push(route)
    dispatch({ type: DRAWER_CLOSE })
  }

  const currentLanguage = getCurrentLanguage()

  return (
    <>
      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage(`/${currentLanguage}/`)}
        >
          {/* 返回首頁 */}
          {t('searchMenu.text1')}
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage(`/${currentLanguage}/district/2019`)}
        >
          {/* 全港選區一覽 */}
          {t('searchMenu.text2')}
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage(`/${currentLanguage}/about-dc`)}
        >
          {/* 關於區議會選舉 */}
          {t('searchMenu.text3')}
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage(`/${currentLanguage}/followed-district`)}
        >
          {/* 己關注選區 */}
          {t('searchMenu.text4')}
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() => goToPage(`/${currentLanguage}/SelectedCandidate`)}
        >
          {/* 己關注候選人 */}
          {t('searchMenu.text5')}
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="secondary"
          onClick={() =>
            (window.location.href =
              'https://docs.google.com/forms/u/1/d/e/1FAIpQLSdXtbdry3w8hkmZuN0MJaj2CP2X3RUUnCTWLnOujsfx1pHDrw/viewform?usp=send_form')
          }
        >
          {/* 反映意見 */}
          {t('searchMenu.feedback')}
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <Typography
          variant="h5"
          color="primary"
          onClick={() => goToPage(`/${currentLanguage}/about-us`)}
        >
          {/* 我們是誰？ */}
          {t('about.support_us')}
        </Typography>
      </LeftMargin>

      <LeftMargin>
        <SearchTab />
      </LeftMargin>
    </>
  )
}

export default withRouter(SearchMenu)
