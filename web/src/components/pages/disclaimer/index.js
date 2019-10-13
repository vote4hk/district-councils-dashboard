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
        <Typography variant="h5">關於候選人陣營</Typography>
        <p>
          候選人的政治陣營，反映他們對政治議題的看法。一般而言，每人對各項議題可持不同立場，難以用一兩個詞語概括候選人背景。
        </p>

        <Typography variant="h5">陣營分類（2019區議會選舉）</Typography>

        <p>
          本屆區議會選舉的候選人政治陣營取自
          <DefaultLink target="_blank" href="https://hkfactcheck.io">
            選區事實處
          </DefaultLink>
          ，該網站收集大眾意見，並跟據以下資料綜合判斷：
        </p>
        <ol>
          <li>最近申報之政治聯繫；</li>
          <li>過往申報之政治聯繫；</li>
          <li>該政治聯系於重大政治議題上的取態；</li>
          <li>相關人士及其於重大政治議題上的取態；</li>
          <li>本人於重大政治議題上的取態；</li>
          <li>各媒體提及該人士時所使用的介紹文字；</li>
          <li>與其他組織的關聯。 遇有爭議個案，一律以「其他/未清楚」取代。</li>
        </ol>

        <p>
          如任何人分類有任何意見，歡迎反映或電郵至
          <DefaultLink target="_blank" href="mailto:hkfactcheck@gmail.com">
            mailto:hkfactcheck@gmail.com
          </DefaultLink>
          。
        </p>

        <Typography variant="h5">2019之前的陣營分類</Typography>

        <p>
          至於2019年以前之候選人陣營分類，則取自
          <DefaultLink
            target="_blank"
            href="https://github.com/initiummedia/hk_district_council_election"
          >
            端傳媒於2017年整理之檔案
          </DefaultLink>
          ，本網站刊載前已盡力確保資料真確性，如有建議或錯漏，歡迎
          <DefaultLink
            target="_blank"
            href="https://forms.gle/irD6tEznWPNda6w59"
          >
            反映
          </DefaultLink>
          或電郵至
          <DefaultLink target="_blank" href="mailto:chiangsumlui@gmail.com">
            chiangsumlui@gmail.com
          </DefaultLink>
          ，我們會盡快跟進。
        </p>
      </Container>
    </>
  )
}

export default DisclaimerPage
