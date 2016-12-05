const fetch = require('node-fetch');

module.exports = (app) => {
  const service = {};
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    //'User-Agent': `${pkg.name}/${pkg.version} ${Platform.OS}/${Platform.Version}`,
  };
  const apiHost = 'https://mc.commercetools.com';
  const loginUrl = `${apiHost}/tokens`;
  const projectsByUserUrl = `${apiHost}/projects`;
  const userUrl = `${apiHost}/users`

  function processResponse(response) {
    let isOk = response.ok;
    return response.text()
    .then((text) => {
      let parsed;
      try { parsed = JSON.parse(text); } catch (error) { isOk = false; }
      if (isOk) return parsed;
      const error = new Error(parsed ? parsed.message : text);
      if (parsed) error.body = parsed;
      throw error;
    });
  }

  service.getUserProjects = (params) => {
    return fetch(
      `${projectsByUserUrl}?userId=${params.user}`,
      {
        method: 'GET',
        headers: {
          ...defaultHeaders,
          Authorization: params.token,
        },
      }
    ).then(processResponse);
  };

  service.getUserInfo = (params) => {
    return fetch(
      `${userUrl}/${params.user}`,
      {
        method: 'GET',
        headers: {
          ...defaultHeaders,
          Authorization: params.token,
        },
      }
    ).then(processResponse);
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
    ).then(processResponse);
  };

  return service;
};
