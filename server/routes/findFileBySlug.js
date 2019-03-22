var mongoose = require('mongoose');
var File = mongoose.model('File');

module.exports = function(req, res, next, slug) {

    File.findOne({slug:slug}, (err, document) => {
    	if (err) {
    		console.log('error looking for file by slug')
    		res.status(500).send({error: err});
    	} else if (!document) {
    		res.status(404).send({message: "Could not find file with that name"})
    	} else {
            req.file = document;
            next();
    	}
    })
};