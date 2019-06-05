export const fetchData = query => {
    return fetch('https://api.opencultures.life/v1alpha1/graphql', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({ query }), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': ''
        }
      })
      .then(res => res.json())
}