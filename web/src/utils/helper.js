export const getTagsForPerson = person => {
  const tags = []
  if (!person.candidates && !person.councillors) {
    return tags
  }
  // TODO: remove this if he is not attending the 2019 election
  const attending2019Election = true

  console.log(person)
  if (person.councillors) {
    const current = person.councillors.find(c => c.year === 2015)
    if (current && attending2019Election) {
      tags.push('爭取連任')
    }
  }

  if (person.candidates) {
    const sortedElections = person.candidates.sort((a, b) => b.year - a.year)
    if (attending2019Election) {
      tags.push(`第${sortedElections.length + 1}屆參選`)
    }

    let electedCount = 0
    for (let i = 0; i < sortedElections.length; i++) {
      const { is_won } = sortedElections[i]
      if (!is_won) {
        break
      }
      electedCount++
    }

    if (electedCount > 1) {
      tags.push(`連任${electedCount}屆`)
    }

    const lastElection = sortedElections[0]
    console.log(lastElection)
    if (lastElection.constituency.candidates.length === 1) {
      tags.push(`自動當選`)
    }

    if (lastElection.constituency.year === 2015) {
      const myVotes = lastElection.constituency.candidates.find(
        c => c.person_id === person.id
      ).votes
      const highestVotes = lastElection.constituency.candidates
        .filter(c => c.person_id !== person.id)
        .map(c => c.votes)
        .reduce((c, v) => Math.max(c, v), 0)

      const diff = myVotes - highestVotes
      if (diff > 0) {
        // win
        if (diff < 100) {
          tags.push(`險勝${diff}票`)
        } else {
          tags.push(`以${diff}票勝出`)
        }
      } else {
        // lose
        tags.push(`以${-diff}票落敗`)
      }
    }
  }

  return tags
}
