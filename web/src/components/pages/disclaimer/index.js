import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { DefaultLink } from 'components/atoms/Link'
import Rows from 'components/atoms/Rows'
import Columns from 'components/atoms/Columns'

const Container = styled(Paper)`
  && {
    width: 100%;
    padding: 16px;
    box-shadow: none;
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
        <p>
          為於清晰及準確之間取平衡，本網站將候選人的政治陣營按以下次序，分為「建制」、「民主」及「其他」。
        </p>
        <ol>
          <li>
            如候選人屬主流政黨或組織成員，則以其背景劃分，詳細分類可參考附表。
          </li>
          <li>
            如候選人報稱「獨立」，或漏空政治聯繫，則參考其往績，如曾獲某陣營支持、助選或舉辦活動。
          </li>
          <li>
            至於首度參選者，本網站會嘗試按該名侯選人對反修例運動立場劃分：
            <br />
            <br />
            民主：認同運動，要求政府答應運動「五大訴求」
            <br />
            建制：反對運動，支持政府「止暴制亂」
            <br />
            其他：未有就運動表態，或同時支持以上兩點
          </li>
        </ol>
        <p>
          如任何人分類有任何意見，歡迎反映或電郵至
          <DefaultLink href="mailto:chiangsumlui@gmail.com">
            chiangsumlui@gmail.com
          </DefaultLink>
          ，我們會盡快跟進。
        </p>

        <Typography variant="h5">候選陣營分類</Typography>

        <Rows>
          <Columns>
            <p>建制</p>
            <ul>
              <li>民建聯</li>
              <li>工聯會</li>
              <li>經民聯</li>
              <li>西九新動力</li>
              <li>自由黨</li>
              <li>新民黨</li>
              <li>新世紀論壇</li>
              <li>香港社團聯會</li>
              <li>新界社團聯會</li>
              <li>九龍社團聯會</li>
              <li>港九勞工社團聯會</li>
              <li>香港島各界聯合會</li>
              <li>社區18</li>
              <li>公民力量</li>
              <li>公屋聯會</li>
            </ul>
            <p>民主</p>
            <ul>
              <li>民主黨</li>
              <li>公民黨</li>
              <li>民協</li>
              <li>街工</li>
              <li>新民主同盟</li>
              <li>工黨</li>
              <li>職工盟</li>
              <li>社民連</li>
              <li>人民力量</li>
              <li>支聯會</li>
              <li>民主動力</li>
            </ul>
          </Columns>
        </Rows>
      </Container>
    </>
  )
}

export default DisclaimerPage
