
/**
 * Drops all the collections
 */

var model = require('../../app/models');

function drop(name) {
  return new Promise(function (resolve, reject) {
    model[name].collection.drop(function (err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

//----- MAIN
var drops = new Promise(function(resolve,reject){
  Promise.all([
    'Whisky',
    'User',
    'Reviews',
  ].map(drop)).then(function () {
    console.log('All collections have been dropped.');
    resolve()
  })
  .catch(function (err) {
    if (err.message === 'ns not found') // ok
      resolve();
    else
      reject(err.stack);
  })
})

// go and then exit
drops.then(process.exit);
