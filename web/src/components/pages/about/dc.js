import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const Container = styled(Paper)`
  && {
    width: 100%;
    padding: 16px;
    box-shadow: none;
    h4,
    h5 {
      font-weight: 600;
    }
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
        <Typography variant="h4" gutterBottom>
          區議會代表甚麼？
        </Typography>
        <br />

        <Typography variant="h5">參與地區事務討論</Typography>
        <p>
          政府會就地區政策諮詢區議會。以往曾有不成文規定，區議會反對的政策，政府不會呈上立法會，惟這個做法已非必然。雖然如此，在一些地區民生議題，如巴士路線和道路規劃等，區議會的意見仍能左右決策。
        </p>

        <Typography variant="h5">掌握每年千萬撥款</Typography>
        <p>
          未計算其他津貼，一般區議員的每月酬金為34,000元。在香港或不算高薪，但區議會可因應各項社區事務撥款，例如區內的小型工程，每區區議會每年便有大約2,000萬撥款可供調配。
        </p>

        <Typography variant="h5">123張選委入場券</Typography>
        <p>
          立法會選舉與特首選舉一直被質疑並非民主選舉。相較之下，撇除27個當然議席，452區議員全由市民選出，而區議會選舉的結果，亦會直接影響另外兩個選舉。
        </p>

        <p>
          現時，立法會功能組別內有6名議員由區議會產生，分別是由全港區議員互選的「區議會（第一）」，以及5名由區議員參與及提名，再由不屬其他功能組別的市民選出的「區議會（第二）」，俗稱「超級區議會」。
        </p>

        <p>
          另外，特首選委1,200人中，有117人屬「港九各區議會」(57人)及「新界各區議會」(60人)，由相應選區的區議會互選產生。值得注意的是，由於香港的政治陣營大致分為建制派及泛民主派，按以往情況，這些選委席位，均會由區議會佔半數以上的陣營全取。
        </p>

        <p>
          加上6名立法會議員是當然選委，區議會選舉的結果，亦將左右10分1特首選委之爭。
        </p>
      </Container>
    </>
  )
}

export default DisclaimerPage
