const fs = require('fs')

const rawdata = fs.readFileSync('overlap_2019.json')
const dccaObj = JSON.parse(rawdata)

dccaObj.forEach(dcca => {
  const code = Object.keys(dcca)[0]
  // dcca[code]
  console.log(JSON.stringify(dcca[code].prev, null))
})

// const json = JSON.stringify(newDCCA, null, 2)
// fs.writeFile('DCCA_2011.json', json, (err, result) => {})
