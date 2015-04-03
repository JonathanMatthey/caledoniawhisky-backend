
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

mongoose.model('Whisky', WhiskySchema);
