
// see: http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
var bcrypt = require('bcrypt');
var assert = require('assert');
var mongoose = require('mongoose');
var validator = require('validator');

// to do: make this an option in ./config
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  location: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  avatar_url: {
    type: String,
    default: 'img/default_user.png'
  },
  role: {
    type: String,
    default: 'client'
  },
  password: String,
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  versionKey: false,
});

// // salt the password
// UserSchema.pre('save', function(next) {
//   var user = this;

//   // only hash the password if it has been modified (or is new)
//   if (!user.isModified('password')) return next();
//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);

//       // override the cleartext password with the hashed one
//       user.password = hash;
//       next();
//     });
//   });
// });

/**
 * Validation
 */

UserSchema.path('name').validate(function(name) {
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
  return validator.isEmail(email);
}, 'Invalid email address');

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, cb);
};

var User =
module.exports = mongoose.model('User', UserSchema);

/**
 * All possible roles.
 * Please define, concisely, what each role is.
 */

User.roles = [
  /**
   * Ad campaign clients.
   */

  'client',

  /**
   * Gods.
   */

  'admin'

];
