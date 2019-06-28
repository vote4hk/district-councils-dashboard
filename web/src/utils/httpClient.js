export const fetchData = query => {
    return fetch('https://gql.opencultures.life/graphql', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({ query }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(resObj => resObj.data)
}