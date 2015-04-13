
var error = require('http-errors');

exports.user = {};

/**
 * Role authorization. Usage:
 *
 * app.use(auth.user.is('admin', 'client'));
 */

exports.user.is = function (roles) {
  if (!Array.isArray(roles)) roles = [].slice.call(arguments);
  return function (req, res, next) {
    var user = req.user;
    if (!user) return next(error(401));
    if (!~roles.indexOf(user.role)) return next(error(404));
    next();
  }
}

/**
 * Make sure the user is logged in. Usage:
 *
 * app.use(auth.user.exists);
 */

exports.user.exists = function (req, res, next) {
  if (!req.user) return next(error(401));
  next();
}

/**
 * Permissions.
 */

exports.can = {};

/**
 * Permissions having to do with editing other users.
 */

exports.can.users = {};
exports.can.users.view =
exports.can.users.create =
exports.can.users.edit = exports.user.is('admin');
