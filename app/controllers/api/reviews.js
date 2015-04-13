
/*!
 * Module dependencies.
 */
var Review = require('../../models/review');

exports.index = function (req, res) {
  var query = {};
  var fields = {};
};

exports.create = function (req, res) {
  var query = {};
  var fields = {};

  console.log(req);

  var review = new Review(req.body);
  review.save(function (err) {
    if (err) return next(err);
    res.json(review.toObject());
  });
};

exports.show = function (req, res) {
  res.json(req.review.toJSON());
};

exports.update = function (req, res) {
  var query = {};
  var fields = {};
};

exports.destroy = function (req, res) {
  var query = {};
  var fields = {};
  // Whisky.findById(req.params.id, function(err, tag) {
  //   if (err) return next(err);
  //   if (tag === null || tag.project_id.toString() !== project._id.toString()) {
  //     return next(error(404, 'uri not found'));
  //   }
  //   tag.remove(function(err) {
  //     if (err) return next(err);
  //     breakSegment(tag).then(function(){
  //       res.statusCode = 204;
  //       res.end();
  //     }).catch(next);
  //   });
  // });
};

