var mongoose = require('mongoose');

var bookschema = mongoose.Schema({
    title : String,
    author : String,
    desc : String
});

//mongoose.model('collection-name', schemaname)
module.exports = mongoose.model('Book', bookschema);