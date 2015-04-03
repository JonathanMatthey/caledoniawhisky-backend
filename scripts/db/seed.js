
var mongoose = require('mongoose');

require('../../app/models');


seedWhiskies();
// seedUsers().then(function () {
//   return Promise.all([
//     upsert('projects', 'Project'),
//     upsert('videos', 'Video'),
//     upsert('experiences', 'Experience'),
//     upsert('content-blocks', 'ContentBlock'),
//     upsert('tags', 'Tag'),
//   ]);
// }).then(function () {
//   process.exit(0);
// }, function (err) {
//   console.error(err.stack);
//   process.exit(1);
// });

function seedUsers() {
  var User = mongoose.model('User');
  var seed = './seeds/users.json';
  return Promise.all(require(seed).map(function (user) {
    return User.findById(user._id).exec().then(function (exists) {
      if (exists) return;
      user = new User(user);
      if (user.role === 'admin') user.ui_templates = Object.keys(uis);
      return user.save();
    });
  })).then(function () {
    console.log('seeded %s', seed);
  });
}

function seedWhiskies() {
  var Whisky = mongoose.model('Whisky');
  var seed = './seeds/whiskies.json';
  return Promise.all(require(seed).map(function (whisky) {
    return Whisky.findById(whisky._id).exec().then(function (exists) {
      if (exists) return;
      whisky = new Whisky(whisky);
      return whisky.save();
    });
  })).then(function () {
    console.log('seeded %s', seed);
  });
}

/**
 * For everything but Whiskies because users needs fiddling.
 */

function upsert(collection, constructor) {
  var seed = './seeds/' + collection + '.json';
  var Constructor = mongoose.model(constructor);
  return Promise.all(require(seed).map(function (thing) {
    return Constructor.findById(thing._id).exec().then(function (exists) {
      if (exists) return;
      return new Constructor(thing).save();
    });
  })).then(function () {
    console.log('seeded %s', seed);
  });
}
