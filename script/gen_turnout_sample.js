const fs = require('fs');

const json = JSON.parse(fs.readFileSync('./input/voters.json'))
const MAX_TURNOUT_RATE = 0.6
const output = {}

json.data.dcd_constituencies.forEach((c) => {
  let lastTurnout = 0;
  const cumulative_turnout = [];
  for (let i = 0; i < 7 + Math.round(Math.random() * 8); i++) {
    lastTurnout += Math.random() * (MAX_TURNOUT_RATE / 15)
    cumulative_turnout.push(Math.round(lastTurnout * c.vote_stats_aggregate.aggregate.sum.count))
  }

  output[c.code] = {
    cumulative_turnout,
  };
})

fs.writeFileSync('./../web/public/turnout_random.json', JSON.stringify(output, null, 2));

