// TODO - Are there complications around file renaming?

module.exports = function(req, res) {
    var file = req.file;

    Object.assign(file, req.body);

    file.slug = encodeURIComponent(file.name)

    file.save(function(err) {
        if (err) {
            console.error('failed to update file');
            res.status(400).send({error: err});
        } else {
            res.json(file);
        }
    });
};