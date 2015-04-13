
/*!
 * Module dependencies.
 */
var Whisky = require('../../models/whisky');
var Review = require('../../models/review');

exports.index = function (req, res) {
  var query = {};
  var fields = {};

  Whisky.find(query, fields)
  .exec(function(err, whiskies) {
    if (err) return next(whiskies);
    res.json(whiskies);
  });
};

exports.show = function (req, res) {
  var whiskyId = req.params.whiskyId;
  var query = {
    _id : whiskyId
  };
  var fields = {};

  Whisky.find(query, fields)
  .exec(function(err, whisky) {
    if (err) return next(whisky);

    Review.find({
      whisky_id : whiskyId
    })
    .populate('user_id')
    .sort({})
    .exec(function(err,reviews){
      if (err) return next(err);

      whisky.reviews = reviews;
      res.json({
        whisky: whisky,
        reviews: reviews
      });
    });
  });
};
