
var User = require('../models/user');

exports.loadUser = function (req, res, next) {
  var id = req.session.userid;
  if (!id) return next();

  User.findOne({
    _id: id
  }, {
    password: false
  }, function (err, user) {
    if (err) return next(err);
    if (!user) {
      delete req.session.userid;
      res.redirect('/');
      return;
    }
    req.user = res.locals.user = user;
    next();
  });
};
