var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String, required: true},
    location: {type: String, required: true}
});

module.exports = mongoose.model('Content', schema);