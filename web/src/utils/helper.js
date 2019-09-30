export const getDistrictListUriFromTag = tag => `/district/2019/tags/${tag}`

export const getDistrictOverviewUriFromTag = code => `/district/2019/${code}`

/**
 * Passing a councillor object and get the meta data for it
 * (By QUERY_GET_COUNCILLOR_AND_CANDIDATES query)
 */
export const getCouncillorMeta = councillor => {
  const result = {
    participatedOrdinary: 0,
    participatedByElection: 0,
    lastParticipated: {
      year: 2019,
      type: 'ordinary',
      votesDiff: 0,
      votes: 0,
      isWon: false,
    },
  }

  // should already sorted from query
  const participatedElections = councillor.person.candidates || []
  result.participatedByElection = participatedElections.filter(
    c => c.election_type === 'by-election'
  ).length
  result.participatedOrdinary = participatedElections.filter(
    c => c.election_type === 'ordinary'
  ).length

  if (participatedElections.length > 0) {
    const e = participatedElections[0]
    const electionYear = e.year

    const myVotes = e.constituency.candidates.find(
      c => c.person.id === councillor.person.id && c.year === electionYear
    ).votes
    const highestVotes = e.constituency.candidates
      .filter(
        c => c.person.id !== councillor.person.id && c.year === electionYear
      )
      .map(c => c.votes)
      .reduce((c, v) => Math.max(c, v), 0)
    result.lastParticipated = {
      year: e.year,
      isWon: e.is_won,
      votesDiff: myVotes - highestVotes,
      votes: myVotes,
      type: e.election_type,
    }
  }
  // if (person.candidates) {
  //   const sortedElections = person.candidates.sort((a, b) => b.year - a.year)
  //   result.lastParticipatedYear = sortedElections[0].year
  //   result.participationCount = sortedElections.length

  //   let relectedCount = 0
  //   for (let i = 0; i < sortedElections.length; i++) {
  //     const { is_won } = sortedElections[i]
  //     if (!is_won) {
  //       break
  //     }
  //     relectedCount++
  //   }

  //   result.relectedCount = relectedCount - 1

  //   sortedElections.forEach(election => {
  //     const year = election.year
  //     const yearResult = {}

  //     yearResult.uncontested =
  //       election.constituency.candidates.length === 1 ? true : false

  //     const myVotes = election.constituency.candidates.find(
  //       c => c.person_id === person.id
  //     ).votes
  //     const highestVotes = election.constituency.candidates
  //       .filter(c => c.person_id !== person.id)
  //       .map(c => c.votes)
  //       .reduce((c, v) => Math.max(c, v), 0)

  //     yearResult.votes = myVotes
  //     yearResult.diff = myVotes - highestVotes

  //     result[year] = yearResult
  //   })
  // }

  // console.log(result)
  return result
}

export const getColorFromCamp = camp => {
  if (!camp) return 'uncertain'
  const mapping = {
    泛民: 'democracy',
    建制: 'establishment',
    本土: 'localist',
    傘兵: 'localist',
    自決: 'localist',
    其他: 'other',
    不明: 'uncertain',
  }

  return mapping[camp] || 'uncertain'
}

export const getColorFromPoliticalAffiliation = pa => {
  if (!pa) return 'uncertain'

  const mapping = {
    democracy: [
      '民主黨',
      '公民黨',
      '香港民主民生協進會',
      '民協',
      '社會民主連線',
      '支聯會',
      '民主動力',
      '街坊工友服務處',
      '街工',
      '工黨',
      '職工盟',
      '新民主同盟',
      '香港本土',
      '獨立民主派',
    ],
    establishment: [
      '民主建港協進聯盟',
      '民建聯',
      '新界社團聯會',
      '新社聯',
      '香港工會聯合會',
      '工聯會',
      '港九勞工社團聯會',
      '香港經濟民生聯盟',
      '西九新動力',
      '自由黨',
      '新民黨',
      '新世紀論壇',
    ],
    localist: [
      '香港眾志',
      '青年新政',
      '本土民主前線',
      '東九龍社區關注組',
      '天水圍民生關注平台',
      '慈雲山建設力量',
      '屯門社區關注組',
      '長沙灣社區發展力量',
      '社區網絡聯盟',
      '沙田社區網絡',
      '荃灣社區網絡',
      '天水圍社區發展網絡',
      '屯門社區網絡',
      '葵青連結動力',
      '藍田社區網絡',
      '埔向晴天',
      '荃灣民生動力',
      '北區動源',
      '維多利亞社區協會',
    ],
    other: ['民主思路', '新思維'],
  }

  for (let camp of Object.keys(mapping)) {
    for (let party of mapping[camp]) {
      if (pa.includes(party)) {
        return camp
      }
    }
  }

  return 'uncertain'
}

export const getProfilePath = person => {
  const { name_en, name_zh, uuid } = person
  return `/profile/${name_zh || name_en}/${uuid}`
}
