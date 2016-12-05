import * as core from '../controllers/core.server.controller';

module.exports = (app) => {
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  app.route('/login').get(core.renderAuthenticationRequired);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
