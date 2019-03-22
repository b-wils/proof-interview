var mongoose = require('mongoose');

var fileSchema = new mongoose.Schema({
	name: String,
	slug: String,
	contents: String
})

mongoose.model('File', fileSchema);