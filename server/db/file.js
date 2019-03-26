var mongoose = require('mongoose');
var RequireAllFieldsByDefault = require('./requireAllFieldsByDefault');

var fileSchema = new mongoose.Schema({
	name: String,
	slug: String,
	contents: {type:String, required: false}
})

RequireAllFieldsByDefault(fileSchema);

mongoose.model('File', fileSchema);