
/* jshint unused:false */

module.exports = function (err, req, res, next) {
  // Mongoose Validation Errors
  if (err.name === 'ValidationError') err.status = 422;
  var status = res.statusCode = err.status || 500;

  if (req.isAPI || /^\/api\//.test(req.path)) {
    // API route, so we respond with JSON

    // mongoose validation error
    if (err.name === 'ValidationError' && err.errors) {
      res.json({
        type: 'error',
        errors: err.errors
      })
    } else {
      res.json({
        type: 'error',
        message: status < 500
          ? err.message
          : 'Internal Server Error'
      });
    }
  } else if (status === 401) {
    res.render('401', {
      url: req.originalUrl,
      err: err
    });
  } else if (status === 404) {
    res.render('404', {
      url: req.originalUrl,
      err: err
    });
  } else {
    res.render('500', {
      err: err
    });
  }

  // log errors
  if (err.expose !== false && status >= 500) console.error('EXPRESS ERROR: ', err.stack || err.message || err);
};
