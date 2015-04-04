
var mongoose = require('mongoose');

require('../../app/models');

Promise.all([
  upsert('users', 'User'),
  upsert('whiskies', 'Whisky'),
]).then(function () {
  process.exit(0);
}, function (err) {
  console.error(err.stack);
  process.exit(1);
});

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
