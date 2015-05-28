
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */

var WhiskySchema = new Schema({
  "distiller": { type: String, default: '' },
  "title": { type: String, default: '' },
  "year": Number,
  "region": { type: String, default: '' },
  "description": { type: String, default: '' },
  "rating": { type: Number, default: 8 },
  "rating_count": { type: Number, default: 32 },
  "images": {
    "thumbnail_filename": { type: String, default: '' },
  },
  "character": { type: String, default: '' }
});

/**
 * User plugin
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

WhiskySchema.method({

});

/**
 * Statics
 */

WhiskySchema.static({

});

/**
 * Register
 */

module.exports = mongoose.model('Whisky', WhiskySchema);
