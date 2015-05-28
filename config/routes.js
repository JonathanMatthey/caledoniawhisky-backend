
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var home = require('home');
var homeApi = require('api/home');
var whiskiesApi = require('api/whiskies');
var reviewsApi = require('api/reviews');
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

  app.get('/api/whiskies', whiskiesApi.index);
  // TODO - bring this back in once auth works right
  // app.get('/api/whiskies/:whiskyId', auth.user.exists, whiskiesApi.show);
  app.get('/api/whiskies/:whiskyId', whiskiesApi.show);

  // get whisky ( with id, returns reviews)

  // post new review ( with whisky_id, current user id  )
  app.get('/api/home', homeApi.home);
  app.get('/api/reviews', reviewsApi.index);
  app.post('/api/reviews', auth.user.exists, reviewsApi.create);
  app.get('/api/reviews/:reviewId', auth.user.exists, reviewsApi.show);
  app.patch('/api/reviews/:reviewId', auth.user.exists, reviewsApi.update);
  app.delete('/api/reviews/:reviewId', auth.user.exists, reviewsApi.destroy);

  app.get('/api/user/:userId/reviews', auth.user.exists, reviewsApi.getUserReviews);

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
