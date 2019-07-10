export const getPoliticalAffiliation = candidate => {
  let pa = '-'
  try {
    // assume from the graphql we already sort out the only active political_affiliations here
    pa =
      candidate.person.political_affiliations[0].political_affiliation.name_zh
  } catch (err) {}
  return pa
}

export const getCamp = candidate => {
  let camp = '-'
  try {
    // assume from the graphql we already sort out the only active political_affiliations here
    camp =
      candidate.person.political_affiliations[0].political_affiliation.camp
        .name_zh
  } catch (err) {}
  return camp
}
