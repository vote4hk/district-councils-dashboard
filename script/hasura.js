const Promise = require('bluebird');
const request = Promise.promisifyAll(require('request'));

async function runQuery(query, variables) {
  return request.postAsync({
    url: process.env.HASURA_HOST,
    json: {
      query,
      variables,
    },
    headers: {
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
    },
  });
}

module.exports = {
  runQuery,
}