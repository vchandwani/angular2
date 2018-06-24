var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String},
    location: {type: String  }
});

module.exports = mongoose.model('Content', schema);