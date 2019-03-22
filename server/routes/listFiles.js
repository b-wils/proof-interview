var mongoose = require('mongoose');
var File = mongoose.model('File');

module.exports = function(req, res) {

    File.find({}).sort({name:"asc"}).exec(function(err, documents) {
        if (err) {
            console.error('error finding files');
            res.status(500).send({error: err});
        } else {
            res.json(documents);
        }
    });
};