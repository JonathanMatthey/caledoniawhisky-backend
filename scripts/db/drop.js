
/**
 * Drops all the collections
 */

var model = require('../../app/models');

function drop(name) {
  return new Promise(function (resolve, reject) {
      console.log('dropped?');
    model[name].collection.drop(function (err) {
      console.log('dropped?');
      if (err) return reject(err);
      resolve();
    });
  });
}

//----- MAIN
console.log(model["Whisky"]);
console.log(model["Whisky"].collection);
var drops = new Promise(function(resolve,reject){
  Promise.all([
    'Whisky',
    // 'User',
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
