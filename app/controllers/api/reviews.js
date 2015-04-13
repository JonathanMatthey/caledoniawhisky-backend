
/*!
 * Module dependencies.
 */
var Review = require('../../models/review');

exports.index = function (req, res, next) {
  Review.find({}).sort({})
  .exec(function(err,reviews){
    if (err) return next(err);
    res.json(reviews);
  });
};

exports.getUserReviews = function (req, res, next) {
  var params = req.body;
  var userId = req.params.userId;;
  if( req.params.userId === "me"){
    userId = req.user._id;
  }
  Review.find({
    user_id: userId
  }).sort({})
  .exec(function(err,reviews){
    if (err) return next(err);
    res.json(reviews);
  });
};

exports.create = function (req, res, next) {
  var review = new Review(req.body);
  review.user_id = req.user._id;
  review.save(function (err) {
    if (err){
      console.log('reviews.create error: ',err)
      return next(err);
    }
    res.json(review.toObject());
  });
};

exports.show = function (req, res, next) {
  res.json(req.review.toJSON());
};

exports.update = function (req, res, next) {
  var params = req.body;
  Review.findOne({
    _id: req.params.reviewId
  }, function(err, review) {
    if (err){
      console.log('reviews update error: ', err)
      return next(err);
    }
    if (!review){
      console.log('reviews update error - review not found: ', err)
      return next(error(404));
    }
    review.body = params.body;
    review.rating = params.rating;
    review.save(function(err,stag) {
      if (err){
        console.log('reviews update error: ', err)
        return next(err);
      }
      res.json(review);
    });
  });
};

exports.destroy = function (req, res, next) {
  Review.remove({ _id: req.params.reviewId }, function(err) {
    if (err){
      console.log('reviews destory error: ', err)
      return next(err);
    }
    res.send({ success: 'Deleted!' });
  });
};

