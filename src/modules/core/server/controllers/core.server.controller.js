/**
 * Render the server error page
 */
export function renderServerError(req, res) {
  res.status(500).render('app/modules/core/server/views/500', {
    error: 'Oops! Something went wrong...',
  });
}

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
export function renderNotFound(req, res) {
  res.status(404).format({
    'text/html': () => {
      res.render('app/modules/core/server/views/404', {
        url: req.originalUrl,
      });
    },
    'application/json': () => {
      res.json({
        error: 'Path not found',
      });
    },
    default: () => {
      res.send('Path not found');
    },
  });
}

/**
 * Render the server authentication required
 */
export function renderAuthenticationRequired(req, res, next, showError) {
  res.status(401).format({
    'text/html': () => {
      res.render('app/modules/core/server/views/401', {
        url: req.originalUrl,
        showError,
      });
    },
    'application/json': () => {
      res.json({
        error: 'Authentication Required',
      });
    },
    default: () => {
      res.send('Authentication Required');
    },
  });
}

/**
 * Render the main application page
 */
export function renderIndex(req, res) {
  res.render('app/modules/core/server/views/index');
}

/**
 * Render the main application page
 */
export function renderIndexSecure(req, res) {
  if (!req.user) {
    renderAuthenticationRequired(req, res);
  } else {
    res.render('app/modules/core/server/views/index');
  }
}
