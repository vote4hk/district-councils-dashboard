import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { useTranslation } from 'react-i18next'

const Container = styled(Paper)`
  && {
    width: 100%;
    padding: 16px;
    box-shadow: none;
    p {
      margin-bottom: 1rem;
    }
    p,
    li {
      font-size: 14px;
    }
    ol {
      padding-left: 1rem;
    }
    ul li {
      list-style-type: none;
    }
  }
`

const DisclaimerPage = props => {
  const { t } = useTranslation()

  return (
    <>
      <Container>
        {t('Example')}
        <Typography variant="h5">關於區議會選舉</Typography>
        <p>
          2019年區議會選舉將於2019年11月24日舉行，屆時將會選出香港十八區區議會共452個民選議席及27個當然議員，任期為四年，由2020年1月1日至2023年12月31日。
        </p>

        <Typography variant="h5">區議會的社區重要性</Typography>
        <p>
          香港區議會是香港政府重要的地區諮詢媒介，區議員透過平日接觸居民和聽取民意，能夠向政府反映現有或未來政策、公共設施及服務對居民的影響和反饋，甚至能夠申請撥款，承擔有關區內的環境、康樂及文化活動的改善事務。
        </p>

        <Typography variant="h5">區議會的政治重要性</Typography>
        <p>
          全港共有117名港九新界各區議會的議員將會成為1,200人的行政長官選委會的一份子，此外，在立法會選舉（或未來的行政長官普選中），區議員作為該區的聯繫人，在宣傳、組織票源、動員群眾的力量都是無可代替的。
        </p>
      </Container>
    </>
  )
}

export default DisclaimerPage
