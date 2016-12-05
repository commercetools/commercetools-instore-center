import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import path from 'path';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import expressValidator from 'express-validator';
import methodOverride from 'method-override';
import swig from 'swig';
import helmet from 'helmet';
import configuration from './config/config.js';
import logger from './logger/logger.js';
import _ from 'lodash';
import glob from 'glob';
import jwtExpress from 'express-jwt';
import jwt from 'jsonwebtoken';
import assetsMod from './config/assets/assets';

const application = express();

/**
 * Get files by glob patterns
 */
function getGlobbedPaths(globPatterns, excludes) {
  // URL paths regex
  const urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

  // The output array
  let output = [];

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach((globPattern) => {
      output = _.union(output, getGlobbedPaths(globPattern, excludes));
    });
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns);
    } else {
      let files = glob.sync(globPatterns);
      if (excludes) {
        files = files.map((file) => {
          let f;
          if (_.isArray(excludes)) {
            _.each(excludes, (excludePath) => {
              f = file.replace(excludePath, '');
            });
          } else {
            f = file.replace(excludes, '');
          }
          return f;
        });
      }
      output = _.union(output, files);
    }
  }

  return output;
}

function initConfig(app) {
  app.config = configuration([
    path.join(__dirname, `config/env/${process.env.NODE_ENV || 'development'}.json`),
    path.join(__dirname, 'config/env/default.json'),
  ]);
}

function initLogger(app) {
  app.logger = logger(app.config);
}

// function getAssets(files, destPath) {
//   if (!_.isEmpty(files)) {
//     return _.map(files, (file) => {
//       const fileName = file.replace(/^.*[\\\/]/, '');
//       return path.join(__dirname, destPath, fileName);
//     });
//   }
// }
//

function initJsAssets(app, assets) {
  if (process.env.NODE_ENV === 'production') {
    app.locals.vendorJsFiles = getGlobbedPaths(path.join(__dirname, assets.client.dest,
        assets.client.vendor.dest, 'js', 'vendor.js'),
      path.join(__dirname, assets.client.dest));

    app.locals.applicationJsFiles = getGlobbedPaths(path.join(__dirname, assets.client.dest,
        assets.client.application.dest, 'js', 'application.js'),
      path.join(__dirname, assets.client.dest));
  } else {
    const vendorPaths = _.map(assets.client.vendor.js, (file) => {
      return path.join(__dirname, assets.client.dest, assets.client.vendor.dest, 'js',
        file.replace(/^public\/lib/, ''));
    });

    app.locals.vendorJsFiles = getGlobbedPaths(vendorPaths,
      path.join(__dirname, assets.client.dest));

    const appPaths = _.map(['init.js', '*/client/*.js', '**/*.js'], (file) => {
      return path.join(__dirname, assets.client.dest, assets.client.application.dest, 'js',
        file);
    });

    app.locals.applicationJsFiles = getGlobbedPaths(appPaths,
      path.join(__dirname, assets.client.dest));
  }
}

function initCssAssets(app, assets) {
  if (process.env.NODE_ENV === 'production') {
    app.locals.vendorCssFiles = getGlobbedPaths(path.join(__dirname, assets.client.dest,
        assets.client.vendor.dest, 'css', 'vendor.css'),
      path.join(__dirname, assets.client.dest));

    app.locals.applicationCssFiles = getGlobbedPaths(path.join(__dirname, assets.client.dest,
        assets.client.application.dest, 'css', 'application.css'),
      path.join(__dirname, assets.client.dest));
  } else {
    const vendorPaths = _.map(assets.client.vendor.css, (file) => {
      return path.join(__dirname, assets.client.dest, assets.client.vendor.dest, 'css',
        file.replace(/^public\/lib/, ''));
    });

    app.locals.vendorCssFiles = getGlobbedPaths(vendorPaths,
      path.join(__dirname, assets.client.dest));

    const paths = _.map(['main.css', '*.css', '**/core.*.css', '**/*.css'], (file) => {
      return path.join(__dirname, assets.client.dest, assets.client.application.dest, 'css', file);
    });

    app.locals.applicationCssFiles = getGlobbedPaths(paths,
      path.join(__dirname, assets.client.dest));
  }
}

function initAssets(app, assets) {
  initJsAssets(app, assets);
  initCssAssets(app, assets);
}

function initLocalVariables(app, assets) {
  app.locals.title = app.config.get('TITLE');
  app.locals.favicon = path.join(__dirname, assets.client.dest, app.config.get('FAVICON'));
}

function initMiddleware(app) {
  app.use(compression());
  app.use(favicon(app.locals.favicon));
  if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined', {
      skip: (req, res) => {
        return res.statusCode < 400; // Log only errors
      },
    }));
  } else {
    app.use(morgan('dev'));
  }
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  app.use(expressValidator());
  app.use(cookieParser());
  app.use(helmet());
}

function initErrorRoutes(app) {
  app.use((err, req, res, next) => {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }
    // Log it
    console.error(err.stack);
    // Redirect to error page
    res.redirect('/server-error');
  });
}

function initViewEngine(app) {
  app.engine('html', swig.renderFile);

  // Set the template engine
  app.engine('server.view.html', swig.renderFile);

  // Set views path and view engine
  app.set('view engine', 'server.view.html');
  app.set('views', './');

  if (process.env.NODE_ENV === 'production') {
    swig.setDefaults({ cache: 'memory' });
  } else {
    app.set('view cache', false);
    swig.setDefaults({ cache: false });
  }
}

function generateToken(payload, secret, maxAgeSeconds, cb) {
  jwt.sign(
    payload,
    secret, {
      expiresIn: maxAgeSeconds,
    }, cb);
}

function initJwtToken(app) {
  const maxAgeSeconds = app.config.get('TOKEN:MAX_AGE_SECONDS');
  const secret = app.config.get('TOKEN:SECRET');

  app.use(jwtExpress({
    secret,
    credentialsRequired: false,
    getToken: (req) => {
      if (req.headers.authorization) {
        const authorizationHeader = req.headers.authorization.split(' ');
        if (authorizationHeader[0] === 'Bearer') {
          return authorizationHeader[1];
        }
      } else {
        return req.cookies.token;
      }
    },
  }), (req, res, next) => {
    const timeNow = new Date().getTime();
    if (req.user) { // If req.user exists then token is valid and verified by jwtExpress middleware
      const expirationDateInMs = req.user.exp * 1000;
      // if the time remaining to expire is < 10% of max age, we renew the token
      if ((expirationDateInMs - timeNow) < (maxAgeSeconds * 1000 * 0.1)) {
        const user = req.user;
        delete user.exp;
        delete user.iat;

        generateToken(user, secret, maxAgeSeconds, (err, token) => {
          if (err) {
            app.logger.error('Error renewing token: %s', err);
          } else {
            app.logger.info('Renewing token');
            res.cookie('token', token, {
              maxAge: maxAgeSeconds * 1000,
            });
          }

          next();
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });
}

function initModulesConfiguration(app) {
  const configFiles = getGlobbedPaths(path.join(__dirname, 'modules/*/server/config/*.js'));

  if (!_.isEmpty(configFiles)) {
    _.each(configFiles, (configFile) => {
      require(path.resolve(configFile))(app);
    });
  }
}

function initModulesServerRoutes(app) {
  // We load the routes other than core, and finally the core routes
  const routesFiles = getGlobbedPaths([
    path.join(__dirname, 'modules/!(core)/server/routes/**/*.js'),
    path.join(__dirname, 'modules/core/server/routes/**/*.js'),
  ]);

  if (!_.isEmpty(routesFiles)) {
    _.each(routesFiles, (routesFile) => {
      require(path.resolve(routesFile))(app);
    });
  }
}

function initStaticFiles(app, assets) {
  // JS
  app.use('/', express.static(path.join(__dirname, assets.client.dest)));
}

function requireLogin(req, res, next) {
  if (req.user) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.sendStatus(401);
  }
}

function initProtectedRoutes(app) {
  // Protected Routes
  app.all('/api/*', requireLogin, (req, res, next) => {
    next();
  });
}

function init(app) {
  const assets = assetsMod(process.env.NODE_ENV);

  initConfig(app);
  initLogger(app);
  initLocalVariables(app, assets);
  initAssets(app, assets);
  initMiddleware(app);
  initViewEngine(app);
  initJwtToken(app);
  initStaticFiles(app, assets);
  initModulesConfiguration(app);
  initModulesServerRoutes(app);
  initErrorRoutes(app);
  initProtectedRoutes(app);

  app.listen(app.config.get('PORT'), () => {
    app.logger.info(`Server listening on port ${app.config.get('PORT')}`);
  });
}


init(application);

export default application;
