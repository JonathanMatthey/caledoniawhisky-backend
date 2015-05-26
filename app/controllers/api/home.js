
/*!
 * Module dependencies.
 */
var Whisky = require('../../models/whisky');
var Review = require('../../models/review');
var User = require('../../models/user');

exports.home = function (req, res, next) {

  var query = {};
  var fields = {};
  // Whisky.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, whisky) {
  //   console.log( whisky );
  // });

  // find Events
  //
  // facebook PAGE ACCESS TOKEN req for graph api
  // https://developers.facebook.com/docs/facebook-login/access-tokens
  // https://developers.facebook.com/docs/graph-api/reference/page/events

  var whisky;
  var collectors;

  // find latestWhisky
  return Promise.resolve(Whisky.findOne({}, {}, { sort: { 'created_at' : -1 } }).exec()).then(function (_whisky) {
    whisky = _whisky;
    // find Top collectors // aggregate all reviews by user_id, get max
    return Promise.resolve(
      Review.aggregate([
        {$group: {_id: "$user_id",total: {$sum: 1}}},
        {$sort: {total: -1}}
      ])
      .limit(2)
      .exec());
  }).then(function (_userIds) {
    return Promise.resolve(User.find({
        '_id': { $in: _userIds}
      },
      { '_id': 1, 'name': 1}).exec());
  }).then(function (_users) {
    collectors = _users;
    res.json({
      latestWhisky: whisky,
      collectors: collectors,
      events: {},
    });
  }).catch(next);
};

