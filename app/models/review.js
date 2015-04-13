
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Review schema
 */

var ReviewSchema = new Schema({
  "user_id": {
    type: Schema.ObjectId,
    required: true,
    index: true,
    ref: 'User'
  },
  "whisky_id": {
    type: Schema.ObjectId,
    required: true,
    index: true,
    ref: 'Whisky'
  },
  "body": { type: String, default: '' },
  "rating": { type: Number, default: 5 },
});

/**
 * Review plugin
 */


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

ReviewSchema.method({

});

/**
 * Statics
 */

ReviewSchema.static({

});

/**
 * Register
 */

module.exports = mongoose.model('Review', ReviewSchema);
