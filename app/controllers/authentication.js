var User = require('../models/user');

/**
 * Signin
 */

exports.signin = function(req, res, next) {
  var body = req.body;
  console.log('signin ? ')
  console.log(body);
  User.findOne({
    email: body.email
  }, function(err, user) {
    if (err) return next(err);

    if (!user) {
      return res.status(400).json({user: 0, message: 'Sorry, username does not exist.'});
    } else {
      user.comparePassword(body.password, function(err, valid) {
        if (err) return next(err);
        if (!valid) return res.status(400).json({user: 1, message: 'Sorry, incorrect password.'});

        req.session.userid = user._id.toHexString();
        user = user.toObject();
        delete user.password;
        res.json(user);
      });
    }
  });
};

/**
 * Signout
 */

exports.signout = function(req, res) {
  delete req.session.userid;
  res.redirect('/');
};
