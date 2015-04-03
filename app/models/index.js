
/**
 * Preload all the models.
 */

var mongoose = require('mongoose');
var config = require('../../config/config');

// Bootstrap db connection

exports.db = mongoose.connect(config.db);

// Turn off "minimize" for all models - GLOBAL
mongoose.plugin(function(schema){
  schema.set('minimize', false);
  schema.set('getters', true);
});

// only preload the files with mongoose models
// until this folder is cleaned up
exports.User = require('./user');
exports.Whisky = require('./whisky');
