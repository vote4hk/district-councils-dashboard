const csv = require('csvtojson')
const fs = require('fs');
const csvFilePath = './electors.csv'

const output = []

csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
        jsonObj.forEach(obj => {
            const candidateObj = {
                number: parseInt(obj.number),
                cName: obj.cName,
                cAlias: obj.cAlias,
                eName: obj.eName,
                eAlias: obj.eAlias,
                cAffiliation: obj.cAffiliation,
                eAffiliation: obj.eAffiliation,
                vote: parseInt(obj.vote.replace(',', '')),
                win: obj.win === 'Y' ? true : false,
                continue: obj.continue === 'Y' ? true : false
            }

            const dccaObj = {
                cacode: obj.cacode,
                cname: obj.cname,
                ename: obj.ename,
                candidates: []
            }

            if (output.findIndex(o => parseInt(o.year) === parseInt(obj.year)) === -1) {
                output.push({
                    year: parseInt(obj.year),
                    election: []
                })
            }


            const yearIndex = output.findIndex(o => parseInt(o.year) === parseInt(obj.year))
            let cacodeIndex = output[yearIndex].election.findIndex(e => e.cacode === obj.cacode)

            if (cacodeIndex === -1) output[yearIndex].election.push(dccaObj)

            cacodeIndex = output[yearIndex].election.findIndex(e => e.cacode === obj.cacode)
            output[yearIndex].election[cacodeIndex].candidates.push(candidateObj)
        }
        )
        const outputJson = JSON.stringify(output, null, 2)
        fs.writeFile('electors.json', outputJson, (err, result) => { });
    })
