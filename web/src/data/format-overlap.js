const { Parser } = require('json2csv')
const fs = require('fs')

const rawdata = fs.readFileSync('overlap_2019.json')
const dccaObj = JSON.parse(rawdata)
console.log(dccaObj)

const output_format = dccaObj.map(obj => {
  const code = Object.keys(obj)[0]
  return {
    code,
    boundary_change: obj[code],
  }
})

const fields = ['code', 'boundary_change']

const json2csvParser = new Parser({ fields })
const csv = json2csvParser.parse(output_format)

// change "" to ' manully after output
fs.writeFile('overlap_2019.csv', csv, err => {
  if (err) throw err
  console.log('file saved')
})
