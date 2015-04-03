
/*!
 * Module dependencies.
 */
var Whisky = require('../../models/whisky');

exports.index = function (req, res) {
  var query = {};
  var fields = {};

  Whisky.find(query, fields)
  .exec(function(err, whiskies) {
    if (err) return next(whiskies);
    res.json(whiskies);
  });
};
