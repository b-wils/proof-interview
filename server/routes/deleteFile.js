module.exports = function(req, res) {
    var file = req.file;

    file.remove(function(err) {
        if (err) {
            console.error('failed to remove file');
            res.status(400).send({error: err});
        } else {
            res.json(file);
        }
    });
};