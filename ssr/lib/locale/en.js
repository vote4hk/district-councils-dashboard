const zh = {
  // Global
  formatCanonicalUrl: () => `https://vote4.hk/en`,
  formatSiteName: () => '2019 District Council Election｜Vote4.hk The Guide to Voting',
  formatTitle: (prefix) => `${prefix ? prefix + '｜' : '' }2019 District Council Election｜Vote4.hk The Guide to Voting`,
  formatDescription: () => `The Guide to Voting in 2019 District Council Election is the best search engine for the list of districts and candidates. The page contains information on nomination of candidates, past results of District Council Election, data analysis, remarks made by candidates and their attendance at meetings.`,
  formatKeyword: (prefix) => `${prefix ? prefix + ', ' : '' }vote4hk, vote4, guide to voting, district council election, district council, dce, election, 2019 dc, candidate, constituency, boundary, map, situation, data, analysis, south china morning post, scmp, orange news, hong kong free press, hkfp, pro-democratic, pro-establishment`,
  formatImageUrl: () => 'https://vote4.hk/og-image.png',
  formatArticleSection: () => 'Candidate information｜Boundary and map｜Data analysis',

  // Districts
  formatDistrictsTitle: () => `List of Candidates from Hong Kong Island, Kowloon and the New Territories Districts｜2019 District Council Election｜Vote4.hk The Guide to Voting`,
  formatDistrictsDescription: () => `"2019 District Council Election will be held on 24 Nov. 1 District Council member will be elected in each constituency among the 452 constituencies over Hong Kong Island, Kowloon and the New Territories Districts. Take a look at the details of candidates from 18 districts, including candidates from Yau Tsim Mong District, Kwai Tsing District, Yuen Long District and Sha Tin District.`,
  formatDistrictsCanonicalUrl: (year) => `https://vote4.hk/district/${year}`,

  // Tag
  formatTagTitle: (tag) => `About ${tag}｜2019 District Council Election｜Vote4.hk The Guide to Voting`,
  formatTagDescription: (tag) => `Data Analysis of 2019 District Council Election. List of candidates who are relating to "${tag}"`,
  formatTagCanonicalUrl: (year, tag) => `https://vote4.hk/district/${year}/tags/${tag}`,

  // District
  formatDistrictTitle: (
    districtName,
    areaName) => `List of Candidates from ${districtName}｜${areaName}｜2019 District Council Election｜Vote4.hk The Guide to Voting`,
  formatDistrictDescription: (
    districtName, areaName,
    constituenciesNames) => `${areaName}${districtName} includes constituencies such as ${constituenciesNames}. This page includes the list of all candidates and detailed analysis of past results of District Council Election, data analysis, remarks made by the candidates and their attendance at meetings.`,
  formatDistrictCanonicalUrl: (year, code) => `https://vote4.hk/en/district/${year}/${code}`,

  // Constituency
  formatConstituencyTitle: (
    constituencyName, constituencyCode, districtName,
    areaName) => `List of Candidates from ${districtName} - ${constituencyName} (${constituencyCode}｜${areaName}｜2019 District Council Election｜Vote4.hk The Guide to Voting`,
  formatConstituencyDescription: (
    constituencyName, constituencyCode,
    mainAreasNames) => `List and introduction of candidates in ${constituencyName} (${constituencyCode})constituency. This page includes candidate's remarks, media reports, their attendance at meetings and election records. ${constituencyName} constituency includes ${mainAreasNames}.`,
  formatConstituencyCanonicalUrl: (year, code) => `https://vote4.hk/en/district/${year}/${code}`,

  // Candidate
  formatCandidateTitle: (
    candidateName, constituencyName, constituencyCode,
    districtName) => `${candidateName}｜${districtName} - ${constituencyName} (${constituencyCode})｜2019 District Council Election｜Vote4.hk The Guide to Voting`,
  formatCandidateDescription: (
    candidateName, constituencyName, constituencyCode, districtName, areaName,
    candidateNumber,
    mainAreasNames) => `Details of 2019 District Council Election candidate, ${candidateName}, ${districtName} - ${constituencyName} (${constituencyCode}) ${candidateNumber} Constituency includes ${mainAreasNames}.`,
  formatCandidateImageUrl: (id) => `https://vote4.hk/static/images/avatar/${id}.jpg`,
  formatCandidateCanonicalUrl: (name, id) =>  `https://vote4.hk/en/profile/${name}/${id}`,
}

module.exports = zh
