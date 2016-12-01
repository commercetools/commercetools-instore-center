const fetch = require('node-fetch');

module.exports = (app) => {
  const service = {};
  const logger = app.logger;
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    //'User-Agent': `${pkg.name}/${pkg.version} ${Platform.OS}/${Platform.Version}`,
  };
  const apiHost = 'https://mc.commercetools.com';
  const loginUrl = `${apiHost}/tokens`;
  const userUrl = `${apiHost}/users`;
  const projectsByUserUrl = `${apiHost}/projects`;

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
    ).then((processResponse) => {
      console.log(processResponse);
      return processResponse;
    });
  };

  return service;
};
