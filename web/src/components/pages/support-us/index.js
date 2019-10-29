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

const DisclaimerPage = props => {
  return (
    <>
      <Container>
        <Typography variant="h3">關於我們</Typography>
        <br />
        <p>
          我們是一群普通人，沒有任何政黨背景，也沒有接受任何捐助，是以數月工餘時間建立這個網站的一群人。
        </p>
        <p>
          我們相信開放數據，相信公民科技能為社會帶來改變。 因此我們於
          <DefaultLink target="_blank" href="https://g0vhk.io/">
            g0vhk
          </DefaultLink>
          舉辦的hackathon中認識，由4月開始製作這個網站。
        </p>
        <br />
        <Typography variant="h3">關於g0vhk</Typography>
        <br />
        <p>
          <DefaultLink target="_blank" href="https://g0vhk.io/">
            g0vhk
          </DefaultLink>{' '}
          受台灣「零時政府」（g0v.tw）的理念啟發。目的是透過技術解決社會問題，以項目形式推動社會進步。以開放數據為例，透過開放源碼程式編寫
          (Open Source Program) 或群眾外包 (Crowd Sourcing)
          ，令不同範疇的數據透明化，解決資訊不流通問題，以擴大公民的知情權。
        </p>
        <br />
        <Typography variant="h3">支持我們</Typography>
        <br />
        <p>
          你的捐款可以贊助g0vhk將來所舉辦的hackathon，亦可為將來的公民科技項目提供起動資金。
          本項目目前亦利用g0vhk贊助的服務器運行，而收到的捐款亦會有一部份作為雲端服務的支出。
        </p>
        <p>
          捐款可以到
          <DefaultLink
            target="_blank"
            href="https://www.collaction.hk/s/g0vhk/fund"
          >
            collaction
          </DefaultLink>
          以小額支持
        </p>
      </Container>
    </>
  )
}

export default DisclaimerPage
