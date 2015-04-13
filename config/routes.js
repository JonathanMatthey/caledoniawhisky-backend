
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');
var whiskies = require('api/whiskies');
var reviews = require('api/reviews');
var authentication = require('authentication');
var auth = require('../app/middleware/authorization');
var config = require('../config/config');

/**
 * Expose
 */

module.exports = function (app, passport) {

  app.get('/', home.index);

  app.post('/auth/signin', authentication.signin);
  app.get('/auth/signout', authentication.signout);

  app.get('/api/whiskies', whiskies.index);
  app.get('/api/whiskies/:whiskyId', auth.user.exists, whiskies.show);

  // get whisky ( with id, returns reviews)

  // post new review ( with whisky_id, current user id  )
  app.get('/api/reviews', auth.user.exists, reviews.index);
  app.post('/api/reviews', auth.user.exists, reviews.create);
  app.get('/api/reviews/:reviewId', auth.user.exists, reviews.show);
  app.patch('/api/reviews/:reviewId', auth.user.exists, reviews.update);
  app.delete('/api/reviews/:reviewId', auth.user.exists, reviews.destroy);

  app.get('/api/user/:userId/reviews', auth.user.exists, reviews.getUserReviews);

  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
