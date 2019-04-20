const fs = require('fs')

const rawdata = fs.readFileSync('DCCA_2011.json')
const dccaObj = JSON.parse(rawdata)

const rawdata2 = fs.readFileSync('electors.json')
const eleObj = JSON.parse(rawdata2)

const thisYear = eleObj.find(ele => ele.year === 2011)

const newDCCA = {
    ...dccaObj,
    features: dccaObj.features.map(dist => {
        const yearDist = thisYear.election.find(e => e.cacode === dist.properties.CACODE)
        return {
            ...dist,
            properties: {
                ...dist.properties,
                CNAME: yearDist.cname
            }
        }
    })
}


const json = JSON.stringify(newDCCA, null, 2)
fs.writeFile('DCCA_2011.json', json, (err, result) => {});