var mongoose = require('mongoose');
var File = mongoose.model('File');

module.exports = function(req, res) {

    var document = new File(req.body);

    document.slug = encodeURIComponent(document.name)

    File.findOne({slug:document.slug}, (err, existingDoc) => {
    	if (err) {
    		console.log('error looking for existing files')
    		res.status(500).send({error: err});
    	} else if (existingDoc) {

    		res.status(403).send({message: "File already exists with that name"})
    	} else {
		    document.save(function(err) {

		        if (err) {
		        	console.error('failed to create');
		            res.status(400).send({error: err});
		        } else {
		            res.json(document);
		        }
		    });
    	}
    })


};