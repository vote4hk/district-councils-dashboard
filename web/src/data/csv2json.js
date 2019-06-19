const csv = require('csvtojson')
const fs = require('fs');
const csvFilePath = './people.csv'

const output = []

const addElection = (obj, cur) => {
    delete obj.id
    delete obj.name_chi
    delete obj.gender
    if (cur.estimated_birth !== obj.estimated_birth && !cur.estimated_birth.includes('/')) {
        cur.estimated_birth = `${Math.min(parseInt(cur.estimated_birth),parseInt(obj.estimated_birth))}/${Math.max(parseInt(cur.estimated_birth),parseInt(obj.estimated_birth))}`
    }
    return obj
}

csv()
    .fromFile(csvFilePath)
    .then(jsonObj => {
        jsonObj.forEach(obj => {
                // Existing People
                const cur = output.find(o => o.name_chi === obj.name_chi && Math.abs(parseInt(o.estimated_birth) - parseInt(obj.estimated_birth)) <= 1)
                if (cur) {
                    cur.elections.push(addElection(obj, cur))
                }
                else {
                    // New People
                    const basic_obj = {
                        name_chi: obj.name_chi,
                        gender: obj.gender,
                        estimated_birth: obj.estimated_birth,
                        elections: [addElection(obj, obj)] // Add first election item
                    }
                    output.push(basic_obj)
                } 
        }
        )
        
        const outputJson = JSON.stringify(output, null, 2)
        fs.writeFile('people.json', outputJson, (err, result) => { });
        console.log(`Number of unique people: ${output.length}`)
    })
