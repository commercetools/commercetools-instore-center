const fetch = require('node-fetch');
const cookie = require('cookie-parse');

module.exports = (app) => {
  const service = {};
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    //'User-Agent': `${pkg.name}/${pkg.version} ${Platform.OS}/${Platform.Version}`,
  };
  const apiHost = 'https://mc-api.commercetools.com';
  const loginUrl = `${apiHost}/tokens`;
  const graphqlUrl = `${apiHost}/graphql`;

  function processLogin(response) {
    return {
      token: cookie.parse(response.headers.get('set-cookie')).mcAccessToken,
    };
  }

  service.getUserInfo = ({ token }) => {
    return fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        Cookie: `mcAccessToken=${token}`,
        'X-Graphql-Target': 'mc', // either "mc" (for user, project) or "ctp" (for the CTP API)
      },
      body: JSON.stringify({
        operationName: 'LoggedInUserQuery',
        query: `
          query LoggedInUserQuery {
            user: me {
              id
              createdAt
              version
              email
              firstName
              lastName
              language
              numberFormat
              timeZone
              availableProjects {
                key
                name
                suspended
                expired
                __typename
              }
              availableOrganizations {
                name
                __typename
              }
              __typename
            }
          }`,
      }),
    })
      .then(res => res.json())
      .then(loggedInUser => loggedInUser.data.user);
  };

  service.login = (params) => {
    return fetch(
      loginUrl,
      {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({
          email: params.username,
          password: params.password,
        }),
      }
    ).then(processLogin);
  };

  return service;
};
