import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { DefaultLink } from 'components/atoms/Link'

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

const SupportUsPage = props => {
  return (
    <>
      <Container>
        <Typography variant="h5">我們是誰？</Typography>
        <p>我們是一群香港人，相信開放數據及公民科技能推動社會進步。</p>
        <p>
          2019年4月，眾人於一次
          <DefaultLink target="_blank" href="https://g0vhk.io/">
            g0vhk
          </DefaultLink>
          舉辦的hackathon認識。為讓市民於選舉期間更掌握自己選區及未來代議士的資訊，我們於工餘抽空籌備此項目。
        </p>
        <br />
        <Typography variant="h5">關於 g0vhk</Typography>
        <p>
          <DefaultLink target="_blank" href="https://g0vhk.io/">
            g0vhk
          </DefaultLink>{' '}
          受台灣「零時政府」（g0v.tw）的理念啟發，目標是以技術解決社會問題，以項目形式推動社會進步。以開放數據為例，編寫開放源碼程式
          (Open Source Program) 或群眾外包 (Crowd Sourcing)
          ，令不同範疇的數據更透明，解決資訊不流通問題，提升公民的知情權。
        </p>
        <br />
        <Typography variant="h5">支持g0vhk</Typography>
        <p>
          你的捐款，有助g0vhk
          舉辦更多活動，推廣公民科技，同時為未來的項目提供起動資金。本網站亦於g0vhk贊助的服務器運行，收到的捐款有一部份將用補貼雲端服務的支出。
        </p>
        <p>
          如你認同g0vhk的理念，請到
          <DefaultLink
            target="_blank"
            href="https://www.collaction.hk/s/g0vhk/fund"
          >
            collaction
          </DefaultLink>
          小額捐款
        </p>
      </Container>
    </>
  )
}

export default SupportUsPage
