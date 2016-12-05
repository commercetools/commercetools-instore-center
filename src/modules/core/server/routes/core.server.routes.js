import * as core from '../controllers/core.server.controller';

module.exports = (app) => {
  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  app.route('/login').get(core.renderAuthenticationRequired);

  // Exceptions
  app.route('/:url(languages)/*').get(core.renderIndex);
  app.route('/**/favicon.ico').get(core.renderIndex);

  // Define application route
  app.route('/*').get(core.renderIndexSecure);
};
